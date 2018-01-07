---
title: How to add pagination to your Hugo site
date: '2018-01-06T14:28:42+11:00'
categories:
  - development
---
{{< lead >}}[Hugo](https://gohugo.io/) is an awesome feature-packed static site generator on which this site is built. Here I demonstrate how to add pagination to a Hugo site or theme including page numbers, next and previous buttons and more.{{< /lead >}}

If you don't yet have a Hugo site ready to go, [they're very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it for sites large and small. If you have experience with a CMS such as WordPress you'll be pleased to find that Hugo uses a lot of very similar terminology.

I'm not going to be writing any CSS here and I'll use as little HTML as required. My goal is to help you understand how Hugo pagination works.

I'll go through the code in isolation and in depth but if you'd prefer to see the whole thing you can skip ahead to <a href="#the-final-code">see the final code</a>.

Hugo's documentation is very good and I recommend you dive into the [pagination docs](https://gohugo.io/templates/pagination/) if you still have questions when you're finished here. 

---

## Getting started

### Adding posts

In order to demonstrate pagination you need lots of posts on your site. If you're in the early stages of development, add some dummy posts to help generate multiple pages.

### Setting number of posts per page

Hugo defaults to 10 posts per page but for testing purposes I found it more practical to reduce this to 2-3. You can do this in your [hugo config file](https://gohugo.io/getting-started/configuration/) in the following way (shown below in YAML).

{{< highlight yaml >}}
paginate: 2
{{< /highlight >}}

---

## Outputting posts

The most straightforward way to output posts is on the home page using the <code>/layouts/index.html</code> home template. If this file doesn't exist yet, go ahead and create it and add your standard HTML scaffolding.

Next within <code>index.html</code> we will create a custom variable to handle pagination.

{{< highlight hugo >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{< /highlight >}}

This is similar to a WordPress query and it sets up a <code>.Paginate</code> object including all posts. This will be used to output posts using Hugo's [range function](https://gohugo.io/functions/range/), which is roughly equivalent to a for or while loop.

Note that I've used "posts" as the content name but it could be anything (for this site I used "articles"). This should be directory name in <code>/content/</code>, for example <code>/content/posts/</code>.

Here's how we iterate over the paginate object.

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

This will output the post title with a permalink and a summary. The [summary](https://gohugo.io/content-management/summaries/) is first 70 words of each post or everything before <code>&lt;!&ndash;&ndash;more&ndash;&ndash;&gt;</code>.

If you're thinking my CSS classes look funky, it's because I'm using [bem](http://getbem.com/introduction/). Bem is great but you can use 

I recommend taking advantage of Hugo's [partial templates](https://gohugo.io/templates/partials/) for any repetitive blocks of HTML such as this post. It allows the same markup to be shared across all Hugo listings such as the category and tag taxonomies.

---

## Adding page numbers

Up to this point the Hugo code we've written is very similar to [a standard list template](https://gohugo.io/templates/lists/#example-list-templates) but here's where the good stuff begins.

First we set assign the <code>.Paginator</code> object to a paginator variable.

{{< highlight hugo >}}
{{ $paginator := .Paginator }}
{{< /highlight >}}

Notice that this is different to the <code>.Paginate</code> object which was used to output posts.

Next we will use a Hugo conditional statement to check if page numbers are needed (i.e. is there more than one page)?
{{< highlight hugo >}}
{{ if gt $paginator.TotalPages 1 }}
  {{ # Page number code goes here. }}
{{ end }}
{{< /highlight >}}

Hugo if statements took some getting used to because they're structured differently to every other programming language I've encountered to date. In most other languages the above code is written as:

{{< highlight js >}}
if ($paginator.TotalPages > 1) {
  // Page number code goes here.
}
{{< /highlight >}}

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

This will output your page numbers, and it's ok but it's good practive to let the user know which page they're on.

Here I've added an active class to the list item.

{{< highlight html >}}
<li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
{{< /highlight >}}

---

## The final code

