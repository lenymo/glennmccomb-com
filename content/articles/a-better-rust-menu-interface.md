---
title: A better Rust menu interface
date: '2018-01-22T20:28:46+11:00'
featured: /img/uploads/featured-image-rust-menu-ui.jpg
categories:
  - design
  - gaming
featured_opacity: '0.2'
dark_bg: true
page_header_bg_color: '#2b2925'
---
{{< lead >}}Rust's menu interface is in need of an overhaul. The most heavily used screen &mdash; the server browser &mdash; functions the most poorly so I've had a crack at improving it.{{< /lead >}}

When you find yourself using an external website (shout out to [battlemetrics](https://www.battlemetrics.com/servers/rust)) to find a decent server something is clearly up.

## Server browser redesign

Here's my attempt at improve the server browser:

{{< article-body-full-bleed >}}
![Rust menu UI](/img/uploads/article-rust-menu-ui-servers.jpg)
{{< /article-body-full-bleed >}}

## What's the difference?

Here's a summary of what I've done.

* Added Truncated server description.
* Added [Time since last wipe](#time-since-last-wipe) as a column.
* Added Various [server filters](#server-filters).
* Added map size.
* Added steam friend count for each server.
* Removed player and server counts from server type icons.

For reference here's the server browser at the time of publishing:

{{< article-body-full-bleed >}}
![Rust menu UI](/img/uploads/article-rust-menu-ui-servers-old.jpg)
{{< /article-body-full-bleed >}}

### Time since last wipe

Recently wiped servers are currently difficult to find. Server owners are forced to put a time stamp of their last wipe near the beginning of their server name as a kind of click bait. They can add that info in the description but that's currently a whole entire click away. 

What I generally want is a server which recently wiped so I'm on a level footing with everyone else. In addition to being able to sort by most recent wipe date in the table headers, I've added a "Max server age" filter so only servers wiped in the last X days / hours will show. This would allow servers wiped in the last day to be shown, sorted by lowest ping.

<small>**NOTE:** Facepunch are trying to remove wipes from the game entirely but until then this is a much needed feature.</small>

### Server filters

Hopefully these are all self-explanatory but here's what I'd added:

* Player count filters. This is a great one from battle metrics and I usually set it to ~10 to weed out dead servers.
* Max server age. This is explained above.
* Max ping so you don't have to see slow AF servers.

The rest are existing features but they're all in one place now.

## Individual server screen

I also had a quick go at the individual server screen. The current popup is probably a little too small and it's annoying AF not being able to see the full title. 

Check it out:

{{< article-body-full-bleed >}}
![Rust menu UI](/img/uploads/article-rust-menu-ui-servers-server.jpg)
{{< /article-body-full-bleed >}}

## What's the difference?

Here's what I've done:

* Added favourite functionality.
* Added time since last wipe.
* Added map size.
* Added server geo location.

The rest are existing features re-organised.

Again, for reference here's the current server popup:

{{< article-body-full-bleed >}}
![Rust menu UI](/img/uploads/article-rust-menu-ui-servers-server-old.jpg)
{{< /article-body-full-bleed >}}

Hope you dig it.