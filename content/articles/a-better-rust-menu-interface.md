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

## Here's my redesign

{{< article-body-full-bleed >}}
![Rust menu UI](/img/uploads/article-rust-menu-ui-servers.jpg)
{{< /article-body-full-bleed >}}

## What's different?

Here's a summary of what I've added.

* Time since last wipe.
* Various filters.
* Map size.
* Full server title and truncated description.
* An indicator showing how many Steam friends are on each server.

### Time since last wipe

Recently wiped servers are currently difficult to find. Server owners are forced to put a time stamp of their last wipe near the beginning of their server name as a kind of click bait. They can add that info in the description but that's currently a whole entire click away. 

What I generally want is a server which recently wiped so I'm on a level footing with everyone else. In addition to being able to sort by most recent wipe date in the table headers, I've added a filter so only servers wiped in the last X days or hours will show. 

I can then easily find servers wiped in the last day and sort them by lowest ping.

## Individual server screen

{{< article-body-full-bleed >}}
![Rust menu UI](/img/uploads/article-rust-menu-ui-servers-server.jpg)
{{< /article-body-full-bleed >}}