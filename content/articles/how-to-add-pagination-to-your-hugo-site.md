---
title: How to add pagination to your Hugo site
date: '2018-01-06T14:28:42+11:00'
categories:
  - development
---
{{< lead >}}[Hugo](https://gohugo.io/) is a feature-packed static site generator on which I've recently built this website. I'm going to show you how to add pagination to your Hugo site.{{< /lead >}}

I'm assuming you have an existing Hugo site but if not, [they're very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it.

If you have experience with a CMS such as WordPress you'll be pleased to find that Hugo uses a lot of very similar terminology.

Hugo's documentation is high quality and I recommend you dive into the [pagination docs](https://gohugo.io/templates/pagination/) if you still have questions after reading this article.

---

## Getting started

### Add some posts

In order to demonstrate pagination you will need several posts on your site. If you're in the early stages of developing a site try adding some dummy posts simulate multiple pages.

### Set the number of posts per page

Hugo defaults to 10 posts per page but for testing purposes I found it more practical to reduce this number to 2-3. You can do this in your [hugo config file](https://gohugo.io/getting-started/configuration/) in the following way (shown below in YAML).

{{< highlight yaml >}}
paginate: 2
{{< /highlight >}}


## Output posts

The most straightforward way to output your posts is on the home page using <code>/layouts/index.html</code>. If this file doesn't exist yet, go ahead and create it. 

Next, we will create a custom variable to handle pagination.

{{< highlight hugo >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{< /highlight >}}

This is similar to a WordPress query and it sets up a .Paginate object including all posts. This will be used to output posts using Hugo's [range function](https://gohugo.io/functions/range/), which is roughly equivalent to a for or while loop.

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

I recommend taking advantage of Hugo's [partial templates](https://gohugo.io/templates/partials/) for any repetitive blocks of HTML such as this post. It allows the same markup to be shared across all Hugo listings such as the category and tag taxonomies.

## Output page numbers

Up to this point the Hugo code we've written isn't much different to [a standard list template](https://gohugo.io/templates/lists/#example-list-templates) but here's where the good stuff begins.

---
