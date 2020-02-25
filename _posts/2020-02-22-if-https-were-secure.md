---
layout: single
title: \"If HTTPS Were Secure, I Wouldn't Need 2FA\" - End User and Administrator Mental Models of HTTPS
categories: [paper summary]
tags: [security]
header:
  teaser: /assets/images/if-https-were-secure/figure2.png
---

["If HTTPS Were Secure, I Wouldn't Need 2FA" - End User and Administrator Mental Models of HTTPS](https://publications.cispa.saarland/2788/) Katharina Krombholz et al., IEEE Symposium on Security and Privacy 2019

In the short time that I've recommitted to reading Usable Security papers, I found this paper my Krombholz et al., to be the most fascinating. In their paper, they try to understand the root causes of common misconception of HTTPS by formalizing the mental models of end-users and administrators. 

## Primer on Mental Models
Mental models are an important concept in Psychology, HCI, Behavioral Economics but it may seem a bit complex if you haven't been exposed to it; so let's take a few minutes to talk about what they are. Using Wikipedia's definition, "A mental model is an explanation of someone's thought process about how something works in the real world. [1]" The hope is that someone's mental model closely matches reality but that's not always the case. Moreover, many Usable Security papers have proved as much. This misalignment can have serious consequences as it relates to security since these mental models will have influence on the decisions a user makes in certain situations. 

## Why you asking all them questions?
In their work, Krombholz et al. tried to answer the following questions:

- What are people's expectations and perceptions of encryption and visiting sites via HTTPS

- How well do users understand the associated threat models

- What are the differences between end users' and administrators' mental models of HTTPS

## Getting some answers
Krombholz et. al, designed their study to try to understand the tacit knowledge both administrators and end users have about HTTPS. They did so by having participants perform three drawing tasks based on three different scenarios: 

1) a general scenario of sending an encrypted message to a communication partner

2) online shopping via HTTPS

3) online banking

The results they reported in their paper were based on 30 interviews from 12 administrators and 18 end-users. A limitation that authors pointed out was that their study population was not very diverse. The end-user participants skewed more female while the sample of participants was completely male. 

## Expectations

One of the things that I appreciated about this paper is that they explicitly laid out their expectations and acknowledged how they could influence their analysis of the data. 

Krombholz et al. argue that the mental models of both end users and admins are built on the protocols and UX in which they interact. So, they thought those components would be central to participants' mental models. Specifically for end users, they thought they would not have deep knowledge about encryption concepts but that their mental models would security indicators (e.g., the padlock icon). For administrators, they expected more in-depth knowledge that would include things like certificates, CAs, symmetric and asymmetric encryption, etc.

## Mental Models

Through their coding of participant models, Krombholz et al., found four different types of mental models that represented different levels of understanding of HTTPS and message encryption.

{:refdef: style="text-align: center;"}
![figure 2](/assets/images/if-https-were-secure/figure2.png)
{: refdef}
The figure above is the model of message of message encryption that correctly abstracts the underlying technology. This model has concepts such as encryption and decryption performed at the communication endpoints, shows that the data in transit is protected from attackers, and at least acknowledges the existence of different types of keys. In the paper, the authors point out that while the model is conceptually correct that it is still fairly sparse when it comes to the purpose of these different entities.

{:refdef: style="text-align: center;"}
![figure 3](/assets/images/if-https-were-secure/figure3.png)
{: refdef}

The second model was what the authors referred to as the anti-model of message encryption. This model is shown in the figure above and includes a centralized authority that performs actions such as encryption and authentication, shows that data isn't protected from attackers and doesn't include keys. This anti-model was only common among end-users in their study population.

{:refdef: style="text-align: center;"}
![figure 4](/assets/images/if-https-were-secure/figure4.png)
{: refdef}
The third model similar to the first model shown for message encryption had correct mental representations of the concepts and entities in HTTPS. This model had the following properties: data in transit was encrypted and protected from attackers, had the existence of a CA, the browser was perceived as a relevant entity. The authors found that the admins' mental models contained more entities such as certificate checks, TLS handshakes, etc. 


{:refdef: style="text-align: center;"}
![figure 5](/assets/images/if-https-were-secure/figure5.png)
{: refdef}

The last model was the anti-model of HTTPS. This model contained things such as omnipotent attackers like intelligence agencies, the concept that smartphones were generally insecure, and 2FA as an additional layer of encryption. Unlike the message encryption anti-model, the authors found that 2 admins models also contained elements of this anti-model.


## Themes
In their paper, Krombholz et al., lay out some of themes that emerged from the drawing tasks and think-aloud protocol. There are _a lot_ of them but I want to call out a few. 

One of the more interesting ones was that they found that half of the participants in the end-user sample had never noticed the security indicators before. This ran counter to the authors' expectations. Moreover, it shows that despite the extensive work that has been put into improving HTTPS security indicators end users still don't properly recognize them. Also, they found that some end users and admins just didn't trust the security indicators or HTTPS as a protocol.
> The lock symbol does not mean anything, it is pure marketing. (A06)

Krombholz et al. also found that there were misconceptions surrounding the differences between authentication and encryption for both end users and admins. This misconception is where the title of the paper comes from. 

>HTTPS is a bad protocol. If HTTPS were secure, I wouldn't need 2FA (U11)

The last theme that I want to call out from the paper relates to the differences between admins and end users. Krombholz et al., found that the mental models of end users were more conceptual while the mental models of admins were more protocol based. Basically, most of the admins showed familiarity with specific things related to the protocol. However, when asked to explain the underlying concepts of HTTPS, most admins were unable to.

With their findings on the difference in mental models among admins and end users, Krombholz et al. argue that end users and even admins to a certain extent, shouldn't be expected to have fully correct mental models of HTTPS.

## So what?
You might be thinking to yourself, "Who cares if people have (in)correct or sparse mental models?" So there is actually a good deal to care about and Krombholz et al point that out in their paper. Participants who had incorrect mental models were more likely to underestimate the security benefits of HTTPS and thought omnipotent attackers could eavesdrop. This type of thinking can lead to users making incorrect security decisions. On the other end of the spectrum, they found that one end user thought that HTTPS could protect them from being phished. This type of assumption leads to a false sense of security when using HTTPS.

## Making things better
Krombholz et al., provide a lot of suggestions on how to improve both end users' and admins' understanding of HTTPS. In the case of admins, they suggest that tools like Let's Encrypt and Certbot provide tangible explanations of things like keys and certificates so improve admins understandings of the different protocol components. For end users, they suggest that protocols should offer state of the art encryption by default and that insecure protocols should be abandoned. They believe this would help establish a more user-friendly distinction between best-case security and vulnerable connections. They also call out the work by Google which doesn't show any security indicators for sites using HTTPS but shows a red security indicator for those sites using HTTP.

## Wrapping Up
Krombholz and her collaborators show that there are a lot of misconceptions about HTTPS among both end users and admins and that these misconceptions lead to decisions that can put themselves and potentially others at risk.

## References
[1] https://en.wikipedia.org/wiki/Mental_model

