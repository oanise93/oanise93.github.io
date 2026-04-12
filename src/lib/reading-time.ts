export interface ReadingTime {
  minutes: number;
  label: string;
}

const WORDS_PER_MINUTE = 225;

export function getReadingTime(markdown: string | undefined): ReadingTime {
  const plainText = (markdown ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\p{L}\p{N}'-]+/gu, " ")
    .trim();

  const words = plainText.length === 0 ? [] : plainText.split(/\s+/);
  const minutes = Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));

  return {
    minutes,
    label: `${minutes} min read`,
  };
}
