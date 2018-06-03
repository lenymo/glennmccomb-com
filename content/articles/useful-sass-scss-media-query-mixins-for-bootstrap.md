---
title: Useful Sass (SCSS) media query mixins for Bootstrap
date: '2018-02-11T15:31:24+11:00'
featured: /img/uploads/featured-image-sass-media-query-mixins.jpg
categories:
  - development
featured_opacity: '.15'
dark_bg: true
toc: true
---
{{< lead >}}Today I'm going to share some Sass (SCSS) mixins which I've found helpful when developing Bootstrap websites.{{< /lead >}}

Whether you're using full-blown Bootstrap or just leveraging the familiar grid they will save you time when writing repetitive media queries. Due to the similarities in naming conventions between Bootstrap 3 and 4, these mixins can be easily adapted for both versions.

They're also versatile and work well even with your own custom naming conventions and breakpoints. If you want to see the full code snippet, [jump straight to it](#the-entire-code).

## What do the mixins do?

They provide a semantic media query mixin for the following:

* Respond above XX.
* Respond below XX.
* Respond between XX and XX.

Where XX is the two letter Bootstrap breakpoint (i.e. sm, md).

## What problems do the mixins solve?

While developing with Bootstrap there are a couple of things I find myself writing over and over again:

{{< highlight css >}}
@media (min-width: 768px) {
  /* Target devices wider than 768px. */
}

@media (max-width: 767px) {
  /* Target devices narrower than 768px. */
}
{{< /highlight >}}

<small>In Bootstrap terms, I refer to the breakpoint above (768px) as <code>sm</code>.</small>

I write my CSS mobile-first and try my best to limit <code>max-width</code> media queries but they often save time and space.

In additional to these two, I *occasionally* need to apply CSS between two specific breakpoints.

{{< highlight css >}}
@media (min-width: 768px) and (max-width: 991px) {
  /* Target devices between 768px and 992px. */
}
{{< /highlight >}}

## Breakpoint variables

It's best practice to use Bootstrap's breakpoints in your own code but it's painful to write them all the time. To get around that I use a Sass map of values:

{{< highlight scss >}}
// A map of breakpoints.
$breakpoints: (
  xs: 576px,
  sm: 768px,
  md: 992px,
  lg: 1200px
);
{{< /highlight >}}

This means the breakpoint values are only ever written once. Map values like these can be accessed using the Sass' <code>map-get</code> function:

{{< highlight scss >}}
// Get the small breakpoint.
$breakpoint: map-get($breakpoints, sm);
{{< /highlight >}}

## Media query mixins

### Respond above

Before going ahead and writing the media query it's a good idea to ensure the key exists in the <code>$breakpoints</code> map in case you make a typo (i.e. <code>@include respond-above(small)</code>).

To do this we use Sass' <code>map-has-key</code> function. Check it out below:

{{< highlight scss >}}
// Respond above.
@mixin respond-above($breakpoint) {

  // If the breakpoint exists in the map.
  @if map-has-key($breakpoints, $breakpoint) {

    // Get the breakpoint value.
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    // Write the media query.
    @media (min-width: $breakpoint-value) {
      @content;
    }

  // If the breakpoint doesn't exist in the map.
  } @else {

    // Log a warning.
    @warn 'Invalid breakpoint: #{$breakpoint}.';
  }
}
{{< /highlight >}}

So we can pass a value to the respond-above mixin in the form of a Bootstrap breakpoint. 

Note that we are also logging a <code>@warning</code> to the console if the breakpoint doesn't exist in the map. Without this the media query won't show up in your compiled CSS and you'll have no idea.

{{< highlight scss >}}
@include respond-above(sm) {
  .element {
    font-weight: bold;
  }
}
{{< /highlight >}}

Here's the CSS output:

{{< highlight css >}}
@media (min-width: 768px) {
  .element {
    font-weight: bold;
  }
}
{{< /highlight >}}

### Respond below

This mixin works in much the same way.

{{< highlight scss >}}
@mixin respond-below($breakpoint) {

  // If the breakpoint exists in the map.
  @if map-has-key($breakpoints, $breakpoint) {

    // Get the breakpoint value.
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    // Write the media query.
    @media (max-width: ($breakpoint-value - 1)) {
      @content;
    }

  // If the breakpoint doesn't exist in the map.
  } @else {

    // Log a warning.
    @warn 'Invalid breakpoint: #{$breakpoint}.';
  }
}
{{< /highlight >}}

