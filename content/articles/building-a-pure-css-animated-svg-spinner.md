---
title: Building a pure CSS animated SVG spinner
date: 2019-04-23T09:00:11.000Z
featured: /img/uploads/featured-image-article-svg-spinner.jpg
categories:
  - Development
toc: true
featured_opacity: '.15'
dark_bg: true
custom_class: animated-svg-spinner
custom_stylesheet: animated-svg-spinner
---
{{< lead >}}In this article I'll show you how to level up your loading indicators with a pure-CSS animated SVG loader inspired by Google's Chrome and YouTube spinner.{{< /lead >}}

## What are we making?

A good loading indicator helps users feel a sense of progress, and the spinner which Google uses for Chrome and YouTube is one of my favourites. If you haven't seen it, here's what I'll be showing you how to make:

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>

We'll be making use of a couple of very handy SVG-specific CSS properties called `stroke-dasharray` and `stroke-dashoffset`. Feel free to to skip to [the final code](#the-final-code) or check it out [on Codepen](https://codepen.io/lenymo/pen/qwKPov) to see how it works.

<small>NOTE: This spinner will not work in IE 11 and below.</small>


## Creating an SVG circle

We'll start off with an [SVG circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle).

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50"/>
</svg>
{{< /highlight >}}

<svg class="circle-svg circle-svg--basic" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--basic" cx="50" cy="50" r="50"/>
</svg>

In relatively units, the `<svg>`s `viewBox` is 100 x 100. The `<circle>`'s radius is exactly half that as defined by `r="50"` and it is positioned at `50` on both the `x` and `y` axis. 

We have styled the `<circle>` as follows:

{{< highlight scss >}}
circle {
  max-width: 100px;
  fill: #2f3d4c;
}
{{< /highlight >}}

If you haven't styled SVGs before, the `fill` property works much like `background-color`.

## Adding stroke

Next, we'll add a [stroke-width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) of `10` and remove the fill:

{{< highlight scss >}}
circle {
  fill: transparent;
  stroke: #2f3d4c;
  stroke-width: 10;
}
{{< /highlight >}}

The stroke value of `10` is relative to the overall size of the `<svg>` element, as defined in its `viewBox` attribute. 

Here's how it looks:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="50"/>
</svg>

Not ideal. The `<circle>`'s stroke is rendering outside the bounds of the parent `<svg>` element and by default, most browsers set the `overflow` property of SVGs to `hidden`. 

We could override this on our `<svg>` using `overflow: visible` but we're better off keeping the circle within the bounds of the parent SVG.

To fix this issue, it would make sense for there to be a CSS property such as `stroke-position` which we could set to `inside` so as the stroke would render inside the path of our `<circle>`. Unfortunately, no such property exists and the stroke renders `5` relative units either side of the circle's path.

Instead we have to reduce the `<circle>`'s radius by updating the `r` attribute from `50` to `45`.

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45"/>
</svg>
{{< /highlight >}}

This looks much better:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="45"/>
</svg>

It's not ideal to hard-code the radius in this way but it's not possible to set it via CSS. It *does* at least scale proportionately when we change the size of the parent `<svg>` element as demonstrated below.

Half size:

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="45"/>
</svg>

Double size:

<svg class="circle-svg circle-svg--stroked circle-svg--2x" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="45"/>
</svg>

Note that in both examples, despite a `stroke-width` of `10`, the stroke scales when the `<svg>` changes size.

### Thicker stroke

As the spinner gets smaller we may want to increase the `<circle>`'s stroke width so it's a little chunkier. However, when we increase the stroke width, the circle once again grows larger than the parent SVG, so we have to further decrease the circle's `r` attribute.

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--fat" cx="50" cy="50" r="45"/>
</svg>

Below is the half-size circle with `stroke-width: 14` and `r="42"`.

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--fat" cx="50" cy="50" r="42"/>
</svg>

## Changing the stroke's length

Next up we'll change the length of the stroke using the [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) and [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset) SVG attributes. They are both presentation attributes and can be styled via CSS, allowing us to utilise the power of CSS animations.

### Stroke dashes

The `stroke-dasharray` property is used to add dashes of varying lengths to a stroke. It's like `border-style: dashed` but *much* more powerful. It accepts comma or space separated values which determine the length of a stroke's dashes and the gaps between them.  We'll be using a single value which means dashes and gaps are of equal length. 

Here are some examples to demonstrate how it works:

`stroke-dasharray: 5`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--stroke-dash-array-short" cx="50" cy="50" r="45"/>
</svg>

