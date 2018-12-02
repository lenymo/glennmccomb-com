---
title: Pure CSS animated SVG spinner
date: 2018-09-26T09:57:11.000Z
categories:
  - Development
custom_class: animated-svg-spinner
custom_stylesheet: animated-svg-spinner
---
{{< lead >}}Today I'm going to share some Sass (SCSS) mixins which I've found helpful when developing Bootstrap websites.{{< /lead >}}

## Creating our svg circle

We will start off with an [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle) circle.

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50%" cy="50%" r="50%"/>
</svg>
{{< /highlight >}}

Here it is with `max-width: 100px` on the `<svg>` element and a CSS `fill: #2f3d4c` on the `<circle>` element:

<svg class="circle-svg circle-svg--basic" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--basic" cx="50%" cy="50%" r="50%"/>
</svg>

The `fill` property works similarly to the more familiar `background-color` property.

## Adding a stroke

Next, we'll write some CSS to add a stroke and remove the fill.

{{< highlight scss >}}
circle {
  fill: transparent;
  stroke: #2f3d4c;
  stroke-width: 6px;
}
{{< /highlight >}}

Here's how it looks:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked" cx="50%" cy="50%" r="50%"/>
</svg>

This is not ideal. The stroke is rendering outside the SVG's viewbox **(?)** (hover to see the viewbox).

You might think there would be a `stroke-position` CSS property which we could set to `inside` and have the stroke appear inside an SVG shape, but unfortunately no such property exists and the stroke renders 3px either side of the shape.

Instead we have to reduce the circle's radius using the `r` attribute of the `<circle>`.

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50%" cy="50%" r="47%"/>
</svg>
{{< /highlight >}}

This looks much better.

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked" cx="50%" cy="50%" r="47%"/>
</svg>

The `r` attribute defines the radius of the circle, relative to its overall size. In this case our circle is 50, and we've set our `r` to 47%. This is more like a magic number than we would like, but in our case it works fine even when we change the size of the `svg`.

Half size:

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked" cx="50%" cy="50%" r="47%"/>
</svg>

Double size:

<svg class="circle-svg circle-svg--stroked circle-svg--2x" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked" cx="50%" cy="50%" r="47%"/>
</svg>

Notice that although the `stroke` CSS property is set to 6px, it scales as the SVG shape changes. 

As the spinner gets smaller we may want to increase circle's stroke width so it's a little fatter. At that point we'll need to decrease the `circle`'s `r` attribute. Below is the half-size circle with `stroke-width: 10px` and `r="45%"`.

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked circle-circle--fat" cx="50%" cy="50%" r="45%"/>
</svg>

## Changing the stroke's length

In order to change the length of the stroke, we will use the [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) and [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset) CSS properties. 