Here's how to use it:

{{< highlight scss >}}
@include respond-below(sm) {
  .element {
    font-weight: bold;
  }
}
{{< /highlight >}}

And here's the CSS output:

{{< highlight css >}}
@media (max-width: 767px) {
  .element {
    font-weight: bold;
  }
}
{{< /highlight >}}

### Respond between

Here we want to check that *both* the <code>$lower</code> and <code>$upper</code> keys exist in the <code>$breakpoints</code> map before writing the media query.

{{< highlight scss >}}
@mixin respond-between($lower, $upper) {

  // If both the lower and upper breakpoints exist in the map.
  @if map-has-key($breakpoints, $lower) and map-has-key($breakpoints, $upper) {

    // Get the lower and upper breakpoints.
    $lower-breakpoint: map-get($breakpoints, $lower);
    $upper-breakpoint: map-get($breakpoints, $upper);

    // Write the media query.
    @media (min-width: $lower-breakpoint) and (max-width: ($upper-breakpoint - 1)) {
      @content;
    }
  
  // If one or both of the breakpoints don't exist.
  } @else {

    // If lower breakpoint is invalid.
    @if (map-has-key($breakpoints, $lower) == false) {

      // Log a warning.
      @warn 'Your lower breakpoint was invalid: #{$lower}.';
    }

    // If upper breakpoint is invalid.
    @if (map-has-key($breakpoints, $upper) == false) {

      // Log a warning.
      @warn 'Your upper breakpoint was invalid: #{$upper}.';
    }
  }
}
{{< /highlight >}}

