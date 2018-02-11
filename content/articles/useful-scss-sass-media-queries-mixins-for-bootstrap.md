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

## What problem do the mixins solve?

While developing bootstrap sites there are a couple of things I find myself writing over and over again:

{{< highlight css >}}
@media (min-width: 768px) {
  // Do something when devices are wider than 768px.
}

@media (max-width: 767px) {
  // Do something when devices are narrower than 768px.
}
{{< /highlight >}}

In Bootstrap terms, the breakpoint above 768 pixels is <code>md</code>.

In additional to these two, I occasionally need to apply CSS between two breakpoints.

It's best practice to use Bootstrap's breakpoints throughout your code since it makes things much easier to manage.

{{< highlight css >}}
@media (min-width: 768px) and (max-width: 991px) {
  // Do something when devices are narrower than 768px.
}
{{< /highlight >}}
