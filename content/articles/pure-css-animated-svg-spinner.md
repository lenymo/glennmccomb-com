---
title: Pure CSS animated SVG spinner
date: 2018-09-26T09:57:11.000Z
categories:
  - Development
custom_class: animated-svg-spinner
custom_stylesheet: animated-svg-spinner
---
We will start off with an SVG circle.

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50"/>
</svg>
{{< /highlight >}}

Which renders in the page like so:

<svg class="circle-svg circle-svg--basic" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--basic" cx="50" cy="50" r="50"/>
</svg>

This is how it looks unstyled. 

Next, we'll write some CSS to add a stroke and remove the fill.

{{< highlight scss >}}
circle {
  fill: transparent;
  stroke: #2f3d4c;
  stroke-width: 5px;
}
{{< /highlight >}}

Here's how it looks:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked" cx="50" cy="50" r="50"/>
</svg>

This doesn't look quite right. The stroke is rendering outside the SVG's viewbox (hover to see the viewbox).

You might think there would be a `stroke-position` CSS rule which we could set to `inside` and have the stroke appear inside an SVG shape but unfortunately no such rule exists. Instead we have to modify the `r="50"` attribute of the SVG.

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="47"/>
</svg>
{{< /highlight >}}

It's looking much better.

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-circle circle-circle--stroked" cx="50" cy="50" r="47"/>
</svg>

So what does the `r` attribute do, and why does this work?