Note that for this mixin the <code>@warning</code> will tell you specifically which breakpoint is causing issues (or if it's both).

I don't bother coding in smarts to ensure that the first parameter is lower than the second one. I've never had any troubles with it the way it is.

{{< highlight scss >}}
@include respond-between(sm, md) {
  .element {
    font-weight: bold;
  }
}
{{< /highlight >}}

Here's the CSS output:

{{< highlight css >}}
@media (min-width: 768px) and (max-width: 991px) {
  .element {
    font-weight: bold;
  }
}
{{< /highlight >}}

## The entire code

I find it handy to have an example usage directly above each mixin for ease of use in the future.

{{< highlight scss >}}
//
//  MEDIA QUERIES
//––––––––––––––––––––––––––––––––––––––––––––––––––

// A map of breakpoints.
$breakpoints: (
  xs: 576px,
  sm: 768px,
  md: 992px,
  lg: 1200px
);


//
//  RESPOND ABOVE
//––––––––––––––––––––––––––––––––––––––––––––––––––

// @include respond-above(sm) {}
@mixin respond-above($breakpoint) {

  // If the breakpoint exists in the map.
  @if map-has-key($breakpoints, $breakpoint) {

    // Get the breakpoint value.
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    // Write the media query.
    @media (min-width: $breakpoint-value) {
      @content;
    }
  
  // If the breakpoint doesn't exist in the map.
  } @else {

    // Log a warning.
    @warn 'Invalid breakpoint: #{$breakpoint}.';
  }
}


//
//  RESPOND BELOW
//––––––––––––––––––––––––––––––––––––––––––––––––––

// @include respond-below(sm) {}
@mixin respond-below($breakpoint) {

  // If the breakpoint exists in the map.
  @if map-has-key($breakpoints, $breakpoint) {

    // Get the breakpoint value.
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    // Write the media query.
    @media (max-width: ($breakpoint-value - 1)) {
      @content;
    }
  
  // If the breakpoint doesn't exist in the map.
  } @else {

    // Log a warning.
    @warn 'Invalid breakpoint: #{$breakpoint}.';
  }
}


//
//  RESPOND BETWEEN
//––––––––––––––––––––––––––––––––––––––––––––––––––

// @include respond-between(sm, md) {}
@mixin respond-between($lower, $upper) {

  // If both the lower and upper breakpoints exist in the map.
  @if map-has-key($breakpoints, $lower) and map-has-key($breakpoints, $upper) {

    // Get the lower and upper breakpoints.
    $lower-breakpoint: map-get($breakpoints, $lower);
    $upper-breakpoint: map-get($breakpoints, $upper);

    // Write the media query.
    @media (min-width: $lower-breakpoint) and (max-width: ($upper-breakpoint - 1)) {
      @content;
    }
  
  // If one or both of the breakpoints don't exist.
  } @else {

    // If lower breakpoint is invalid.
    @if (map-has-key($breakpoints, $lower) == false) {

      // Log a warning.
      @warn 'Your lower breakpoint was invalid: #{$lower}.';
    }

    // If upper breakpoint is invalid.
    @if (map-has-key($breakpoints, $upper) == false) {

      // Log a warning.
      @warn 'Your upper breakpoint was invalid: #{$upper}.';
    }
  }
}
{{< /highlight >}}

I recommend putting this in a <code>_media-queries.scss</code> partial (or similar) near the top of your SCSS index file.

## What next?

I found these mixins super handy in my day-to-day work but they were still somewhat laborious to write. So I recently wrote some custom Sublime Text snippets which autocomplete based on a keyword such as <code>rasm</code> for <code>@include respond-above(sm) {}</code> when you press tab.

### Sublime Text snippets

{{< figure src="/img/uploads/article-sass-media-query-mixins-sublime-snippets.gif" caption="Sublime Text snippets in action." >}}

Snippets are easy to add to Sublime Text, although [the syntax](http://sublimetext.info/docs/en/extensibility/snippets.html) can be a little tricky at first. They can be added via <code>Tools » Developer » New Snippet</code>. 

Here's how my <code>rasm</code> snippet looks:

{{< highlight xml >}}
<snippet>
  <content><![CDATA[
@include respond-above(sm) {
  $1
}
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>rasm</tabTrigger>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>source.scss</scope>
</snippet>
{{< /highlight >}}

The <code>$1</code> tells the snippet where the cursor / caret should appear.

All of [my snippets are on GitHub](https://github.com/lenymo/sublime-text-snippets) and you're welcome to use them.

I wrote individual snippets for each breakpoint:

Above: <code>raxs</code>, <code>rasm</code>, <code>ramd</code>, <code>ralg</code>

Below: <code>rbxs</code>, <code>rbsm</code>, <code>rbmd</code>, <code>rblg</code>

Between: <code>rbtw</code>

There's only one "respond between" snippet which takes in lower and upper parameters. Press tab to cycle between values and tab again to start writing SCSS declarations.

Here's how the respond between snippet looks: 

{{< highlight xml >}}
<snippet>
  <content><![CDATA[
@include respond-between($1, $2) {
  $3
}
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>rbtw</tabTrigger>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>source.scss</scope>
</snippet>
{{< /highlight >}}

Note that <code>$1</code>, <code>$2</code> and <code>$3</code> tell Sublime where the caret should appear with each successive tap of the tab key.

<a href="https://github.com/lenymo/sublime-text-snippets/tree/master/scss" class="btn">Get the snippets</a>

### Adding / removing snippets

On macOS you can find Sublime snippets here:

<code>/Users/username/Library/Application Support/Sublime Text 3/Packages</code>

I'm not sure where they live on a Windows machine but Google is your friend.

I recommend creating a <code>/snippets</code> sub-directory so you can easily find them in future.

Note that the Library directory is a hidden file so you'll need to show hidden files. If you're on macOS Sierra or newer you can show hidden files via <code>CMD + SHIFT + .</code> otherwise you'll need to load up terminal and type the following to add.

{{< highlight xml >}}
# Show hidden files
defaults write com.apple.finder AppleShowAllFiles YES

$ Hide hidden files
defaults write com.apple.finder AppleShowAllFiles NO
{{< /highlight >}}

You will need to re-launch Finder before these changes take effect. For more info on showing / hiding hidden files I recommend [Ian Lunn's article](https://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/).

## Wrapping up

In my own personal fork of Bootstrap 4's grid I've added an additional <code>xl</code> breakpoint which kicks in at 1500px but using these mixins it's *very* easy to add this functionality. I did need to add some additional CSS to my <code>_grid.scss</code> partial but that was relatively simple.

I hope these are useful. Let me know in the comments if you have any feedback or suggestions.
