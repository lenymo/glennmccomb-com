---
title: How to create sequential animations with Sass
date: '2018-04-16T17:20:46+10:00'
featured: /img/uploads/featured-image-article-sass-animations.jpg
categories:
  - development
toc: true
dark_bg: true
---

{{< lead >}}In this article I'm going to demonstrate a technique for creating CSS animations using the power of Sass' for loop. Whether you're using React, Vue or Angular, these animations can be implemented in your app.{{< /lead >}}

## Why even animate things?

Animations are a crucial ingredient in adding life and character to a website or application. They can make things feel faster even if they take the same or less time without animations. They are particular useful when pulling in dynamic data from APIs and that’s what I’m going to be focusing on here.

Here’s an example of the types of animation I’m going to be writing about:

{{< figure src="/img/uploads/article-sass-animations-espn-chrome-extension.gif" >}} 

<iframe height='350' scrolling='no' title='Basic preloader animation' src='//codepen.io/lenymo/embed/qozOWa/?height=350&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

Note that there are two separate animations here:

1. The pre-loading state; when content has been requested but hasn’t yet arrived.
2. The loaded state; content has arrived and is sequentially animated in to place.

## CSS animations

In my dev experience to date I’ve primarily used the CSS <code>transition</code> property. Transitions are very straightforward and you should probably be using them, but they’re also limited. The CSS <code>animation</code> property on the other hand, is much more powerful but also considerably more complicated.

There are two essential parts to a CSS animation:

1. The animation CSS property.
2. The @keyframes CSS rule.

### Animation

The animation CSS property is shorthand for a number of animation properties (such as animation-name, animation-duration, etc).

A typical animation rule might look like this:

{{< highlight css >}}
.tile {
  animation: 1s ease 0 infinite fade-in;
  /* duration | timing-function | delay | iteration-count | name */
}
{{< /highlight >}}

The above animation property applies the fade-in animation to the .tile element over a duration of 1s, with no delay, infinitely repeating and with an ease timing-function. It’s a lot to take in but it’s makes more sense when you see it in practice (more on that below).

### Keyframes

The @keyframes rule works in a similar way to the more familiar @media rule, in that additional CSS is nested within it. The @keyframes rule contains style rules which will be applied to an element as the animation progresses from start (0%) to finish (100%).

Let’s extend the animation example about and write the @keyframe rule.

{{< highlight css >}}
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
{{< /highlight >}}

In our example, .tile will animate from a starting point of opacity: 0 to a final state of opacity: 1 over a period of 1s (which is defined in the animation property). Any number of percentages can be added between 0% and 100% and the usual array of CSS properties can be applied (including transform).

For our purposes, our initial animation is going to look like so:

{{< highlight css >}}
@keyframes fade-in {
  0% {
    background: $tile-bg;
    transform: scale(1);
  }
  
  25% {
    background: darken($tile-bg, 10%);
    transform: scale(1.015);
  }
  
  50% {
    background: $tile-bg;
    transform: scale(1);
  }
}
{{< /highlight >}}

In production it’s still necessary to include moz and webkit vendor prefixes in the following manner:

{{< highlight css >}}
@-webkit-keyframes {
  /* Animations. */
}

@-moz-keyframes{
  /* Animations. */
}
{{< /highlight >}}

This becomes very tedious to manage but hopefully you’re using something like autoprefixer so you can focus purely on writing CSS.

### Animation delay and nth-child

I’m going to be making heavy use of the animation-delay property in combination with the nth-child selector to animate a group of elements in a timed sequence. Delaying animations allows the same animation to be applied to different elements at different starting points. In this way the animation will appear to flow through the elements like a ripple in water.

Ideally the output code will look something like this:

{{< highlight css >}}
.tile:nth-child(1) {
  animation-delay: .1111s;
}

.tile:nth-child(2) {
  animation-delay: .2222s;
}

.tile:nth-child(3) {
  animation-delay: .3333s;
}
{{< /highlight >}}

... and so on.

## Using Sass

This will produce the desired effect but it is very tedious to hand-code and any changes to the timing will be difficult to implement. Thankfully we can use Sass [@for](http://thesassway.com/intermediate/if-for-each-while#for) loops to make this much more manageable.

### Sass for loops

Sass for loops work like so:

{{< highlight scss >}}
@for $i from 1 through 10 {
  .tile-#{$i} {
    margin-left: 100px * #{$i}
  }
}

{{< /highlight >}}

Which will compile out to:

{{< highlight css >}}
.tile-1 {
  margin-left: 100px;
}

.tile-2 {
  margin-left: 200px;
}

.tile-3 {
  margin-left: 300px;
}
{{< /highlight >}}

... and so on.

### Putting it all together

Now that we’ve got the hang of CSS animations and Sass for loops, it’s time to combine them to create sequenced animations.
