import fs from "node:fs";
import path from "node:path";

const inputDir = "_posts";
const outputDir = "src/content/blog";

const titleOverrides = {
  "if-https-were-secure": "\"If HTTPS Were Secure, I Wouldn't Need 2FA\" - End User and Administrator Mental Models of HTTPS",
};

fs.mkdirSync(outputDir, { recursive: true });

function parseList(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!match) return [];
  return match[1]
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseTitle(frontmatter, slug) {
  if (titleOverrides[slug]) return titleOverrides[slug];
  const match = frontmatter.match(/^title:\s*(.*)$/m);
  if (!match) return slug;
  return match[1]
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\"/g, "\"");
}

function liquidFigureToMarkdown(_match, attrs) {
  const values = {};
  attrs.replace(/(\w+)="([^"]*)"/g, (attrMatch, key, value) => {
    values[key] = value;
    return attrMatch;
  });

  if (!values.image_path) return "";

  const alt = (values.alt || values.caption || "Figure").replace(/\]/g, "");
  const caption = values.caption ? `\n\n*${values.caption}*` : "";
  return `![${alt}](${values.image_path})${caption}`;
}

function transformBody(body) {
  return body
    .replace(/\{%\s*include\s+figure\s+([^%]+)%\}/g, liquidFigureToMarkdown)
    .replace(/^\{:\s*refdef.*\}\s*$/gm, "")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)\{:[^}]+\}/g, "![$1]($2)")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function descriptionFrom(body) {
  const paragraph =
    body.split(/\n\s*\n/).find((part) => {
      const trimmed = part.trim();
      return (
        trimmed &&
        !trimmed.startsWith("!") &&
        !trimmed.startsWith("#") &&
        !trimmed.startsWith(">") &&
        !trimmed.startsWith("*")
      );
    }) || "Writing by Olabode Anise.";

  const text = paragraph
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[_*`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text;
}

for (const file of fs.readdirSync(inputDir).filter((name) => name.endsWith(".md")).sort()) {
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.*)\.md$/);
  if (!match) continue;

  const [, date, rawSlug] = match;
  const slug = rawSlug.replace(/\s+/g, "-");
  const source = fs.readFileSync(path.join(inputDir, file), "utf8");
  const parts = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!parts) {
    throw new Error(`Could not parse frontmatter for ${file}`);
  }

  const [, frontmatter, originalBody] = parts;
  const body = transformBody(originalBody);
  const categories = parseList(frontmatter, "categories");
  const tags = parseList(frontmatter, "tags");
  const categoryPath = categories[0] || "blog";
  const title = parseTitle(frontmatter, slug);
  const teaserMatch = frontmatter.match(/^\s*teaser:\s*(\S+)\s*$/m);
  const teaser = teaserMatch ? teaserMatch[1] : undefined;

  const meta = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(descriptionFrom(body))}`,
    `pubDate: ${date}`,
    `categories: ${JSON.stringify(categories)}`,
    `tags: ${JSON.stringify(tags)}`,
    `legacyPath: ${JSON.stringify(`${categoryPath}/${slug}`)}`,
    teaser ? `teaser: ${JSON.stringify(teaser)}` : undefined,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(path.join(outputDir, `${slug}.mdx`), `${meta}\n\n${body}\n`);
}
