---
title: Building custom pagination for your Hugo site
date: '2018-01-06T14:28:42+11:00'
categories:
  - development
toc: true
---
{{< lead >}}[Hugo](https://gohugo.io/) is an awesome feature-packed static site generator on which this site is built. It ships with a powerful default pagination template but if you're looking for full control, here I will demonstrate how to build custom pagination.{{< /lead >}}


## Introduction

I'm not going to be writing any CSS here and I'll use as little HTML as required. My goal is to help you understand how Hugo pagination works. I'll be using some simple JavaScript examples to help explain how Hugo's templating language works but JavaScript experience is not necessary.

I'll go through the code in depth but if you'd prefer to see the whole thing you can skip ahead to <a href="#the-final-code">see the final code</a>.

Hugo's documentation is very good and I recommend you dive into the [pagination docs](https://gohugo.io/templates/pagination/) if you still have questions when you're finished here.

---

## Pagination the easy way

If you're looking for basic pagination you can very easily use Hugo's default pagination template as follows:

{{< highlight html >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{ range $paginator.Pages }}
  &lt;!&dash;&dash; Article content goes here (eg. title, summary, etc). &dash;&dash;&gt;
{{ end }}
{{ template "_internal/pagination.html" . }}
{{< /highlight >}}

This uses Hugo's default pagination template and for most cases it's fine, but I wanted control over markup and I'm not a fan of how it handles excess pages. If you'd like to learn how to build a custom solution, read on.

---

## Getting started with Hugo

If you don't have a Hugo site yet, [they're very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it for projects large and small. If you've previously used a CMS such as WordPress, you'll be pleased to find that Hugo uses a lot of similar terminology.

### Adding posts

In order to test pagination you'll need some content on your site. If you're in the early stages of development, add some dummy posts to help generate multiple pages.

### Setting the number of posts per page

Hugo defaults to 10 posts per page but for testing purposes I found it more practical to reduce this to 1-2. You can do this in your [hugo config file](https://gohugo.io/getting-started/configuration/) in the following way (shown below in YAML).

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

This is similar to a WordPress query and it sets up a <code>.Paginate</code> object including all posts. This will be used to output posts using Hugo's [range function](https://gohugo.io/functions/range/), which is roughly equivalent to a <code>for</code> or <code>while</code> loop.

Note that I've used "posts" as the content name, but that this could be anything (for this site I used "articles"). It should be the same as the directory name in <code>/content/</code>, for example <code>/content/posts/</code>.

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

This will output the post title with a permalink and a [summary](https://gohugo.io/content-management/summaries/). The summary is first 70 words of each post or everything before a <code>&lt;!&dash;&dash;more&dash;&dash;&gt;</code> comment.

I'm using [bem](http://getbem.com/introduction/) for my CSS class names but you can use whatever you like.

I recommend taking advantage of Hugo's [partial templates](https://gohugo.io/templates/partials/) for any repetitive blocks of HTML such as this post because it allows the same markup to be shared across different Hugo listings (eg. the category and tag taxonomies).

---

## Custom pagination

Up to this point the Hugo code we've written is very similar to [a standard list template](https://gohugo.io/templates/lists/#example-list-templates) but here's where the good stuff begins.

First we assign the <code>.Paginator</code> object to a <code>$paginator</code> variable.

{{< highlight hugo >}}
{{ $paginator := .Paginator }}
{{< /highlight >}}

Notice that this is different to the <code>.Paginate</code> object which was used to output posts.

Next we'll use a Hugo if statement to make sure there's more than one page before we start outputting page numbers.
{{< highlight hugo >}}
{{ if gt $paginator.TotalPages 1 }}
  {{ # Page number code goes here. }}
{{ end }}
{{< /highlight >}}

Hugo if statements take some getting used to because they're structured differently to most web programming languages and they use shorthand for operators rather than the symbols you might be familiar with (for example gt instead of >).

In most other languages the above code is written as:

{{< highlight js >}}
if ($paginator.TotalPages > 1) {
  // Page number code goes here.
}
{{< /highlight >}}

As with most loops and conditionals in Hugo, the if statement is closed with <code>{{ end }}</code> rather than a closing curly brace.

### Page numbers

Next, from within our Hugo if statement, we loop through the page numbers using the range function.

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

This will output your page numbers, and it's a good start, but it's good practice to let the user know which page they're on.

Here I've added an active class to the list item.

{{< highlight html >}}
<li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
{{< /highlight >}}

Let's zero in on that if statement.

{{< highlight html >}}
{{ if eq . $paginator }} pagination__item--current{{ end }}
{{< /highlight >}}

Firstly, it's important to understand that in Hugo, when you're within a range function, the <code>.</code> is roughly equivalent to <code>this</code> in JavaScript. It is the value of the current item in the loop.

In this case <code>$paginator</code> will be equal to whatever page we're currently viewing. When output, it's actual value is "Pager 1" if you're on page one.

So in other words what the above if statement is asking is: "if the current loop item is the same as the current page we're on... add a class."

### Next and previous links

For ease of use 

---

## The final code

