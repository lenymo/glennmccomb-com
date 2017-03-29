---
title: A better NBA box score
date: 2017-01-21T20:57:11+11:00
description: null
---

After seeing a ton of respected NBA Twitter people — including [LeBron James](https://twitter.com/KingJames/status/784207016877256704) — complaining about poorly designed box scores, I endeavoured to improve on the existing ESPN box score with a [free Chrome extension ](https://goo.gl/3DmHU1)and it’s now my favourite way to follow an NBA game. Between this, Twitter and league pass, I am all set.

## Layout

Using custom CSS I updated the layout of the box score page so as the two teams sit side by side and I stopped the chunky ESPN header from staying fixed at the top of the page as you scroll. Along with a few other visual tweaks, this provides more viewing space for the box scores themselves.

ESPN had left some tasty team stats hidden on the page including fast break points, points in the paint, total team turnovers and flagrant and technical fouls. These are once again visible.

Play-by-play data is added to the page below the box score in an iframe and formatting is added to highlight key plays.

![null](/img/uploads/box-score-layout.jpg)

## More stats please

In the early stages of development [Kevin Arnovitz](https://twitter.com/kevinarnovitz) tweeted out offering cookies to whoever could resurrect the now defunct Firefox plugin that added Dean Oliver’s [four factors](http://www.basketball-reference.com/about/factors.html) to ESPN’s box scores:

https://twitter.com/kevinarnovitz/status/794010513583677441

As a man who appreciates a well baked cookie, I got to work and as you can see below the extension adds quite a few additional team stats. These calculations are based on formulas in [Basketball Reference’s glossary](http://www.basketball-reference.com/about/glossary.html).

![null](/img/uploads/box-score-stats-team-stats.png)

True to his word, Arnovitz sent me [delicious baked goods](https://twitter.com/lenymo/status/799756952335060992).

### Possession-based stats

Note that the possession-based team statistics shown above (i.e. offensive rating) will vary from Basketball Reference’s numbers due to BR only counting turnovers which are attributed to individual players. This means team turnovers such as 5-second inbounds and 24 second shot clock violations are excluded from Basketball Reference’s pace numbers. This may be by design but to me it seemed like an oversight.

These possession-based numbers will also differ from NBA.com’s metrics because the NBA calculates possessions using a different formula — which they’re not 100% transparent about. If you’re interested in learning more about how possessions are calculated by various sites, [Justin Willard](https://twitter.com/acrossthecourt) has written about it extensively [on Nylon Calculus](http://nyloncalculus.com/2015/12/21/nylon-calculus-101-possessions/).

## Highlighting changes

When a game is live stats are constantly updating but it’s difficult to follow exactly *what* is changed. In the extension, updated stats are highlighted with a yellow background as shown below.

![null](/img/uploads/box-score-stats-play-sequence.jpg)

This provides context for each stat and allows the action to be pieced together. For example, in the above sequence Jonas Valanciunas has his shot blocked by Amir Johnson. Al Horford grabs the defensive rebound from Amir’s block and subsequently misses a 2-pointer. This can be cross referenced with the play-by-play, which the extension adds below the box score.

![null](/img/uploads/play-by-play-stats-play-sequence.png)

You no longer need to continually switch between the box score and play-by-play to follow the action.

## Advanced player stats

Immediately following a game’s completion, advanced stats can be viewed for individual players by clicking the advanced stats checkbox in the bottom right-hand corner of the page (next to the ESPN logo). As with team stats, these are all calculated using formulas from [Basketball Reference’s glossary](http://www.basketball-reference.com/about/glossary.html).

![null](/img/uploads/box-score-advanced-stats.png)

These stats *do *actually work while a game is live but they’re buggy and I’m still working on performance tweaks. Hopefully soon these will be available during live games.

## Sound interesting?

You can [download the extension here](https://goo.gl/3DmHU1) and if you have any feedback please reach out [on Twitter](https://twitter.com/lenymo). If you like it please rate it in the Chrome store and share it with your friends.

---

## Additional notes

* If the advanced stats or play-by-play section ever stop working, try hitting the refresh icon in the bottom right corner.

* I’d love to be able to figure out who’s on the court at any given time and highlight them somehow but this is proving difficult.

* The extension also works for college basketball although some features are limited.

* There’s a lot of JavaScript running on the page so I don’t recommend having multiple tabs open at the same time. This can start to slow your browser down.

* The extension requires access to your browsing data in order to work. This is just how Chrome extensions work — I don’t track who uses the extension or what other sites they are visiting. That would not be cool. The extension is designed for hoops fans so please trust me on this.

* I have no plans for a Firefox extension. This is a personal project and my time is limited.

## The original box score

For reference below is the original ESPN box score

![null](/img/uploads/espn-boxscores-before.png)

