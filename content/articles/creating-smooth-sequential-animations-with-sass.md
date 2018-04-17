---
title: Creating smooth sequential animations with Sass
date: '2018-04-16T17:20:46+10:00'
featured: /img/uploads/featured-image-article-sass-animations.jpg
categories:
  - development
toc: true
dark_bg: true
---

{{< lead >}}In this article I'm going to demonstrate a technique for creating CSS animations using the power of Sass' for loop. Whether you're using React, Vue or Angular, these animations can be used in your app.{{< /lead >}}

## Why even animate things?

Animations are a crucial ingredient in adding life and character to a website or application. They can make transitions feel faster even if they take more time than when they're not animated. Animation is particularly useful when requesting dynamic data from APIs and that’s what I'm focusing on today.

Here’s an example of the types of animation I’ll be writing about:

{{< figure src="/img/uploads/article-sass-animations-espn-chrome-extension.gif" >}}

Note that there are two separate animations here:

1. Preloading; when content has been requested but has yet to arrive.
2. Loaded; content has arrived and appears in sequence.

## CSS animations

In my development experience to date I’ve primarily used the CSS <code>transition</code> property to handle animation. Transitions are nice and simple, but they’re also limited. The CSS <code>animation</code> property on the other hand is much more powerful, but is also considerably more complicated.

There are two essential parts to a CSS animation:

1. The [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) CSS property.
2. The [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/%40keyframes) CSS rule.

### The animation property

The animation CSS property is shorthand for a number of animation properties (such as animation-name, animation-duration, etc).

A typical animation rule might look like this:

{{< highlight scss >}}
.tile {
  // duration | timing-function | iteration-count | name
  animation: 1s ease infinite pulse;
}
{{< /highlight >}}

The above <code>animation</code> property applies the <code>pulse</code> animation to the <code>.tile</code> element over a duration of 1s, infinitely repeating and with an <code>ease</code> timing-function. There's a fair bit going on here but it makes more sense when you see it in practice (more on that below).

### The @keyframes rule

The <code>@keyframes</code> rule works in a similar way to the more familiar <code>@media</code> rule, in that additional CSS is nested within it. The keyframes rule contains style rules which are applied to an element as the animation progresses from start (0%) to finish (100%).

Let’s build on our animation example with a <code>@keyframes</code> rule:

{{< highlight scss >}}
@keyframes pulse {
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

In our example <code>.tile</code> will darken and very slightly scale up across the first half of the animation, then return to its original state. The animation will take place over a period of 1s, as defined in the animation property on <code>.tile</code>. Notice that any number of percentages can be added between 0% and 100%.

### Browser prefixes

Unfortunately in production it’s still necessary to include <code>-moz</code> and <code>-webkit</code> vendor prefixes in the following manner:

{{< highlight scss >}}
@-webkit-keyframes pulse {
  // Animations.
}

@-moz-keyframes pulse {
  // Animations.
}
{{< /highlight >}}

This becomes tedious to manage *very* quickly. However thankfully [autoprefixer](https://github.com/postcss/autoprefixer) automatically adds vendor prefixes in so you can focus on writing CSS. It's a life changer and is well worth integrating into your workflow.

### Animation delay and nth-child

I’m going make heavy use of the <code>[animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)</code> property in combination with the <code>nth-child</code> selector to animate a group of elements in a timed sequence. Delaying animations allows the same animation to be applied to different elements at different starting points. In this way the animation will appear to flow through the group of elements like a ripple in water.

Our final output CSS will look vaguely like this:

{{< highlight css >}}
.tile:nth-child(1) {
  animation-delay: .1s;
}

.tile:nth-child(2) {
  animation-delay: .2s;
}

.tile:nth-child(3) {
  animation-delay: .3s;
}
{{< /highlight >}}

And so on...

## Using Sass loops to create a preloader animation

The above code will produce the desired effect but it's painful to write, and any changes will be time consuming to implement. Instead, we can use a Sass [@for loop](http://thesassway.com/intermediate/if-for-each-while#for) to make this much more manageable.

### Sass @for loops

Here's an example of a simple Sass for loop:

{{< highlight scss >}}
@for $i from 1 through 3 {
  .tile-#{$i} {
    margin-left: 100px * #{$i}
  }
}

{{< /highlight >}}

This compiles to the following CSS:

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

### Sass loops, nth-child and animation-delay

We will use a for loop to access the nth-child of an element and add a delay to each animation; increasing the delay as we move through each iteration of the loop.

{{< highlight scss >}}
// Loop from 1-9.
@for $i from 1 through 9 {
  .tile {
    
    // :nth-child(1-9) 
    &:nth-child(#{$i}) {
      
      // Delay the animation. Delay increases as items loop.
      animation-delay: $i * (1s / 18);
    }
  }
}
{{< /highlight >}}

In my example I'm using 9 placeholder elements so I set the loop to stop at 9 and I've chosen an <code>animation-delay</code> which is based on 9. Because of this the animation will have a consistent rhythm and by the 9th nth-child the delay will be 0.5s (half the duration of our pulse animation).

The CSS output of this loop is:

{{< highlight scss >}}
.tile:nth-child(1) {
  animation-delay: .05555s;
}

.tile:nth-child(2) {
  animation-delay: .1111s;
}

.tile:nth-child(3) {
  animation-delay: .01666s;
}
{{< /highlight >}}

<small>And so on...</small>

Check out how it looks on codepen:

<iframe class="codepen" height='350' scrolling='no' title='Basic preloader animation' src='//codepen.io/lenymo/embed/qozOWa/?height=350&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

This is looking nice and sharp. It's helpful to have this on screen while a user waits for an API request to return. What about once content has loaded though? We'll get to that next.

## Animating items once they're loaded

Once our items are loaded it would be great if they appeared one-after-the-other, as if in sequence. We'll use what we've learned so far and throw in a few extra tricks to make that happen.

### Playing an animation only one time

This animation will be different to our preloader because we only want our animation to run one time (eg. when the element first appears in the DOM). We'll be fading the <code>.tile</code> element in so we need to ensure that it uses the styles from the first keyframe of our animation as soon as it appears (eg. it should start with <code>opacity: 0</code>). 

We also want <code>.tile</code> to maintain the styles we declared in our animation's last keyframe once the animation has completed (eg. <code>opacity: 1</code>).

The obvious thing to do here is set the <code>animation-iteration-count</code> to 1 but unfortunately it's more complicated than that. 

With an iteration count of 1, the element starts with the element's default state, then abruptly assumes the styles as declared at the start of the animation (0%). The animation then runs, but after it reaches 100% the element abruptly reverts to its initial state.

This results in the element flashing on screen, suddenly disappearing, then fading back to 100% opacity and the issue become even more obvious when <code>animation-delay</code> is used.

### Animation fill mode

Thankfully <code>[animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)</code> is designed to solve this exact problem.

When set, <code>animation-fill-mode: both</code> will cause an element to use the styles from an animation's *first* keyframe (0%) as soon as the animation is applied (even if there's an <code>animation-delay</code>).

