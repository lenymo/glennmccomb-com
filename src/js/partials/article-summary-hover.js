//
//  TABLE OF CONTENTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

export const ArticleSummaryHover = (function () {
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
      articleSummary: ".article-summary",
      featuredImage: ".article-summary__featured-image",
    },
  };

  //
  //  HANDLE TABLE OF CONTENTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleArticleSummaryHover() {
    // Declare variables.
    var articles;
    var article;
    var w;

    // Get viewport width.
    w = Helpers.getViewportWidth();

    // If viewport is wide enough.
    if (w >= config.onlyRunAbove) {
      // If this is NOT an old version of IE
      if (Helpers.isIE() == false) {
        // Get all article summaries.
        articles = document.querySelectorAll(config.selectors.articleSummary);

        // If there are article summaries.
        if (articles) {
          // Loop through all article summary tiles.
          for (var i = 0; i < articles.length; i++) {
            // Make article variable more obvious.
            article = articles[i];

            // Listen for the mouse events.
            // Move.
            article.addEventListener("mousemove", processMouseMoveEvent);

            // Enter.
            article.addEventListener("mouseenter", processMouseEnterEvent);

            // Leave.
            article.addEventListener("mouseleave", processMouseLeaveEvent);
          } // for ( var i = 0; i < articles.length; i++ )
        } // if ( articles )
      } // if ( Helpers.isIE() !== false )
    } // if ( w >= config.onlyRunAbove )
  } // handleArticleSummaryHover()

  //
  //  PROCESS MOUSE MOVE EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseMoveEvent(e) {
    // Declare variables.
    var article;
    var mouseX;
    var mouseY;
    var rect;
    var rectMouseXPercent;
    var rectMouseYPercent;

    // Get mouse pos on document.
    mouseX = e.pageX;
    mouseY = e.pageY;

    // Instantiate article tile.
    article = this;

    // Get the dimensions of the article summary.
    rect = this.getBoundingClientRect();

    // Get the user's mouse position from left-to-right
    // as a percentage.
    rectMouseXPercent = getMouseXPercent(rect, mouseX);

    // Get the user's mouse position from top-to-bottom
    // as a percentage.
    rectMouseYPercent = getMouseYPercent(rect, mouseY);

    //
    applyCSSTransforms(article, rect, rectMouseXPercent, rectMouseYPercent);
  } // processMouseMoveEvent()

  //
  //  PROCESS MOUSE ENTER EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseEnterEvent() {
    // Declare variables.
    var article;

    // Instantiate article tile.
    article = this;

    // Add the mouse over toggle class to the article tile.
    article.classList.add(config.mouseOverToggleClass);
  } // processMouseEnterEvent()

  //
  //  PROCESS MOUSE LEAVE EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseLeaveEvent() {
    // Declare variables.
    var article;

    // Instantiate article.
    article = this;

    // Remove transform effect.
    article.style.transform = "";

    // Remove transform effect from featured image.
    article.querySelector(config.selectors.featuredImage).style.transform = "";

    // Remove the mouse over toggle class.
    article.classList.remove(config.mouseOverToggleClass);
  } // processMouseLeaveEvent()

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
  } // getMouseXPercent()

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
    scrollPosY = document.documentElement.scrollTop;

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
  } // getMouseYPercent()

  //
  //  APPLY CSS TRANSFORMS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function applyCSSTransforms(
    article,
    rect,
    rectMouseXPercent,
    rectMouseYPercent
  ) {
    // Declare variables.
    var transformCSS;
    var articleImage;
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
      article.style.transform = transformCSS;
    }

    // Find the featured image.
    articleImage = article.querySelector(config.selectors.featuredImage);

    // If there's an article image.
    if (articleImage) {
      // Build the image transform CSS.
      imageTransformCSS = "scale(1.025) ";
      imageTransformCSS += "translateX(" + rectMouseXPercent * 8 * -1 + "px) ";
      imageTransformCSS += "translateY(" + rectMouseYPercent * 6 + "px) ";

      // Apply the image transform CSS.
      articleImage.style.transform = imageTransformCSS;
    }
  } // applyCSSTransforms()

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    // Run functions.
    handleArticleSummaryHover();
  }

  return {
    init: init,
  };
})();
