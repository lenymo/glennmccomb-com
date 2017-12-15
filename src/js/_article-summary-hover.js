

//
//  TABLE OF CONTENTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var ArticleSummaryHover = (function() {


  //
  //  CONFIG
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  var config = {
    onlyRunAbove: 1024,
    transformModX: 1,
    transformModY: 2,
    transformPerspective: '600px',
    // transformScale: 1.015,
    transformScale: 1.01,

    mouseOverToggleClass: '-is-being-hovered'
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

    if ( w >= config.onlyRunAbove ) {

      // Get all article summaries.
      articles = document.querySelectorAll('.article-summary');

      // If there are article summaries.
      if ( articles ) {

        // Loop through all article summary tiles.
        for ( var i = 0; i < articles.length; i++ ) {

          // Make article variable more obvious.
          article = articles[i];

          // Listen for the mouse events.
          // Move.
          article.addEventListener('mousemove', processMouseMoveEvent);

          // Enter.
          article.addEventListener('mouseenter', processMouseEnterEvent);

          // Leave.
          article.addEventListener('mouseleave', processMouseLeaveEvent);

        } // for ( var i = 0; i < articles.length; i++ )
      } // if ( articles )
    } // if ( w >= config.onlyRunAbove )
  } // handleArticleSummaryHover()


  //
  //  PROCESS MOUSE MOVE EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseMoveEvent(e) {
    
    // Get mouse pos on document.
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    var rect;
    var rectMouseXPercent;
    var scrollPosY;
    var rectMouseYPercent;
    var transformCSS;

    // Get the dimensions of the article summary.
    rect = this.getBoundingClientRect();

    // Get the user's mouse position from left-to-right as a percentage.
    rectMouseXPercent = getMouseXPercent( rect, mouseX );
    console.log( 'rectMouseXPercent: ' + rectMouseXPercent );

    // Get the user's mouse position from top-to-bottom as a percentage.
    rectMouseYPercent = getMouseYPercent( rect, mouseY );
    console.log( 'rectMouseYPercent: ' + rectMouseYPercent );

    // if (
    //   rectMouseXPercent > -(0.5 * config.transformModX) &&
    //   rectMouseXPercent < (0.5 * config.transformModX) &&
    //   rectMouseYPercent > -(0.5 * config.transformModY) &&
    //   rectMouseYPercent < (0.5 * config.transformModY)
    // ) {

      // Build the transform CSS.
      transformCSS = 'perspective(' + config.transformPerspective + ') ';
      transformCSS += 'scale(' + config.transformScale + ') ';
      transformCSS += 'rotateY(' + rectMouseXPercent + 'deg) ';
      transformCSS += 'rotateX(' + rectMouseYPercent + 'deg)';

      // Apply the transform CSS.
      this.style.transform = transformCSS;
    // }
  } // processMouseMoveEvent()


  //
  //  GET RECT MOUSE X %
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  
  function getMouseXPercent( rect, mouseX ) {

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

    return rectMouseXPercent;
  } // getMouseXPercent()


  //
  //  GET RECT MOUSE Y %
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function getMouseYPercent( rect, mouseY, scrollY ) {

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
  //  PROCESS MOUSE ENTER EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseEnterEvent(e) {

    this.classList.add( config.mouseOverToggleClass );

  } // processMouseEnterEvent()


  //
  //  PROCESS MOUSE LEAVE EVENT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function processMouseLeaveEvent(e) {

    // Remove transform effect.
    this.style.transform = '';

    this.classList.remove( config.mouseOverToggleClass );

  } // processMouseLeaveEvent()


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleArticleSummaryHover();
  }

  return {
    init: init
  };
})();
