---
title: How to build custom Hugo pagination
date: '2018-01-06T14:28:42+11:00'
categories:
  - development
toc: true
---
{{< lead >}}[Hugo](https://gohugo.io/) is an awesome feature-packed static site generator with which this site is built. It ships with a powerful default pagination template but if you're looking for full control, I'm going to demonstrate how to build custom pagination.{{< /lead >}}


## Introduction

My goal is to help you understand how Hugo pagination works. I'm not going to be writing any CSS here and I'll use as little HTML as required. I'll be using some simple JavaScript examples to help explain how Hugo's templating language works but JavaScript experience is not necessary. The logic around 

I'll go through the code in depth but if you'd prefer to see the whole thing you can skip ahead to <a href="#the-final-code">see the final code</a>.

Hugo's documentation is very good and I recommend you dive into the [pagination docs](https://gohugo.io/templates/pagination/) if you still have questions when you're finished here.

---

## Pagination the easy way

If you're looking for basic pagination you can very easily use Hugo's default pagination template as follows:

{{< highlight html >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{ range $paginator.Pages }}
  &lt;!&dash;&dash; Post content such as title, summary, etc. &dash;&dash;&gt;
{{ end }}
<!-- Hugo's default pagination template. -->
{{ template "_internal/pagination.html" . }}
{{< /highlight >}}

{{< figure src="/img/uploads/article-hugo-pagination-default.jpg" caption="I prefer my pagination to be more concise than Hugo's default offering." >}}

This uses Hugo's default pagination template and for most cases it's fine, but I wanted to control my markup and I'm not a fan of how it handles excess pages. If you'd like to learn how to build a custom solution, read on.

---

## Getting started with Hugo

If you don't have a Hugo site yet, [it's very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it for projects large and small. If you've previously used a CMS such as WordPress, you'll be pleased to find that Hugo uses a lot of similar terminology.

### Adding posts

In order to test pagination you'll need some content on your site. If you're in the early stages of development, add some dummy posts to help generate multiple pages.

### Setting the number of posts per page

Hugo defaults to 10 posts per page but for testing purposes I found it more practical to reduce this to 1-2. You can do this in your [hugo config file](https://gohugo.io/getting-started/configuration/) in the following way (shown below in <code>config.yaml</code>):

{{< highlight yaml >}}
paginate: 1
{{< /highlight >}}

---

## Outputting posts

The most straightforward way to output posts is on your site's home page using the <code>/layouts/index.html</code> template. If this file doesn't exist yet, go ahead and create it and add some standard HTML scaffolding.

Next within <code>index.html</code> we'll create a custom variable to handle pagination and determine which posts are retrieved.

{{< highlight hugo >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{< /highlight >}}

This is similar to a WordPress query and it sets up a <code>.Paginate</code> object containing all posts matching the <code>where</code> statement. This will be used to output posts using Hugo's [range function](https://gohugo.io/functions/range/), which is roughly equivalent to a <code>for</code> or <code>while</code> loop.

Note that I've used "posts" as the content name, but that this could be anything (for my site I used "articles"). It should be the same as the directory name in <code>/content/</code>, for example <code>/content/posts/</code>.

Here's how we iterate over the paginate object:

{{< highlight hugo >}}
{{ range $paginator.Pages }}
  <div class="post">
    <h2 class="post__title">
      <a href="{{ .Permalink }}">{{ .Title }}</a>
    </h2>
    <div class="post__summary">
      {{ .Summary }}
    </div>
  </div>
{{ end }}
{{< /highlight >}}

This will output the post title with a permalink and a [summary](https://gohugo.io/content-management/summaries/). The summary is the first 70 words of each post or everything before a <code>&lt;!&dash;&dash;more&dash;&dash;&gt;</code> comment.

I'm using [bem](http://getbem.com/introduction/) for my CSS class names but you can use whatever you like. However, I recommend taking advantage of Hugo's [partial templates](https://gohugo.io/templates/partials/) for any repetitive blocks of HTML such as this because it allows the same markup to be shared across different Hugo listings (eg. the category and tag taxonomies).

---

## Custom pagination

Up to this point the Hugo code we've written is very similar to [a standard list template](https://gohugo.io/templates/lists/#example-list-templates) but here's where things get interesting.

First we assign the <code>.Paginator</code> object to a <code>$paginator</code> variable.

{{< highlight hugo >}}
{{ $paginator := .Paginator }}
{{< /highlight >}}

Notice that this is different to the <code>.Paginate</code> object which was used to output posts.

Next we'll use a Hugo <code>if</code> statement to make sure there's more than one page before we start outputting page numbers.
{{< highlight hugo >}}
{{ if gt $paginator.TotalPages 1 }}
  {{ # Page number code goes here. }}
{{ end }}
{{< /highlight >}}

Hugo if statements take some getting used to because they're structured differently to most web programming languages and they use shorthand for operators rather than the symbols you might be familiar with (for example gt instead of >).

In languages suc has JavaScript or PHP the above code is written as:

{{< highlight js >}}
if ($paginator.TotalPages > 1) {
  // Page number code goes here.
}
{{< /highlight >}}

As with most loops and conditionals in Hugo, the <code>if</code> statement is closed with <code>{{ end }}</code> rather than a closing curly brace.

### Page numbers

Next, from within our <code>if</code> statement, we loop through the page numbers using the range function.

{{< highlight html >}}
<ul class="pagination">
  {{ range $paginator.Pagers }}
  <li class="pagination__item">
    <a href="{{ .URL }}" class="pagination__link">
      {{ .PageNumber }}
    </a>
  </li>
  {{ end }}
</ul>
{{< /highlight >}}

This will output your page numbers, and it's a good start, but we should let our users know which page they're on.

Here I've added an active class to the list item.

{{< highlight html >}}
<li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
{{< /highlight >}}

Let's zero in on that <code>if</code> statement.

{{< highlight html >}}
{{ if eq . $paginator }} pagination__item--current{{ end }}
{{< /highlight >}}

Firstly, it's important to understand that in Hugo, when you're within a range function, the <code>.</code> is roughly equivalent to <code>this</code> in JavaScript. It is the value of the current item in the loop. You can learn more about "the dot" and context [in Hugo's docs](https://gohugo.io/templates/introduction/#context-aka-the-dot).

In this case <code>$paginator</code> will be equal to whatever page the user is currently viewing. When output, it's actual value is "Pager 1" if you're on page one. Similarly, the page item within the loop &mdash; represented by <code>.</code> &mdash; has the value of "Pager X" as <code>range</code> iterates through X number of pages.

So in other words: "if the current loop item is the same as the current page we're on... add a class."

Great, that's looking better.

### Next and previous page links

Hugo makes adding next and previous buttons very easy. It assumes they won't be shown on the first and last pages respectively and there are handy boolean properties which handle this logic. Since these return a true or false value, Hugo allows us to write a more succinct <code>if</code> statement.

Here's how we would output the previous page link:

{{< highlight html >}}
{{ if $paginator.HasPrev }}
  <li class="pagination__item pagination__item--previous">
    <a href="{{ $paginator.Prev.URL }}" class="pagination__link pagination__link--previous">
      «
    </a>
  </li>
{{ end }}
{{< /highlight >}}

Notice that we can access the previous page URL via <code>$paginator.Prev.URL</code>. 

The next page link is output in much the same way:

{{< highlight html >}}
{{ if $paginator.HasNext }}
  <li class="pagination__item pagination__item--next">
    <a href="{{ $paginator.Next.URL }}" class="pagination__link pagination__link--next">
      «
    </a>
  </li>
{{ end }}
{{< /highlight >}}

### First and last page links

I'm not 100% convinced that first and last page links are essential to usable pagination, but adding them is relatively easy. Hugo doesn't have an equivalent to <code>.HasPrev</code> but the logic is the same: they probably shouldn't show up on the first and last pages respectively.

We can write a simple <code>if</code> statement to ensure the first page link is only shown if the user is <em>not</em> on the first page:

{{< highlight html >}}
  {{ if ne $paginator.PageNumber 1 }}
    <li class="pagination__item pagination__item--first">
      <a class="pagination__link pagination__link--first" href="{{ $paginator.First.URL }}">
        ««
      </a>
    </li>
  {{ end }}
{{< /highlight >}}

The first page link can be accessed via <code>$paginator.First.URL</code>.

We can run a similar check to make sure the last page button isn't shown on the last page like so:

{{< highlight html >}}
  {{ if ne $paginator.PageNumber $paginator.TotalPages }}
    <li class="pagination__item pagination__item--last">
      <a class="pagination__link pagination__link--last" href="{{ $paginator.Last.URL }}">
        ««
      </a>
    </li>
  {{ end }}
{{< /highlight >}}

### Good but not great

This is all coming together nicely. For a short while, when I reached this point, I thought I had pagination all sorted. But there are issues with what we've written because there's nothing to stop page numbers being output indefinitely. This is fine if there are 10 pages but what if there are 20? 50?

At this point I strongly considered abandoning my quest for custom pagination. Hugo's built-in pagination is really good and I could probably just use CSS to remove anything I didn't want. But no, I persisted.

### Smarter page numbers

Before I go any further I'll outline what I wanted to achieve:

* A set number of page links either side of the current page.
* The same number of overall pages showing at all times.
* No dots between page numbers.

To help illustrate that visually here are some examples of how this might look with 10 pages with 2 links either side.

<h6 style="margin-bottom: 10px">Page one</h6>

<nav class="pagination" style="margin-top: 0;">
  <ul class="pagination__list" style="margin: 0">
    <li class="pagination__item pagination__item--current">
      <a class="pagination__link pagination__link--1 pagination__link--current">
        1
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        2
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        3
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        4
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        5
      </a>
    </li>
  </ul>
</nav>

<hr>

<h6 style="margin-bottom: 10px">Page five</h6>

<nav class="pagination" style="margin-top: 0;">
  <ul class="pagination__list" style="margin: 0">
    <li class="pagination__item">
      <a class="pagination__link">
        3
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        4
      </a>
    </li>
    <li class="pagination__item pagination__item--current">
      <a class="pagination__link pagination__link--current">
        5
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        6
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        7
      </a>
    </li>
  </ul>
</nav>

<hr>

<h6 style="margin-bottom: 10px">Page ten</h6>

<nav class="pagination" style="margin-top: 0;">
  <ul class="pagination__list" style="margin: 0">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--1">
        6
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        7
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        8
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        9
      </a>
    </li>
    <li class="pagination__item pagination__item--current">
      <a class="pagination__link pagination__link--current">
        10
      </a>
    </li>
  </ul>
</nav>

---

## The final code

