//
//  PARALLAX HOVER
//––––––––––––––––––––––––––––––––––––––––––––––––––

import { Helpers } from "./helpers";

export const ParallaxHover = (function () {
  //
  //  CONFIG
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  var config = {
    onlyRunAbove: 992,
    transformModX: 1,
    transformModY: 1.5,
    transformPerspective: "600px",
    transformScale: 1.01,
    mouseOverToggleClass: "-is-being-hovered",
    selectors: {
      wrapper: ".parallax-hover",
      featuredImage: ".parallax-hover__featured-image",
    },
    attributes: {
      scale: "parallax-hover-scale",
    },

    // Phography specific settings.
    photography: {
      transformScale: 1.03,
      transformModX: 2,
      transformModY: 1.5,
      className: "photography-summary__wrapper",
    },
  };

  //
  //  HANDLE PARALLAX HOVER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleParallaxHover() {
    // Declare variables.
    var parallaxWrappers;
    var wrapper;
    var w;

    // Get viewport width.
    w = Helpers.getViewportWidth();

    // If viewport is wide enough.
    if (w >= config.onlyRunAbove) {
      // If this is NOT an old version of IE
      if (Helpers.isIE() === false) {
        // Get all wrappers.
        parallaxWrappers = document.querySelectorAll(config.selectors.wrapper);

        // If there are wrappers.
        if (parallaxWrappers) {
          // Loop through all wrappers tiles.
          for (var i = 0; i < parallaxWrappers.length; i++) {
            // Instantiate wrapper.
            wrapper = parallaxWrappers[i];

            // Listen for the mouse events.
            // Move.
            wrapper.addEventListener("mousemove", processMouseMoveEvent);

            // Enter.
            wrapper.addEventListener("mouseenter", processMouseEnterEvent);

            // Leave.
            wrapper.addEventListener("mouseleave", processMouseLeaveEvent);
          }
        }
      }
    }
  }

  //
  //  PROCESS MOUSE MOVE EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseMoveEvent(e) {
    // Declare variables.
    var wrapper;
    var mouseX;
    var mouseY;
    var rect;
    var rectMouseXPercent;
    var rectMouseYPercent;

    // Instantiate parallax wrapper.
    wrapper = this;

    // Photography customisations.
    if (wrapper.classList.contains(config.photography.className)) {
      config.transformScale = config.photography.transformScale;
      config.transformModX = config.photography.transformModX;
      config.transformModY = config.photography.transformModY;
    }

    // Get mouse pos on document.
    mouseX = e.pageX;
    mouseY = e.pageY;

    // Get the dimensions of the wrapper.
    rect = this.getBoundingClientRect();

    // Get the user's mouse position from left-to-right
    // as a percentage.
    rectMouseXPercent = getMouseXPercent(rect, mouseX);

    // Get the user's mouse position from top-to-bottom
    // as a percentage.
    rectMouseYPercent = getMouseYPercent(rect, mouseY);

    // Apply CSS transformations.
    applyCSSTransforms(wrapper, rect, rectMouseXPercent, rectMouseYPercent);
  }

  //
  //  PROCESS MOUSE ENTER EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseEnterEvent() {
    // Declare variables.
    var wrapper;

    // Instantiate wrapper.
    wrapper = this;

    // Add the mouse over toggle class to the wrapper.
    wrapper.classList.add(config.mouseOverToggleClass);
  }

  //
  //  PROCESS MOUSE LEAVE EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseLeaveEvent() {
    // Declare variables.
    var wrapper;
    var wrapperImage;

    // Instantiate wrapper.
    wrapper = this;

    // Remove transform effect.
    wrapper.style.transform = "";

    // Remove transform effect from featured image.
    wrapperImage = wrapper.querySelector(config.selectors.featuredImage);

    if (wrapperImage) {
      wrapperImage.style.transform = "";
    }

    // Remove the mouse over toggle class.
    wrapper.classList.remove(config.mouseOverToggleClass);
  }

  //
  //  GET RECT MOUSE X %
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function getMouseXPercent(rect, mouseX) {
    // Declare variables.
    var rectOffsetX;
    var rectMouseX;
    var rectMouseXPercent;

    // Get the position of the article summary from the left of viewport.
    rectOffsetX = rect.left;

    // This gives the mouse's position at the
    // very left of the rectangle as zero.
    rectMouseX = mouseX - rectOffsetX;

    // What percentage from left to right has the user scrolled?
    // This is a number 0 - 1.
    rectMouseXPercent = rectMouseX / rect.width;

    // Get the percentage to 2 decimal places.
    rectMouseXPercent = rectMouseXPercent.toFixed(2);

    // Instead of 0 to 1, make the number -0.5 to 0.5.
    rectMouseXPercent = rectMouseXPercent - 0.5;

    // Apply the transform modifier.
    rectMouseXPercent = rectMouseXPercent * config.transformModX;

    // Invert the effect.
    // rectMouseXPercent = rectMouseXPercent * -1;

    return rectMouseXPercent;
  }

  //
  //  GET RECT MOUSE Y %
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function getMouseYPercent(rect, mouseY) {
    // Declare variables.
    var scrollPosY;
    var rectOffsetY;
    var rectMouseY;
    var rectMouseYPercent;

    // Get Y scroll position.
    scrollPosY = window.scrollY;

    // Get the article summary's position from the top of the viewport.
    rectOffsetY = scrollPosY + rect.top;

    // Get the user's mouse position relative to the article summary.
    // This gives 0 when the user is at the top of the element.
    rectMouseY = mouseY - rectOffsetY;

    // What percentage from top to bottom has the user scrolled?
    // This is a number 0 - 1.
    rectMouseYPercent = rectMouseY / rect.height;

    // Get the percentage to 2 decimal places.
    rectMouseYPercent = rectMouseYPercent.toFixed(2);

    // Convert the number from 0 to 1 to be -0.5 to 0.5.
    rectMouseYPercent = rectMouseYPercent - 0.5;

    // Apply the transform modifier from the config object.
    rectMouseYPercent = rectMouseYPercent * config.transformModY;

    // Invert the effect.
    rectMouseYPercent = rectMouseYPercent * -1;

    return rectMouseYPercent;
  }

  //
  //  APPLY CSS TRANSFORMS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function applyCSSTransforms(
    wrapper,
    rect,
    rectMouseXPercent,
    rectMouseYPercent
  ) {
    // Declare variables.
    var transformCSS;
    var wrapperImage;
    var imageTransformCSS;

    // If the transforms aren't too extreme.
    if (
      rectMouseXPercent > -(0.5 * config.transformModX) - 1 &&
      rectMouseXPercent < 0.5 * config.transformModX + 1 &&
      rectMouseYPercent > -(0.5 * config.transformModY) - 1 &&
      rectMouseYPercent < 0.5 * config.transformModY + 1
    ) {
      // Build the transform CSS.
      transformCSS = "perspective(" + rect.width / 2 + "px) ";
      transformCSS += "scale(" + config.transformScale + ") ";
      transformCSS += "rotateY(" + rectMouseXPercent + "deg) ";
      transformCSS += "rotateX(" + rectMouseYPercent + "deg)";

      // Apply the transform CSS.
      wrapper.style.transform = transformCSS;
    }

    // Find the featured image.
    wrapperImage = wrapper.querySelector(config.selectors.featuredImage);

    // If there's a wrapper image.
    if (wrapperImage) {
      // Build the image transform CSS.
      imageTransformCSS = "scale(1.025) ";
      imageTransformCSS += "translateX(" + rectMouseXPercent * 8 * -1 + "px) ";
      imageTransformCSS += "translateY(" + rectMouseYPercent * 6 + "px) ";

      // Apply the image transform CSS.
      wrapperImage.style.transform = imageTransformCSS;
    }
  }

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    // Run functions.
    handleParallaxHover();
  }

  return {
    init: init,
  };
})();
