---
title: Useful SCSS / Sass media queries mixins for Bootstrap
date: '2018-02-11T15:31:24+11:00'
categories:
  - development
---
{{< lead >}}Today I'm going to share some Sass (SCSS) mixins which I've found helpful when developing Bootstrap websites.{{< /lead >}}

Whether you're using full-blown bootstrap or just leveraging the familiar grid these will save you time with repetitive media queries. Due to the similarities in naming conventions these mixins will work in both Bootstrap v3 and the newly released v4. In these examples I'll be using v4 breakpoints.

## What do the mixins do?

* Respond above XX.
* Respond below XX.
* Respond between XX and XX.

## What problems do the mixins solve?

While developing bootstrap sites there are a couple of things I find myself writing over and over again:

{{< highlight css >}}
@media (min-width: 768px) {
  // Target devices wider than 768px.
}

@media (max-width: 767px) {
  // Target devices narrower than 768px.
}
{{< /highlight >}}

In Bootstrap terms, the breakpoint above 768 pixels is <code>md</code>.

In additional to these two, I occasionally need to apply CSS between two breakpoints.

{{< highlight css >}}
@media (min-width: 768px) and (max-width: 991px) {
  // Target devices between 768px and 992px.
}
{{< /highlight >}}

## Breakpoint variables

It's best practice to use Bootstrap's breakpoints but it's painful to write these out all the time. To get around that I create variables for each breakpoint:

{{< highlight scss >}}
// Breakpoint variables.
$breakpoint-xs: 576px;
$breakpoint-sm: 768px;
$breakpoint-md: 992px;
$breakpoint-lg: 1200px;
{{< /highlight >}}

In my own fork of the bootstrap v4 grid I've added an additional xl breakpoint at 1500px.

## Media query mixins

### Respond above

{{< highlight scss >}}
// Respond above.
@mixin respond-above($breakpoint) {
  @if $breakpoint == 'xs' {
    @media (min-width: $breakpoint-xs) {
      @content;
    }
  } @else if $breakpoint == 'sm' {
    @media (min-width: $breakpoint-sm) {
      @content;
    }
  } @else if $breakpoint == 'md' {
    @media (min-width: $breakpoint-md) {
      @content;
    }
  } @else if $breakpoint == 'lg' {
    @media (min-width: $breakpoint-lg) {
      @content;
    }
  }
}
{{< /highlight >}}

### Respond below

{{< highlight scss >}}
@mixin respond-below($breakpoint) {
  @if $breakpoint == 'xs' {
    @media (max-width: ($breakpoint-xs - 1)) {
      @content;
    }
  } @else if $breakpoint == 'sm' {
    @media (max-width: ($breakpoint-sm - 1)) {
      @content;
    }
  } @else if $breakpoint == 'md' {
    @media (max-width: ($breakpoint-md - 1)) {
      @content;
    }
  } @else if $breakpoint == 'lg' {
    @media (max-width: ($breakpoint-lg - 1)) {
      @content;
    }
  }
}
{{< /highlight >}}

### Respond between

{{< highlight scss >}}
@mixin respond-between($lower, $upper) {

  // Lower.
  $lower-breakpoint: 0;

  @if $lower == 'xs' {
    $lower-breakpoint: $breakpoint-xs;

  } @else if $lower == 'sm' {
    $lower-breakpoint: $breakpoint-sm;

  } @else if $lower == 'md' {
    $lower-breakpoint: $breakpoint-md;

  } @else if $lower == 'lg' {
    $lower-breakpoint: $breakpoint-lg;
  }

  // Upper.
  $upper-breakpoint: 0;

  @if $upper == 'sm' {
    $upper-breakpoint: $breakpoint-sm - 1;

  } @else if $upper == 'md' {
    $upper-breakpoint: $breakpoint-md - 1;

  } @else if $upper == 'lg' {
    $upper-breakpoint: $breakpoint-lg - 1;

  } @else if $upper == 'xl' {
    $upper-breakpoint: $breakpoint-xl - 1;
  }

  @media (min-width: $lower-breakpoint) and (max-width: $upper-breakpoint) {
    @content;
  }
}
{{< /highlight >}}

There are programatically smarter and more concise ways of writing these but they are easy to understand and don't add any weight to your output code.