`stroke-dasharray: 24`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--stroke-dash-array-medium" cx="50" cy="50" r="45"/>
</svg>

We'll leverage this attribute to create a stroke dash which is the full circumference of our circle.

`stroke-dasharray: 283`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--stroke-length" cx="50" cy="50" r="45"/>
</svg>

This looks much like our previous stroked circle but we can do a *lot* more with it now.

But first, we'll write some additional `<circle>` CSS. 

We can add rounded caps to the ends of the stroke by setting [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap) to `round`. To ensure our `<circle>` rotates from the middle when we apply transforms, we'll set `transform-origin` to `50% 50%`.

{{< highlight scss >}}
circle {
  stroke-linecap: round;
  transform-origin: 50% 50%;
}
{{< /highlight >}}

### Stroke dash offset

Next we'll use `stroke-dashoffset` to shift the starting point of the dash.

`stroke-dashoffset: 75`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--stroke-length-long" cx="50" cy="50" r="45"/>
</svg>

`stroke-dashoffset: 280`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--stroke-length-short" cx="50" cy="50" r="45"/>
</svg>

The values `75` and `280` will provide the start and end points for our CSS animation.

## Calculating dash array and offset values

You may be wondering how we arrived at the `stroke-dasharray` value of `283` which covers the full circumference of the circle. No, it was not plucked from thin air.

When applied to an SVG circle, `stroke-dasharray` and `stroke-dashoffset` values cover a different portion of a circle's circumference depending on the circle's radius. Changes to the circle's radius also change its circumference which, consequently, changes the length of the dashes - even if `stroke-dasharray` values aren't changed.

Our original `<circle>` had a radius of `50`, and thus its circumference was `314.16`. We calculate this using the formula `C = 2πR` which in our case is `2 x 3.1416 x 50 = 314.16`. By extension the circumference of our `<circle>` with radius of `45` is `282.74`, which we round up to `283`.

Here is the same `stroke-dasharray` of `157` applied to `<circle>`'s with different radii.

{{< row >}}
{{< col >}}
Radius 50:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-dash-array-radius-example" cx="50" cy="50" r="50"/>
</svg>
{{< /col >}}
{{< col >}}
Radius 45:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-dash-array-radius-example" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< /row >}}

A `stroke-dasharray` of `157` will be `50%` of a circle with `r="50"` but `55.4%` of a circle with `r="45"`. We have to keep this in mind when adjusting the radius of a `<circle>` because it can throw *everything* out. It's worth noting that these issues are avoided entirely if we simply set `overflow: visible` on the parent `<svg>`.

It's also worth mentioning that although both `stroke-dasharray` and `stroke-dashoffset` accept percentage values, these are relative to the parent `<svg>`'s `viewBox`, so in our case a stroke dash array of `100%` is equivalent to `100` relative units.

It would be great if `stroke-dasharray: 100%` covered the entire circumference of our circle, but alas, that's not how it works.

### A handy Sass function

If you're into Sass I wrote a function which takes the legwork out of these calculations.

{{< highlight scss >}}
@function get-dash-value($radius, $percentage) {
  // Using $radius, calculate circumference.
  $circumference: 2 * 3.1415927 * $radius;
  
  // Convert percentage to decimal.
  // i.e. 50% = 0.5.
  $percentage-as-decimal: $percentage / 100%;
  
  // Return unit value.
  @return $circumference * $percentage-as-decimal;
}
{{< /highlight >}}

It takes the radius of the circle and the percentage of the circle that you want the dash value to cover, and returns the correct value in relative units. It works for both array and offset values.

Unfortunately you do still have to pass the radius, but if you set it up as a Sass variable you'll only need to declare it once. Check out the function in action [in this codepen](https://codepen.io/lenymo/pen/EJeVgG).

## Adding animation

With that out of the way, it's time to work on some animations. 

We'll add a keyframe animation to the `<circle>` which alternates between the `75` and `280` `stroke-dashoffset` values. We won't use this exact animation in our final spinner but it helps illustrate how it will work.

{{< highlight scss >}}
// Keyframe animation which transitions between
// stroke-dashoffset values.
@keyframes circle--animation {
  0% {
    stroke-dashoffset: 75;
  }
  
  50% {
    stroke-dashoffset: 280;
  }
}

// Long form animation rules applied to circle element.
circle {
  animation-duration: 1.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-name: circle--animation;

}

// More succinct animation shorthand.
circle {
  animation: 1.4s ease-in-out infinite both circle--animation;
}
{{< /highlight >}}

