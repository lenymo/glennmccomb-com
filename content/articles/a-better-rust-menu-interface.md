---
title: A better Rust menu interface
date: '2018-01-24T20:28:46+11:00'
featured: /img/uploads/featured-image-rust-menu-ui.jpg
categories:
  - design
  - gaming
featured_opacity: '0.2'
custom_class: rust-menu-ui
dark_bg: true
page_header_bg_color: '#2b2925'
---
{{< lead >}}Rust's menu interface is in need of an overhaul. The most heavily used screen &mdash; the server browser &mdash; functions the most poorly of all, so I've had a crack at improving it.{{< /lead >}}

It's difficult to find a server in Rust. When you find yourself using a 3rd party website (shouts to [battlemetrics](https://www.battlemetrics.com/servers/rust)) to find a decent server something is clearly up. 

## Server browser redesign

Here's my attempt at improving the server browser:

{{< article-body-full-bleed >}}
{{< img src="/img/uploads/article-rust-menu-ui-servers.jpg" alt="Rust menu UI" >}} 
{{< /article-body-full-bleed >}}

## What's the difference?

Here's a summary of what I've done:

* Added truncated server description.
* Added [time since last wipe](#time-since-last-wipe) column (wiped).
* Added some [additional server filters](#server-filters).
* Added map size for each server.
* Added Steam friend count for each server.
* Removed player and server counts from server type icons.

For reference here's the server browser at the time of publishing:

{{< article-body-full-bleed >}}
{{< img src="/img/uploads/article-rust-menu-ui-servers-old.jpg" alt="Current Rust menu UI" >}}
{{< /article-body-full-bleed >}}

### Time since last wipe

Recently wiped servers are currently difficult to find. Server owners are forced to add a time stamp of their last wipe near the beginning of their server name as a kind of click bait. They can add that info in the description but that's currently a whole entire click away in a popup.

What most people are looking for is a server which recently wiped so there's a level playing field. In addition to being able to sort by most recent wipe date, I've added a "Max server age" filter so only servers wiped in the last X days / hours will show. This would allow servers wiped in the last day to be shown, sorted by lowest ping.

<small>**NOTE:** Facepunch are trying to phase out wipes but in the mean time this is a much needed feature.</small>

### Server filters

Hopefully these are all self-explanatory but here's what I'd added:

* Player count filters. This is a great one from battle metrics and I usually set it to ~10 to weed out dead servers.
* Max server age. This is explained above.
* Max ping so you don't have to see slow AF servers.

The rest are existing features but they're all in one place now.

## Individual server screen

I had a quick go at the individual server screen. The current popup is too small and it's annoying AF not being able to read the full title. 

Check it out:

{{< article-body-full-bleed >}}
{{< img src="/img/uploads/article-rust-menu-ui-servers-server.jpg" alt="Rust server UI" >}}
{{< /article-body-full-bleed >}}

## What's the difference?

Here's what I've done:

* Added "favourite" functionality.
* Added time since last wipe.
* Added list of Steam friend's on this server.
* Added map size.
* Added server geo location.

The rest are existing features re-organised.

Again, for reference here's the current server popup:

{{< article-body-full-bleed >}}
{{< img src="/img/uploads/article-rust-menu-ui-servers-server-old.jpg" alt="Old Rust server UI" >}}
{{< /article-body-full-bleed >}}

Hope you dig it. 

Comment if you've got any other ideas or feedback.