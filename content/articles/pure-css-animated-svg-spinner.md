---
title: Pure CSS animated SVG spinner
date: 2019-04-21T03:00:11.000Z
toc: true
categories:
  - Development
custom_class: animated-svg-spinner
custom_stylesheet: animated-svg-spinner
---
{{< lead >}}In this article I'll show you how to level up your loading indicators with a pure CSS SVG spinner inspired by Google's Chrome and YouTube spinner.{{< /lead >}}

## What are we making?

A good loading indicator helps users feel a sense of progress, and the spinner which Google uses for Chrome and YouTube is one of my favourites. If you haven't seen it, here's what I'll be showing you how to make:

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>


## Creating an svg circle

We will start off with an [SVG circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle).

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50"/>
</svg>
{{< /highlight >}}

<svg class="circle-svg circle-svg--basic" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--basic" cx="50" cy="50" r="50"/>
</svg>

The above circle has `max-width: 100px` on the `<svg>` element and `fill: #2f3d4c` on the `<circle>` element. If you haven't styled SVGs before, the `fill` property works much like `background-color`.

## Adding stroke

Next, we'll write some CSS to add a stroke and remove the fill.

{{< highlight scss >}}
circle {
  fill: transparent;
  stroke: #2f3d4c;
  stroke-width: 10px;
}
{{< /highlight >}}

Here's how it looks:

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="50"/>
</svg>

Not ideal. The `<circle>`'s stroke is rendering outside the bounds of the parent `<svg>` element. By default, most browsers set the `overflow` property of SVGs to `hidden` and while we could override this on our `<svg>` using `overflow: visible` we're better off working within the dimensions of the parent SVG.

You might think there would be a CSS property such as `stroke-position` which we could set to `inside` and have the stroke appear inside our `<circle>`. Unfortunately, no such property exists and the stroke renders `5px` either side of the circle's outline.

Instead we have to reduce the `<circle>`'s radius by reducing the `r` attribute from `50` to `46`.

{{< highlight html >}}
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45"/>
</svg>
{{< /highlight >}}

This looks much better.

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="45"/>
</svg>

The `r` attribute defines the radius of the circle, relative to its overall size. It's not ideal to hard-code the radius in this way, but it *does* scale proportionately when we change the size of the `<svg>` element.

Half size:

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="45"/>
</svg>

Double size:

<svg class="circle-svg circle-svg--stroked circle-svg--2x" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked" cx="50" cy="50" r="45"/>
</svg>

In both examples, despite a `stroke-width` of `10px`, the stroke scales when the `<svg>` changes size.

As the spinner gets smaller we may want to increase the `<circle>`'s stroke width so it's a little chunkier. However, when we increase the stroke width, the circle once again grows larger than the parent SVG so we have to decrease the circle's `r` attribute some more. 

Below is the half-size circle with `stroke-width: 14px` and `r="42"`.

<svg class="circle-svg circle-svg--stroked circle-svg--sm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--fat" cx="50" cy="50" r="42"/>
</svg>

## Changing the stroke's length

We have our circle with stroke working nicely. It's now time to change the length of the stroke. To do this we will use the [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) and [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset) SVG attributes. Both of these are presentation attributes and can thus be styled via CSS. This allows us to utilise the power of CSS animations.

### Stroke dashes

The `stroke-dasharray` property is used to add dashes of varying lengths to a stroke. It is similar to `border-style: dashed` but *much* more powerful. The `stroke-dasharray` property accepts comma or space separated values which determine the length of a stroke's dashes and the gaps between them. In this example we'll use a single value so dash and gap are of equal length. 

`stroke-dasharray: 5`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--stroke-dash-array-short" cx="50" cy="50" r="45"/>
</svg>

`stroke-dasharray: 24`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--stroke-dash-array-medium" cx="50" cy="50" r="45"/>
</svg>

We'll leverage this attribute to create a stroke dash which is the full circumference of our circle.

`stroke-dasharray: 285`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--stroke-length" cx="50" cy="50" r="45"/>
</svg>