<small>NOTE: The animation shorthand is shown as an alternative. Don't use them both at the same time.</small>

And here's the animation:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated-basic" cx="50" cy="50" r="45"/>
</svg>


### Combining multiple animations

Next we'll rotate the parent `<svg>` element while the `<circle>` animation shown above continues to run.

{{< highlight scss >}}
@keyframes svg--animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
}

svg {
  svg {
    animation: 2s linear infinite svg--animation;
  }
}
{{< /highlight >}}

The `<svg>` animation is simple - it loops infinitely and smoothly rotates 360 degrees every 2 seconds.

Check it out:

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated-basic" cx="50" cy="50" r="45"/>
</svg>

Both animations loop infinitely and the 0.6 second difference in duration means they're staggered and only meet exactly every 14 seconds.

### Adding pauses and rotations

Our spinner is getting close, but it's not quite there yet.

The stroke should appear to continuously chase itself without ever catching up. Currently the "head" of the stroke appears to move backwards. We don't want that. Our `<svg>` animation is fine but we need to improve the `<circle>` keyframes with some pauses and rotation transforms.

{{< highlight scss >}}
@keyframes circle--animation {
  // Start with short dash for 25% of animation.
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  // Very long dash, slightly rotated for 25% of animation.
  // This is the "head" of the stroke getting away from the tail.
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  // Back to short dash, rotated back to starting position.
  // This is the "tail" of the stroke catching up to the head.
  // The stroke moves backwards while at the same time the 
  // entire circle is rotated forward to return to its 
  // starting position.
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}

circle {
  animation: 1.4s ease-in-out infinite both circle--animation;
}
{{< /highlight >}}

Here is the  `<circle>` animation on its own.

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>

And here it is in combination with the `<svg>`'s rotation animation.

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>

And there we go!

To get a better sense of how the two animations work together, hover over the circle to see the bounding square of the `<svg>` as it rotates. 

The circle's stroke is still swinging back and forth just like before (as defined by the changing `stroke-dashoffset` keyframe values) but the rotation we added compensates for the backward swing. In other words, at the same time that the stroke swings backwards, the rotation spins the circle forwards fast enough that it never appears to go backwards.

It's helpful to break the animation up into its constituent parts.

{{< row >}}
{{< col >}}
Just dashoffsets:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-only" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< col >}}
With circle rotations:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< col >}}
With everything:

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< /row >}}

There's no magic formula to the timing of these animations and I only discovered them after lengthy experiment.

### Different sizes

Because the spinner is an SVG we can change the size by adjusting the width of the `<svg>` element.

{{< row >}}
{{< col >}}
Quarter size:

<svg class="circle-svg circle-svg--xs circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< col >}}
Half size:

<svg class="circle-svg circle-svg--sm circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< col >}}
Double size:

<svg class="circle-svg circle-svg--2x circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>
{{< /col >}}
{{< /row >}}

## The final code

Our `HTML` looks much the same as when we started:

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45"/>
</svg>
{{< /highlight >}}

Here is the complete CSS:

{{< highlight scss >}}
// SVG styles.
svg {
  animation: 2s linear infinite svg-animation;
  max-width: 100px;
}

// SVG animation.
@keyframes svg-animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
}

// Circle styles.
circle {
  animation: 1.4s ease-in-out infinite both circle-animation;
  display: block;
  fill: transparent;
  stroke: #2f3d4c;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 280;
  stroke-width: 10px;
  transform-origin: 50% 50%;
}

// Circle animation.
@keyframes circle-animation {
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}
{{< /highlight >}}

## Notes

For the sake of simplicity I've used element selectors in this article but if you use this code yourself I recommend class name selectors instead. Also, I've omitted browser prefixes, but if you're hand-coding this - as against using [autoprefixer](https://github.com/postcss/autoprefixer)   - you should include vendor prefixes. Use autoprefixer [online version](https://goonlinetools.com/autoprefixer/) that allows you to enter your non-prefixed CSS and gives you a autoprefixed CSS. 

### Browser support

Crucially, IE 11 and below do not support animation of the `stroke-dasharray` and `stroke-dashoffset` properties. This will be a *big* gotcha for a lot of people. Browser support for [stroke-dasharray](https://css-tricks.com/almanac/properties/s/stroke-dasharray/) and [stroke-dashoffset](https://css-tricks.com/almanac/properties/s/stroke-dashoffset/) does go back to IE 9 but this animation does not work in IE11.

If you want to use this and you're concerned about browser support, make sure you test it yourself. Or alternatively, use an animated GIF.