The element will then use the styles from the animation's *last* keyframe once the animation has finished.

If that doesn't entirely make sense, don't stress. It works, and that's what matters. For more on animation-fill-mode, Codrops has [a handy breakdown in their CSS reference](https://tympanus.net/codrops/css_reference/animation-fill-mode/).

Anyway, here's the new CSS for our <code>.tile</code> element:

{{< highlight scss >}}
.tile {
  // duration | timing-function | fill-mode | name
  animation: .3s ease-in-out both fade-in;
}
{{< /highlight >}}

<small>NOTE: We don't need to include an <code>iteration-count</code> of 1 because the default value is 1.</small>

### Keyframes

Here are our fade-in <code>@keyframes</code>:

{{< highlight scss >}}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
{{< /highlight >}}

### The Sass loop

Finally, here's our updated Sass loop:

{{< highlight scss >}}
@for $i from 1 through 12 {
  .tile {
    
    // :nth-child(1-12) 
    &:nth-child(#{$i}) {
      
      // Delay the animation. Delay increases as items loop.
      animation-delay: $i * (.03s);
    }
  }
}
{{< /highlight >}}

And here's the final codepen:

<iframe class="codepen" height='420' scrolling='no' title="Animating items once they're loaded (scale)" src='//codepen.io/lenymo/embed/debyMM/?height=420&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

Unlike the preloader animation, the timing of these animations isn't particularly mathematical. What's more important is achieving a smooth "buttery" effect.

### Adding rotation and a spring-back effect

Our animation is looking fine but some additional CSS trickery will enhance our animation further.

Let's add some additional transform effects to our <code>@keyframes</code> rules.

{{< highlight scss >}}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(50%) scale(0) rotateZ(-60deg);
  }
  
  100% {
    opacity: 1;
    transform: translateX(0) scale(1) rotateZ(0deg);
  }
}
{{< /highlight >}}

Next we'll add a custom <code>animation-timing-function</code> using a cubic-bezier. This will cause our animation to move past its final 100% state and then "spring back" in to place.

{{< highlight scss >}}
.tile {
  animation: .4s cubic-bezier(.25, .25, .25, 1.25) forwards fade-in;
}
{{< /highlight >}}

Personally, I got this particular cubic-bezier formula (<code>.25, .25, .25, 1.25</code>) memorised and frequently use it for both animations and transitions. You can play with the final number to increase or decrease how far past 100% the animation goes.

Here's the updated Codepen:

<iframe class="codepen" height='420' scrolling='no' title='Animating items once they're loaded (scale, rotation)' src='//codepen.io/lenymo/embed/aGobRN/?height=420&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

## Browser support and progressive enhancement

The CSS properties we've used here (animation, nth-child, etc) are well supported in modern browsers and they degrade gracefully. If animations aren't supported, the items will appear immediately.

Here's the browser support according to [can I use](https://caniuse.com/): 

* [nth-child](https://caniuse.com/#feat=css-sel3).
* [animation (including @keyframes)](https://caniuse.com/#feat=css-animation).

The animations work fine until you get to IE 9, when the animations don't work and items will appear instantly (which is fine).

The other major culprits are older mobile browsers. 

Mobile Safari requires the <code>-webkit</code> vendor prefix in relatively recent versions (eg. v8, released in 2014) and has only partial support in older versions (most recently in v5.1, released in 2012). 

It's a similar story with Android devices, which have only partial support in anything prior to Android v4 (released in 2011). After Android v4 animations are supported using the <code>-webkit</code> vendor prefix.

It's important to keep all of this in perspective though. In the event that animations aren't supported, the page is still functional. All that's missing is the animation. These degrade nice and gracefully.