This looks much the same as the circles from our previous examples but we can do *much* more with it.

But first, some additional `<circle>` CSS. To make the stroke appear more "snake-like" we set `stroke-linecap` to `round`, and so as the `<circle>` rotates from the middle, we set `transform-origin` to `50% 50%`.

{{< highlight scss >}}
circle {
  stroke-linecap: round;
  transform-origin: 50% 50%;
}
{{< /highlight >}}

### Stroke dash offset

Next we'll use `stroke-dashoffset` to shift the starting point of the dash.

`stroke-dashoffset: 20`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--stroke-length-long" cx="50" cy="50" r="45"/>
</svg>

`stroke-dashoffset: 280`

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--stroke-length-short" cx="50" cy="50" r="45"/>
</svg>

The initial state of `stroke-dashoffset: 0` doesn't change anything, but it does provide the starting point for our CSS animation which will move between the two.

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated-example" cx="50" cy="50" r="45"/>
</svg>

Here we add a keyframe animation to `<circle>` which alternates between the two `stroke-dashoffset` values described above. We won't use this exact animation for our final spinner but it does help illustrate how it will work.

{{< highlight scss >}}
// Keyframe animation which transitions between
// stroke-dashoffset states.
@keyframes circle--animation {
  0% {
    stroke-dashoffset: 20;
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

// More succinct using animation shorthand.
circle {
  animation: 1.4s ease-in-out infinite both circle--animation;
}
{{< /highlight >}}

<small>NOTE: the animation shorthand is shown as an alternative. Don't use them both at the same time.</small>


## Combining animations

Next we'll combine two different animations at the same time. We rotate use a `linear` rotation animation on the outer `<svg>` element while at that same time running our `<circle>` animation from above. The `<svg>` animation will be 2 seconds long while the `<circle>` animation will have a duration of 1.4 seconds. This will help stagger the two animations.

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated-example" cx="50" cy="50" r="45"/>
</svg>

The `<svg>` animation is very simple - it smoothly rotates a full 360 degrees every 2 seconds.

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

### Adding pauses and rotations

We're getting close to what we want but it's not quite there. The stroke should appear to be continuously chasing itself while never quite catching up. 

Our `<svg>` animation is fine but we need to improve the `<circle>` animation by adding some pauses and rotation.

{{< highlight scss >}}
@keyframes circle--animation {
  // Start with short dash for 25% of animation.
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  // Very long dash, slightly rotated for 25% of animation.
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  // Back to short dash, rotated back to starting position.
  // This is the "chasing" part of the animation.
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}

circle {
  animation: 1.4s ease-in-out infinite both circle--animation;
}
{{< /highlight >}}

Here is the above `<circle>` animation on its own.

<svg class="circle-svg circle-svg--stroked" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>

And here it is in combination with the `<circle>` animation.

<svg class="circle-svg circle-svg--stroked circle-svg--full-rotation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle-svg__circle circle-svg__circle--stroked circle-svg__circle--production circle-svg__circle--stroke-length circle-svg__circle--dash-offset-animated" cx="50" cy="50" r="45"/>
</svg>

To get a better sense of how the two animations work together, hover over the circle to see the bounding square of the `<svg>` element as it rotates. 

Regrettably, there is no magic formula here and I arrived at the above values after considerable experimentation.

## The entire code

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

### Notes

For the sake of simplicity I've used element selectors in this article but if you use this code yourself I recommend class name selectors instead. Also, I've omitted browser prefixes, but if you're hand-coding this - as against using [autoprefixer](https://github.com/postcss/autoprefixer) - you should include vendor prefixes.

### Browser support

According to CSS-Tricks, browser support for [stroke-dasharray](https://css-tricks.com/almanac/properties/s/stroke-dasharray/) and [stroke-dashoffset](https://css-tricks.com/almanac/properties/s/stroke-dashoffset/) goes back to IE 9 and Android 4.4, with full support in all other major browsers. If you're concerned about browser support, make sure you test it it out yourself or alternatively... use an animated GIF.