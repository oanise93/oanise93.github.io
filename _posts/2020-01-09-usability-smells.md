---
layout: single
title: "Usability Smells: An Analysis of Developers’ Struggle With Crypto Libraries"
categories: [paper summary]
tags: [security]
---

[Usability Smells: An Analysis of Developers’ Struggle With Crypto Libraries](https://www.usenix.org/system/files/soups2019-patnaik.pdf) Patnaik et al., _SOUPS 2019_

While at SOUPS, this particular paper stood out because it related to some work that my colleagues and I were doing surrounding certificate chain validation. Cryptography is hard and using cryptographic APIs can be difficult too. This work uncovers usability smells associated with popular cryptography libraries by conducting a thematic analysis of 2,491 StackOverflow questions. A _usability_ smell is some sort of hint or indication that an interface may be difficult to use for its intended users. Usability smells are often thought of as it relates to graphical user interfaces (GUIs), but this way of thinking can be applied to APIs too. 

>Developers struggle with programming interfaces in the same way that users struggle with user interfaces.

## We all use Stack Overflow, right?

The researchers looked into seven popular cryptography libraries which are listed in the table below: 
{:refdef: style="text-align: center;"}
![table 1](/assets/images/usability-smells/table1.png){:height="660px" width="344px"}
{: refdef}


Using the library names of the seven libraries as search terms, the researchers scraped Stack Overflow and found 2,491 questions. They did some post processing of the original corpus of questions to remove questions that didn't relate to an issue in the library itself or where a developer wrongly attributed a question to a particular library. After this filtering, they were left with 2,316 questions to perform thematic analysis on. 

The researchers acknowledged that there were a couple of threats to the validity of their work: namely the staleness of questions and that the problem posed in the question was only encountered by a single developer and thus wasn't a general problem with the library. To mitigate the first threat, they validated that the usability issued they identified was still present in the current version of the library. And to mitigate the seecond threat, they only selected questions that had a score of at least 1.

## The Issues

Through thematic analysis, the researchers found 16 usability issues that they grouped into 7 themes.

![figure 3](/assets/images/usability-smells/figure3.png)


Most of the issues are pretty intuitive and what you might be used to seeing on Stack Overflow. One of the issues that stood out to me was _borrowed mental models_ because I was wondering what it meant in this context. This particular issue arises when a develper tries to apply concepts from one library to another.


{:refdef: style="text-align: center;"}
![table 2](/assets/images/usability-smells/table2.png){:height="274px" width="385px"}
{: refdef}

The lionshare of the issues they found were with OpenSSL and  the two most prevalent types of issues were "What's gone wrong here" (259) and "Build Issue" (362). This means that developers were having a lot of diffculty just setting up OpenSSL let alone actually using it. 

In contrast, LibSodium had the least amount of issues with a total of 26 relevant issues. Maybe that is to be expected from library whose claims to be a "modern, portable, easy to use crypto library."

## Usability Smells
After identifiying the themes associated with the issues in the Stack Overflow questions, the researchers attempted to map them onto the 10 usability principles  by Green and Smith. They did not map the _lack of knowledge_ or _passing the buck_ issues since these are associated with specific developer behaviors and aren't associated with the problems with the library itself. Through the mapping they found four usability smells which can be found in the table below:

{:refdef: style="text-align: center;"}
![table 3](/assets/images/usability-smells/table3.png){:height="918px" width="550px"}
{: refdef}

*  **Needs a super sleuth**: this smell means usually means it is hard to find the information you need to accomplish a particular task or that it is diffcult to understand how to do it with the library. 

* **Confusion regins**: this usability smells comes out before any code is written. The developer is unsusre if this is right library to use or how to use the library.

* **Needs a post-mortem**: unlike _confusions regins_ the issues associated with this smells happen after writing code. Whether it is because an update has broken their code or they are generally struggling to use the library, something went wrong.

* **Doesn't play well with others**. For a library to be easy-to-use, a developer must be able to actually use it. 


## How bad are the smells?

For the three libraries that that had the most issues OpenSSL, Bouncy Castle, and PyCrypto, the researchers added what they call a _Whiffiness factor_. It is a weighted average of the percentage frequency of the issues associated with each whiff.

{:refdef: style="text-align: center;"}
![table 3](/assets/images/usability-smells/table4.png){:height="812px" width="564px"}
{: refdef}

Of the three libraries analyzed, OpenSSL came out to be the "stinkiest" but in reality it's not much different than the other libraries. There are areas that it shines and areas that need some improvement.

## Wrapping Up

>Libraries will perhaps always be a bit smelly given
the challenges of catering for the requirements of a wide and
diverse set of developers and applications; but by integrating
usability principles we can at least make them less so.






