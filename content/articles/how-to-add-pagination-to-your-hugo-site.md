---
title: How to add pagination to your Hugo site
date: '2018-01-06T14:28:42+11:00'
categories:
  - development
---
{{< lead >}}[Hugo](https://gohugo.io/) is a feature-packed static site generator on which I've recently rebuilt this website. In this article I'm going to show you how to add pagination to your Hugo site.{{< /lead >}}

In this article I'm assuming you have an existing Hugo site and a basic understanding of HTML and CSS. If you don't have a Hugo site, [they're very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it for basic websites.

If you have experience with a CMS such as WordPress you'll be pleased to find that Hugo uses a lot of very similar terminology.

Hugo's documentation is high quality and I recommend you dive into the [Pagination docs](https://gohugo.io/templates/pagination/) if you still have questions after reading this article.

---

## Getting started

### Add some articles

In order to demonstrate pagination you will need several articles on your site. If you're in the early stages of developing a site try adding some dummy articles simulate multiple pages.

### Set number of items per page

Hugo defaults to 10 items per page but for testing purposes I found it more practical to reduce this number to 2-3. You can do this in your hugo config file in the following way.

{{< highlight yml >}}
paginate: 2
{{< /highlight >}}
