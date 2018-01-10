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

## Getting started with Hugo

If you don't have a Hugo site yet, [it's very easy to set up](https://gohugo.io/getting-started/quick-start/) and I highly recommend it for projects large and small. If you've previously used a CMS such as WordPress, you'll be pleased to find that Hugo uses a lot of similar terminology.

### Adding posts

In order to test pagination you'll need some content on your site. If you're in the early stages of development, add some dummy posts to help generate multiple pages.

### Setting the number of posts per page

Hugo defaults to 10 posts per page but for testing purposes I found it more practical to reduce this to 1-2. You can do this in your [hugo config file](https://gohugo.io/getting-started/configuration/) in the following way (shown below in <code>config.yaml</code>):

{{< highlight yaml >}}
paginate: 1
{{< /highlight >}}

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

In languages such has JavaScript or PHP the above code is written as:

{{< highlight js >}}
if ($paginator.TotalPages > 1) {
  // Page number code goes here.
}
{{< /highlight >}}

Note that in Hugo loops and conditionals are commonly closed with <code>{{ end }}</code> rather than a closing curly brace.

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
      »
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
        »»
      </a>
    </li>
  {{ end }}
{{< /highlight >}}

### The limitations of our code so far

This is all coming together nicely. For a short while, when I reached this point, I thought I had pagination all sorted. But there are issues with what we've written because there's nothing to stop page numbers being output indefinitely. This is fine if there are 10 pages but what if there are 20? 50?

At this point I strongly considered abandoning my quest for custom pagination. Hugo's built-in pagination is really good and I could probably just use CSS to hide anything I didn't want. But no, I persisted.

There's most likely a more concise way of coding this type of navigation so if you've got any suggestions hit me up in the comments.

## Smarter page numbers

Before I go any further I'll outline what I wanted to achieve:

* A set number of page links either side of the current page (adjacent links).
* The same number of overall page numbers showing at all times.
* No dots between page numbers.

I also want to note that at this point in the article things get a little more intense in terms of Hugo coding. I'll try to break things down as much as possible but without some development experience it may be difficult to follow.

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

Some notes about the logic of the above pagination:

* Maximum number of pages to display can be found with <code>($adjacent_links * 2) + 1</code> which in this example is 5.
* If the total number of pages doesn't exceed the maximum number of pages to display, there's no need for complicated pagination logic; all page numbers will be shown.
* Pages 1-3 and 8-10 show the same group of page numbers but with a different active item. These pages are rendered differently to the middle pages.
* The above "lower limit" pages can be identified as being less than or equal to <code>$adjacent_links + 1</code>.
* The "upper limit" pages can be identified as being greater than or equal to <code>.TotalPages - $adjacent_links</code>.

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

Much like <code>if</code> statements, arithmetic in Hugo is unituitive and takes some getting used to. I usually write an HTML comment above each line in more traditional terms as a gift to my future self.

Next, within our <code>{{ range $paginator.Pagers }}</code> loop, we'll use Hugo's [scratchpad](https://gohugo.io/functions/scratch/) to store a boolean page number flag. This will be used to show / hide page numbers. It will be set to false by default.

{{< highlight html >}}
{{ range $paginator.Pagers }}
  {{ $.Scratch.Set "page-number-flag" "false" }}
{{ end }}
{{< /highlight >}}

We need to use <code>.Scratch</code> here because Hugo variables which are declared within an <code>if</code> statement can't be accessed outside said statement. Variables on the scratchpad can be set and retrieved just like regular variables.

<small><strong>NOTE:</strong> I've used a string value for <code>"false"</code> because I couldn't get <code>false</code> to work. Not sure why.</small>

### Simple page numbers

We then need to determine whether advanced logic is required to hide page numbers. If the total number of pages is greater than the maximum number of links to show (<code>$max_links</code>) we will use advanced logic.

{{< highlight html >}}
{{ range $paginator.Pagers }}
  {{ $.Scratch.Set "page-number-flag" "false" }}

  {{ if gt $paginator.TotalPages $max_links }}

    <!-- Logic for advanced page numbers (see below). -->

  {{ else }}

    {{ $.Scratch.Set "page-number-flag" "true" }}

  {{ end }}

  {{ if eq ($.Scratch.Get "page-number-flag") "true" }}
    <li class="pagination__item{{ if eq . $paginator }} pagination__item--current{{ end }}">
      <a href="{{ .URL }}" class="pagination__link">
        {{ .PageNumber }}
      </a>
    </li>
  {{ end }}
{{ end }}
{{< /highlight >}}

For the simple page numbers we will set the <code>page-number-flag</code> to true for all items in the <code>{{ range }}</code> loop since we want them all to show.

When the scratch flag is true, we will output the page numbers using the same code from our more basic code above.

### Advanced page numbers

As for the advanced page number links, we can use an <code>if</code> statement to check for lower limit links, upper limit links and lastly middle page links.

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

From here we need to ensure that only necessary pages are shown for each of the three scenarios by setting the <code>page-number-flag</code> to true.

#### Lower limit page numbers

The lower limit page numbers are very straight forward. We want to show pages from 1 to <code>$max_links</code>.

{{< highlight html >}}
<!-- If the current loop page is less than max_links. -->
{{ if le .PageNumber $max_links }}
  {{ $.Scratch.Set "page-number-flag" "true" }}
{{ end }}
{{< /highlight >}}

#### Upper limit page numbers

These are only slightly more complicated. We want to grab everything above <code>.TotalPages - $max_links</code>.

{{< highlight html >}}
<!-- If the current loop page is greater than total pages minus $max_links -->
{{ if gt .PageNumber (sub $paginator.TotalPages $max_links) }}
  {{ $.Scratch.Set "page-number-flag" "true" }}
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
  {{ $.Scratch.Set "page-number-flag" "true" }}
{{ end }}
{{< /highlight >}}

Ok we are finally here.

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
    
      {{ $.Scratch.Set "page-number-flag" "false" }}

      
      <!-- Advanced page numbers. -->
      {{ if gt $paginator.TotalPages $max_links }}


        <!-- Lower limit pages. -->
        <!-- If the user is on a page which is in the lower limit.  -->
        {{ if le $paginator.PageNumber $lower_limit }}

          <!-- If the current loop page is less than max_links. -->
          {{ if le .PageNumber $max_links }}
            {{ $.Scratch.Set "page-number-flag" "true" }}
          {{ end }}


        <!-- Upper limit pages. -->
        <!-- If the user is on a page which is in the upper limit. -->
        {{ else if ge $paginator.PageNumber $upper_limit }}

          <!-- If the current loop page is greater than total pages minus $max_links -->
          {{ if gt .PageNumber (sub $paginator.TotalPages $max_links) }}
            {{ $.Scratch.Set "page-number-flag" "true" }}
          {{ end }}


        <!-- Middle pages. -->
        {{ else }}
          
          {{ if and ( ge .PageNumber (sub $paginator.PageNumber $adjacent_links) ) ( le .PageNumber (add $paginator.PageNumber $adjacent_links) ) }}
            {{ $.Scratch.Set "page-number-flag" "true" }}
          {{ end }}

        {{ end }}

      
      <!-- Simple page numbers. -->
      {{ else }}

        {{ $.Scratch.Set "page-number-flag" "true" }}

      {{ end }}

      <!-- Output page numbers. -->
      {{ if eq ($.Scratch.Get "page-number-flag") "true" }}
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
