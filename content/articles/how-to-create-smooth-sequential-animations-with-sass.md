---
title: How to create smooth sequential animations with Sass
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

{{< highlight scss >}}
.tile {
  // duration | timing-function | iteration-count | name
  animation: 1s ease infinite pulse;
}
{{< /highlight >}}

The above animation property applies the fade-in animation to the .tile element over a duration of 1s, with no delay, infinitely repeating and with an ease timing-function. It’s a lot to take in but it’s makes more sense when you see it in practice (more on that below).

### Keyframes

The <code>@keyframes</code> rule works in a similar way to the more familiar @media rule, in that additional CSS is nested within it. The @keyframes rule contains style rules which will be applied to an element as the animation progresses from start (0%) to finish (100%).

Let’s extend the animation example about and write the <code>@keyframes</code> rule.

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

In our example .tile will darken and very slightly scale up across the first half of the animation over a period of 1s (as defined in the animation property on .tile). Any number of percentages can be added between 0% and 100%.

Unfortunately in production it’s still necessary to include -moz and -webkit vendor prefixes in the following manner:

{{< highlight scss >}}
@-webkit-keyframes {
  // Animations.
}

@-moz-keyframes{
  // Animations.
}
{{< /highlight >}}

This becomes tedious to manage *very* quickly. However thankfully [autoprefixer](https://github.com/postcss/autoprefixer) automatically adds these in so you can focus on writing CSS. It's a life changer and is well worth integrating into your workflow.

### Animation delay and nth-child

I’m going to be making heavy use of the <code><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay">animation-delay</a></code> property in combination with the <code>nth-child</code> selector to animate a group of elements in a timed sequence. Delaying animations allows the same animation to be applied to different elements at different starting points. In this way the animation will appear to flow through the elements like a ripple in water.

Ideally the output code will look something like this:

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

## Using Sass loops

The above code will produce the desired effect but it's painful to write, and any changes will be time consuming to implement. Thankfully we can use Sass' [@for loop](http://thesassway.com/intermediate/if-for-each-while#for) to make this much more manageable.

### Sass @for loops

Here's an example of a simple Sass for loop:

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

And so on...

We will use a for loop to access the nth-child of an element and add a delay to each animation; increasing the delay as we move through each child.

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

In my example I'm using 9 placeholder elements so I set the loop to stop at 9 and I've chosen an <code>animation-delay</code> which is relative to 9. This means that the animation will have a consistent rhythm in that by the 9th nth-child the delay will be 0.5s; which is half the 1s duration of our pulse animation.

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

And so on...

Check out how it looks in this codepen:

<iframe height='350' scrolling='no' title='Basic preloader animation' src='//codepen.io/lenymo/embed/qozOWa/?height=350&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

This is looking nice and sharp and is good to have on screen while content is loading from an external API. But what about once content has loaded? We'll get to that next.

## Animating items once they're loaded

Once our items are loaded, it would be nice if they appeared one-after-the-other as if in sequence. We'll use what we've learned so far and throw in a few extra tricks as well.

### Animation fill mode

Unlike our preloader animation, in this case we only want our animation to run one time (i.e. when the item is first loaded). We will be fading the loaded items in so we want them to maintain the value we set at 100% of the <code>@keyframes</code> rule. We also want to ensure that the tile's initial appearance is used as soon as the item appears.

You might think that setting an iteration count of 1 would achieve this effect, but unfortunately what this does is starts at the elements default state, then abruptly jumps to the 0% state, before reverting back to the initial state once the animation is complete.

Thankfully the <code>[animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)</code> can be used to maintain use both an element's initial and final state using the <code>both</code> value.

We will start with new code for the <code>.tile</code> element:

{{< highlight scss >}}
.tile {
  // duration | timing-function | fill-mode | name
  animation: .3s ease-in-out both fade-in;
}
{{< /highlight >}}

<small>NOTE: We don't need to include an <code>iteration-count</code> of 1 because the default value is 1.</small>

### Keyframes

Here are our fade-in keyframes: 

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

Last of all here's our updated Sass loop:

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

And here's the final effect:

<iframe height='420' scrolling='no' title="Animating items once they're loaded (scale)" src='//codepen.io/lenymo/embed/debyMM/?height=420&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

Unlike the preloader animation, the timing of these animations isn't particularly mathematical. It's more focused on achieving a smooth "buttery" effect.

### Adding rotation and a spring-back effect

Next I'll demonstrate how a few additional CSS tweaks can further enhance our animation.

Firstly we'll add some additional transform effects to our <code>@keyframes</code> rules.

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

Next we'll add a custom timing function using a cubic-bezier. This will cause our animation to move past its final 100% state and then "spring back" in to place. I have memorised this particular cubic-bezier formula  and frequently use it for both animations and transitions.

{{< highlight scss >}}
.tile {
  animation: .4s cubic-bezier(.25, .25, .25, 1.25) forwards fade-in;
}
{{< /highlight >}}

Now lets check it out:

<iframe height='420' scrolling='no' title='Animating items once they're loaded (scale, rotation)' src='//codepen.io/lenymo/embed/aGobRN/?height=420&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

## Browser support and progressive enhancement

The CSS properties we've used here (animation, nth-child, etc) are well supported in modern browsers and they degrade gracefully. If animations aren't supported, the items will appear immediately.

Here are the browser support statistics according to [Can I use](https://caniuse.com/): 

* [nth-child](https://caniuse.com/#feat=css-sel3).
* [animation (including @keyframes)](https://caniuse.com/#feat=css-animation).
