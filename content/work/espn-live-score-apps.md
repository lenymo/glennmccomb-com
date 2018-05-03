---
title: ESPN live score apps
date: 2013-11-02T04:02:11.000Z
summary: A ground-up native re-design of ESPN Australia's live score apps.
custom_class: now-apps
custom_stylesheet: now-apps
---
{{< work-body-full-bleed container="yes" class="now-apps-intro" dark_bg="yes" padding="yes" >}}
{{< row >}}
{{< col offset="2" columns="3" class="col__image text-center" >}}
{{< img src="/img/uploads/work-nowapp-backstory-webapp.png" alt="Old web app" >}}
{{< /col >}}
{{< col columns="4" offset="1" class="col__content" >}}
## Back story

ESPN Australia have a suite of four live score apps on iPhone and Android. They were previously written in HTML, CSS & JavaScript and housed in a native app shell.

The content in the apps was good but the interface and UX let it down. In 2013, we decided to build native apps and were able to explore UI functionality not possible using web technology.
{{< /col >}}
{{< /row >}}
{{< /work-body-full-bleed >}}
{{< work-body-full-bleed container="yes" class="now-apps-now-brand" padding="yes" >}}
{{< row >}}
## The "Now" brand

Each of the four apps are branded with a unique colour which flows through the app's UI and creative assets.

A player silhouette helps communicate the sport and distinguishes one app from the other while at the same time visually tying them together.

[Photos of each brand]
{{< /row >}}
{{< /work-body-full-bleed >}}

---

## Sections

In our initial launch there were six sections.

[Photo of sections]

## Sketching

Sketching is a crucial part of my work flow. I use the [Behance Dot Grid Book](http://www.theghostlystore.com/collections/behance-action-method/products/behance-dot-grid-book). Sketching helps me quickly iterate UI / UX concepts without the distractions of Photoshop.

In the Scores sketch, I stacked teams and scores above one another rather than centre-aligning them on the same row. This made scanning scores faster and easier.

### Cards

I began to explore a card metaphor. In the Stats sketch I try hinting at a swipe gesture by showing the edges of the left and right cards.

[News sketch] [Stats sketch]

## Score worm

The score worm is a key UI element which describes the flow of play in AFL, NRL and Super Rugby. It visually communicates which team is winning and by how much and is very common in live score apps.

I tried to improve the design by vertically aligning the worm and the quarter-by-quarter scores below it.

[Sketch of score worm] [Final mockup of score worm]

## Video demo

To help communicate the proposed functionality of the app, I produced a Flash-based walkthrough of the scores and menu screens.

This was shared with our dev team, internal stake-holders and the app developers we worked with.

[Video showing UI]

---

## Designing with cards

The online world is currently being re-imagined with 'cards' as a primary visual metaphor.

The power of cards lies in their ability to visually associate related chunks of content, while at the same time differentiating them from other similar groupings of content.

[Tweets screenshot] [Matches screenshot] [Articles screenshot]

Prominent companies which use cards to enhance their UI include Google, Twitter, Pinterest, Spotify and Facebook. Paul Adams further describes trend in [this influential article](http://insideintercom.io/why-cards-are-the-future-of-the-web/).

---

## Swiping gestures

One of the most common use-cases in the apps is moving between rounds. Previously this was achieved using two buttons in the app's toolbar. Moving from one round to the next was a painful user experience.

[Screenshot of old round nav]

### First draft

With native gestures we could replace actual buttons with swiping gestures and save screen real estate. Great!

Except that in early beta tests users didn't know how to move from one round to the next. This was a big problem.

[First draft screenshot]

### Second draft

Keen to preserve screen space but also provide a visual aid for users, we added tappable round titles.

Users could still swipe between rounds, and to hint at the swiping gesture, tapping a round title would trigger the sliding animation.

[Second draft screenshot]

### Final draft

However, the hit-state of the buttons was too small to comfortably tap and the repetition of the word "round" was unnecessary.

The round titles were replaced with larger numbers and the edges of the neighbouring round's cards were shown to suggest more content.

[Final draft scrrenshot]

---

## Notes


I would like to make special mention of the ESPN Australia team whose hard work and collaboration was invaluable to the success of this project.

Also, a special thanks to the guys from [WeMakeApps](http://wemakeapps.net/) who were a pleasure to work with. I can personally recommend them if you need help with your iOS or Android development project.