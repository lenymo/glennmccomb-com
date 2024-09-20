---
title: How to build custom Hugo pagination
date: '2018-01-10T14:28:42+11:00'
featured: /img/uploads/featured-image-article-hugo-pagination.jpg
categories:
  - development
featured_opacity: '0.1'
dark_bg: true
toc: true
---
{{< lead >}}[Hugo](https://gohugo.io/) is an awesome feature-packed static site generator which is also open source and free. It ships with a default pagination template but if you're looking for full control, I'm going to demonstrate how to build custom pagination.{{< /lead >}}


## Introduction

My focus in this tutorial is Hugo, so I won't be writing CSS and I'll use as little HTML as possible. I'll be using some basic JavaScript examples to help explain Hugo's syntax but JavaScript experience is unnecessary.

Things do get a little heavy towards the end but I'll go through the code in detail so it should all make sense. If you'd like to see the whole thing, skip ahead to <a href="#the-final-code">the final code</a>.

## Pagination the easy way

If you're looking for basic pagination you can very easily use Hugo's default pagination template as follows:

{{< highlight html >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{ range $paginator.Pages }}
  &lt;!&dash;&dash; Post content such as title and summary goes here. &dash;&dash;&gt;
{{ end }}
<!-- Hugo's default pagination template. -->
{{ template "_internal/pagination.html" . }}
{{< /highlight >}}

{{< img src="/img/uploads/article-hugo-pagination-default.jpg" caption="Hugo's awesome default pagination template (poorly styled by me)." >}}

This will pump out Hugo's default pagination template and for a lot of people this will be fine, but I want full control of my markup and I don't like how it handles excess pages. 

If you're also keen to build a custom solution &mdash; and learn more about Hugo in the process &mdash; read on.

## Getting started with Hugo

If you don't have a Hugo site yet, [it's very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it for projects large and small. If you have experience using a CMS such as WordPress you'll be pleased to find that Hugo uses a lot of similar terminology.

### Adding posts

In order to test pagination you'll need some content on your site. If you're in the early stages of development, add some dummy posts to your <code>/content/</code> directory to help generate multiple pages.

### Setting the number of posts per page

Hugo defaults to 10 posts per page but for testing purposes I found it more practical to reduce this to 1-2. You can do this in your [hugo config file](https://gohugo.io/getting-started/configuration/) in the following way (shown below in <code>config.yaml</code>):

{{< highlight yaml >}}
paginate: 1
{{< /highlight >}}

Remember to change it back when you're done testing.

## Outputting posts

The easiest way to output posts is on your site's home page using the <code>/layouts/index.html</code> template. If this file doesn't exist yet, go ahead and create it and add some standard HTML scaffolding.

Next within <code>index.html</code> we'll create a custom variable to handle pagination and determine which posts are retrieved.

{{< highlight hugo >}}
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
{{< /highlight >}}

This is similar to a WordPress query and it sets up a <code>.Paginate</code> object containing all posts matching the <code>where</code> statement. This will be used to output posts using Hugo's [range function](https://gohugo.io/functions/range/), which is roughly equivalent to a <code>for</code> or <code>while</code> loop.

Note that in this example I've used "posts" as the content name but it can be anything (for my site I used "articles"). It should be the same as the directory name in your Hugo <code>/content/</code> folder, for example <code>/content/<strong>posts</strong>/</code>.

Here's how we iterate over the <code>.Paginate</code> object:

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

I'm using [bem](http://getbem.com/introduction/) for my CSS class names but you can write your markup however you like. 

I do however recommend taking advantage of Hugo's [partial templates](https://gohugo.io/templates/partials/) for any repetitive blocks of HTML such as this because it allows the same markup to be shared across different Hugo listings (eg. the category and tag taxonomies).

## Custom pagination

Up to this point the Hugo code we've written is similar to [a standard list template](https://gohugo.io/templates/lists/#example-list-templates) but here's where things get interesting.

First we assign the <code>.Paginator</code> object to a <code>$paginator</code> variable.

{{< highlight hugo >}}
{{ $paginator := .Paginator }}
{{< /highlight >}}

Notice that this is different to the <code>.Paginate</code> object which is used to output posts.

Next we'll use a Hugo <code>if</code> statement to make sure there's more than one page before we start outputting page numbers.
{{< highlight html >}}
{{ if gt $paginator.TotalPages 1 }}
  <!-- Page number code goes here. -->
{{ end }}
{{< /highlight >}}

Hugo <code>if</code> statements take some getting used to because they're structured differently to most web programming languages and they use shorthand for operators rather than the symbols you might be familiar with (for example gt instead of >).

In languages such has JavaScript or PHP the above code is written as:

{{< highlight js >}}
if ($paginator.TotalPages > 1) {
  // Page number code goes here.
}
{{< /highlight >}}

### Page numbers

Next, from within our <code>if</code> statement, we loop through the page numbers using the <code>range</code> function.

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

This outputs page numbers and it's a good start, but we should let our users know which page they're on.

Here I've added an active class to the list item which will appear only on the current page.

{{< highlight html >}}
<li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
{{< /highlight >}}

Let's zero in on that Hugo <code>if</code> statement.

{{< highlight html >}}
{{ if eq . $paginator }} pagination__item--current{{ end }}
{{< /highlight >}}

Firstly, it's important to understand that in Hugo, when you're within a range function, the <code>.</code> is roughly equivalent to <code>this</code> in JavaScript. It refers to the current item in the loop. You can learn more about [context in Hugo here](https://gohugo.io/templates/introduction/#context-aka-the-dot).

In this case <code>$paginator</code> will be equal to whatever page the user is currently viewing. When output, its actual value is "Pager 1" if you're on page one. Similarly, the page item within the loop &mdash; represented by <code>.</code> &mdash; has the value of "Pager 1" or "Pager 2".

### Next and previous page links

Hugo makes adding next and previous buttons very easy. It assumes they won't be shown on the first and last pages respectively and there are handy boolean properties which handle this logic. Since these return a true or false value, Hugo allows us to write a more succinct <code>if</code> statement.

Here's how we output the previous page link:

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
      »
    </a>
  </li>
{{ end }}
{{< /highlight >}}

### First and last page links

I'm not 100% convinced that first and last page links are essential to usable pagination, but adding them is relatively easy. Hugo doesn't have a first and last equivalent to <code>.HasPrev</code> and <code>.HasNext</code> but the logic is the same: they probably shouldn't appear on the first and last pages respectively.

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

We can run a similar check to make sure the last page link isn't shown on the last page:

{{< highlight html >}}
  {{ if ne $paginator.PageNumber $paginator.TotalPages }}
    <li class="pagination__item pagination__item--last">
      <a class="pagination__link pagination__link--last" href="{{ $paginator.Last.URL }}">
        »»
      </a>
    </li>
  {{ end }}
{{< /highlight >}}

## Our code so far

This is coming together nicely. Here's what we have so far:

{{< highlight html >}}
{{ $paginator := .Paginator }}

<!-- If there's more than one page. -->
{{ if gt $paginator.TotalPages 1 }}

  <ul class="pagination">
    
    <!-- First page. -->
    {{ if ne $paginator.PageNumber 1 }}
    <li class="pagination__item pagination__item--first">
      <a class="pagination__link pagination__link--first" href="{{ $paginator.First.URL }}">
        ««
      </a>
    </li>
    {{ end }}

    <!-- Previous page. -->
    {{ if $paginator.HasPrev }}
    <li class="pagination__item pagination__item--previous">
      <a href="{{ $paginator.Prev.URL }}" class="pagination__link pagination__link--previous">
        «
      </a>
    </li>
    {{ end }}
  
    <!-- Page numbers. -->
    {{ range $paginator.Pagers }}
    <li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
      <a href="{{ .URL }}" class="pagination__link">
        {{ .PageNumber }}
      </a>
    </li>
    {{ end }}

    <!-- Next page. -->
    {{ if $paginator.HasNext }}
    <li class="pagination__item pagination__item--next">
      <a href="{{ $paginator.Next.URL }}" class="pagination__link pagination__link--next">
        »
      </a>
    </li>
    {{ end }}

    <!-- Last page. -->
    {{ if ne $paginator.PageNumber $paginator.TotalPages }}
    <li class="pagination__item pagination__item--last">
      <a class="pagination__link pagination__link--last" href="{{ $paginator.Last.URL }}">
        »»
      </a>
    </li>
    {{ end }}

  </ul><!-- .pagination -->
{{ end }}
{{< /highlight >}}

### The limitations of this code

For a short while when I reached this point I thought I had my custom pagination all sorted. But there are issues with what we've written. There's nothing to stop page numbers being output indefinitely which is fine if there are 10 pages. But what if there are 20... or 50?

At this point I strongly considered abandoning my quest for custom pagination. Hugo's built-in pagination is really good and I could probably hide anything I didn't want using CSS. But no, I pressed on.

## Smarter page numbers

Before I go any further I'll outline what I wanted to achieve:

* A set number of page links either side of the current page (adjacent links).
* The same number of overall page numbers showing at all times.
* No dots between page numbers when there are a lot of page numbers.

I also want to note that at this point in the article the Hugo coding gets a little more intense. I'll try to break things down as much as possible but depending on your development experience it may be difficult to follow.

### What do smarter page numbers look like?

Below are some examples of how pagination would look if there are 10 pages with 2 adjacent links.

<nav class="pagination">
  <ul class="pagination__list" style="margin: 0">
    <li class="pagination__item pagination__item--current">
      <a class="pagination__link pagination__link--current">
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

<nav class="pagination">
  <ul class="pagination__list" style="margin: 0">
    <li class="pagination__item">
      <a class="pagination__link">
        1
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        2
      </a>
    </li>
    <li class="pagination__item pagination__item--current">
      <a class="pagination__link pagination__link--current">
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

<nav class="pagination">
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

<nav class="pagination">
  <ul class="pagination__list" style="margin: 0">
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
    <li class="pagination__item pagination__item--current">
      <a class="pagination__link pagination__link--current">
        8
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        9
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link">
        10
      </a>
    </li>
  </ul>
</nav>

<nav class="pagination" style="margin-bottom: 40px;">
  <ul class="pagination__list" style="margin: 0">
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

<small><strong>NOTE:</strong> Orange = current page</small>

Some notes about the logic of the above pagination:

* Maximum number of pages to display can be found with <code>($adjacent_links * 2) + 1</code> which in this example is 5. I will call this <code>$max_links</code>.
* If the total number of pages doesn't exceed the maximum number of pages to display (<code>$max_links</code>), there's no need for complicated pagination logic; all page numbers will be shown.
* Pages 1-3 and 8-10 show the same group of page numbers but with a different active item. These pages are rendered differently to the middle pages.
* The above "lower limit" pages (1-3) can be identified as being less than or equal to <code>$adjacent_links + 1</code>. I will call this threshold <code>$lower_limit</code>.
* The "upper limit" pages (8-10) can be identified as being greater than or equal to <code>.TotalPages - $adjacent_links</code>. I will call this threshold <code>$upper_limit</code>.

### Coding smarter page numbers

To kick things off we will set up some config variables.

{{< highlight html >}}
<!-- Number of links either side of the current page. -->
{{ $adjacent_links := 2 }}

<!-- $max_links = ($adjacent_links * 2) + 1 -->
{{ $max_links := (add (mul $adjacent_links 2) 1) }}

<!-- $lower_limit = $adjacent_links + 1 -->
{{ $lower_limit := (add $adjacent_links 1) }}

<!-- $upper_limit = $paginator.TotalPages - $adjacent_links -->
{{ $upper_limit := (sub $paginator.TotalPages $adjacent_links) }}
{{< /highlight >}}

Much like <code>if</code> statements, Hugo arithmetic is unituitive and takes some getting used to. I usually write an HTML comment above each line in more traditional terms as a gift to my future self.

Next, within our <code>{{ range $paginator.Pagers }}</code> loop, we'll use Hugo's [scratchpad](https://gohugo.io/functions/scratch/) to store a boolean page number flag. This will be used to show / hide page numbers and it will be set to false by default (i.e. hidden). 

{{< highlight html >}}
{{ range $paginator.Pagers }}
  {{ $.Scratch.Set "page_number_flag" false }}
{{ end }}
{{< /highlight >}}

Why are we using <code>.Scratch</code> here? Because Hugo variables which are declared within an <code>if</code> statement can't be accessed outside of said <code>if</code> statement. Variables on the scratchpad aren't bound be these limitations and can be set and retrieved just like regular variables.

### Simple page numbers

We then need to determine whether complex logic is required to hide page numbers. If the total number of pages is greater than the maximum number of links to show (<code>$max_links</code>) we will use complex logic.

{{< highlight html >}}
{{ range $paginator.Pagers }}
  {{ $.Scratch.Set "page_number_flag" false }}

  <!-- Complex page numbers. -->
  {{ if gt $paginator.TotalPages $max_links }}

    <!-- Logic for complex page numbers (see below). -->

  <!-- Simple page numbers. -->
  {{ else }}

    {{ $.Scratch.Set "page_number_flag" true }}

  {{ end }}

  {{ if eq ($.Scratch.Get "page_number_flag") true }}
    <li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
      <a href="{{ .URL }}" class="pagination__link">
        {{ .PageNumber }}
      </a>
    </li>
  {{ end }}
{{ end }}
{{< /highlight >}}

For the simple page numbers we will set the <code>page_number_flag</code> to true for all items in the <code>{{ range }}</code> loop since we want them all to show.

When the scratch flag variable is true, we will output the page number HTML using the same markup as before.

### Complex page numbers

As for the complex page number links, we can use an <code>if</code> statement to check for lower limit links, upper limit links and middle page links.

{{< highlight html >}}
<!-- Lower limit pages. -->
<!-- If the user is on a page which is in the lower limit.  -->
{{ if le $paginator.PageNumber $lower_limit }}

  <!-- Logic to show only necessary lower limit pages. -->

<!-- Upper limit pages. -->
<!-- If the user is on a page which is in the upper limit. -->
{{ else if ge $paginator.PageNumber $upper_limit }}

  <!-- Logic to show only necessary upper limit pages. -->

<!-- Middle pages. -->
{{ else }}
  
  <!-- Logic to show only necessary middle pages. -->

{{ end }}
{{< /highlight >}}

From here we need to ensure that only the necessary pages are shown for each of the three scenarios by setting the <code>page_number_flag</code> to true.

#### Lower limit page numbers

The lower limit page numbers are very straight forward. We want to show pages from 1 to <code>$max_links</code> which in our working example is 5.

{{< highlight html >}}
<!-- If the current loop page is less than max_links. -->
{{ if le .PageNumber $max_links }}
  {{ $.Scratch.Set "page_number_flag" true }}
{{ end }}
{{< /highlight >}}

#### Upper limit page numbers

These are only slightly more complicated. We want to identify all page numbers above <code>.TotalPages - $max_links</code>.

{{< highlight html >}}
<!-- If the current loop page is greater than total pages minus $max_links -->
{{ if gt .PageNumber (sub $paginator.TotalPages $max_links) }}
  {{ $.Scratch.Set "page_number_flag" true }}
{{ end }}
{{< /highlight >}}

#### Middle page numbers

This is the most complex of the three scenarios and Hugo's syntax makes it more difficult to comprehend. I'll start by writing the code in a more familiar language (JS).

{{< highlight javascript >}}
if ( 
  .PageNumber >= $paginator.PageNumber - $adjacent_links
  &&
  .PageNumber <= $paginator.PageNumber + $adjacent_links
) {
  // Set flag to true.
}
{{< /highlight >}}

In plain English the <code>if</code> statement is asking:

* IF the current loop page number is greater than or equal to the page number the user is currently viewing minus <code>$adjacent_links</code>
* AND
* IF the current loop page number is less than or equal to the page number the user is currently viewing plus <code>$adjacent_links</code>.

This is a long-winded way of showing two page numbers either side of the current page.

Here's the actual Hugo code:

{{< highlight html >}}
{{ if and ( ge .PageNumber (sub $paginator.PageNumber $adjacent_links) ) ( le .PageNumber (add $paginator.PageNumber $adjacent_links) ) }}
  {{ $.Scratch.Set "page_number_flag" true }}
{{ end }}
{{< /highlight >}}

Great, let's check out the whole thing.

## The final code

{{< highlight html >}}

<!--
//
//  OUTPUT POSTS
//––––––––––––––––––––––––––––––––––––––––––––––––––
-->
{{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}

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

<!--
//
//  PAGE NUMBERS
//––––––––––––––––––––––––––––––––––––––––––––––––––
-->
{{ $paginator := .Paginator }}

<!-- Number of links either side of the current page. -->
{{ $adjacent_links := 2 }}

<!-- $max_links = ($adjacent_links * 2) + 1 -->
{{ $max_links := (add (mul $adjacent_links 2) 1) }}

<!-- $lower_limit = $adjacent_links + 1 -->
{{ $lower_limit := (add $adjacent_links 1) }}

<!-- $upper_limit = $paginator.TotalPages - $adjacent_links -->
{{ $upper_limit := (sub $paginator.TotalPages $adjacent_links) }}

<!-- If there's more than one page. -->
{{ if gt $paginator.TotalPages 1 }}

  <ul class="pagination">
    
    <!-- First page. -->
    {{ if ne $paginator.PageNumber 1 }}
    <li class="pagination__item pagination__item--first">
      <a class="pagination__link pagination__link--first" href="{{ $paginator.First.URL }}">
        ««
      </a>
    </li>
    {{ end }}

    <!-- Previous page. -->
    {{ if $paginator.HasPrev }}
    <li class="pagination__item pagination__item--previous">
      <a href="{{ $paginator.Prev.URL }}" class="pagination__link pagination__link--previous">
        «
      </a>
    </li>
    {{ end }}
  
    <!-- Page numbers. -->
    {{ range $paginator.Pagers }}
    
      {{ $.Scratch.Set "page_number_flag" false }}

      
      <!-- Advanced page numbers. -->
      {{ if gt $paginator.TotalPages $max_links }}


        <!-- Lower limit pages. -->
        <!-- If the user is on a page which is in the lower limit.  -->
        {{ if le $paginator.PageNumber $lower_limit }}

          <!-- If the current loop page is less than max_links. -->
          {{ if le .PageNumber $max_links }}
            {{ $.Scratch.Set "page_number_flag" true }}
          {{ end }}


        <!-- Upper limit pages. -->
        <!-- If the user is on a page which is in the upper limit. -->
        {{ else if ge $paginator.PageNumber $upper_limit }}

          <!-- If the current loop page is greater than total pages minus $max_links -->
          {{ if gt .PageNumber (sub $paginator.TotalPages $max_links) }}
            {{ $.Scratch.Set "page_number_flag" true }}
          {{ end }}


        <!-- Middle pages. -->
        {{ else }}
          
          {{ if and ( ge .PageNumber (sub $paginator.PageNumber $adjacent_links) ) ( le .PageNumber (add $paginator.PageNumber $adjacent_links) ) }}
            {{ $.Scratch.Set "page_number_flag" true }}
          {{ end }}

        {{ end }}

      
      <!-- Simple page numbers. -->
      {{ else }}

        {{ $.Scratch.Set "page_number_flag" true }}

      {{ end }}

      <!-- Output page numbers. -->
      {{ if eq ($.Scratch.Get "page_number_flag") true }}
        <li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
          <a href="{{ .URL }}" class="pagination__link">
            {{ .PageNumber }}
          </a>
        </li>
      {{ end }}

    {{ end }}

    <!-- Next page. -->
    {{ if $paginator.HasNext }}
    <li class="pagination__item pagination__item--next">
      <a href="{{ $paginator.Next.URL }}" class="pagination__link pagination__link--next">
        »
      </a>
    </li>
    {{ end }}

    <!-- Last page. -->
    {{ if ne $paginator.PageNumber $paginator.TotalPages }}
    <li class="pagination__item pagination__item--last">
      <a class="pagination__link pagination__link--last" href="{{ $paginator.Last.URL }}">
        »»
      </a>
    </li>
    {{ end }}

  </ul><!-- .pagination -->
{{ end }}

{{< /highlight >}}

There's most likely a more concise way of coding this type of navigation so if you have any suggestions hit me up in the comments.

## What next?

To take this to the next level I recommend moving the page numbers section of your code in to a [Hugo partial](https://gohugo.io/templates/partials/) in <code>/layouts/partials/</code> and calling it something imaginative like <code>pagination.html</code>.

This means your pagination code can be re-used in other places around your site such as a <code>/posts/</code> page, category page or taxonomy page. Hugo is smart enough to know which kind of posts to show on these pages.

Your partial can be called via <code>{{ partial "pagination.html" . }}</code> but it will only work if you output your posts using <code>.Paginate</code> in the template where you call it.

## Further reading

* Hugo's documentation is very good and I recommend diving into the [pagination docs](https://gohugo.io/templates/pagination/) if you still have questions.