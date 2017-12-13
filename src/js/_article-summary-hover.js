

//
//  TABLE OF CONTENTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var ArticleSummaryHover = (function() {


  //
  //  HANDLE TABLE OF CONTENTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleArticleSummaryHover() {


    var article = document.querySelector('.article-summary');

    console.log( 'width: ' + article.offsetWidth );
    console.log( 'height: ' + article.offsetHeight );

    article.addEventListener('mousemove', function(e) {

      // Get mouse pos on document.
      var mouseX = e.pageX;
      var mouseY = e.pageY;

      // Get scroll position.
      var scrollPosY = document.documentElement.scrollTop;

      // Get the dimensions of the article summary.
      var rect = this.getBoundingClientRect();

      var rectMouseX = mouseX - rect.left;

      console.log( rect );

      console.log( rectMouseX );

      var rectMouseXPercent = rectMouseX / rect.width;
      rectMouseXPercent = rectMouseXPercent.toFixed(2);
      rectMouseXPercent = rectMouseXPercent - 0.5;
      rectMouseXPercent = rectMouseXPercent * 2;

      console.log( rectMouseXPercent );

      this.style.transform = 'perspective(600px) rotateY(' + rectMouseXPercent + 'deg)';

      // console.log( scrollPosY );
      // console.log('rect.left: ' + rect.left);
      // console.log('rect.top: ' + rect.top);
      // console.log( 'top: ' + rect.top + document.body.scrollTop );

    });


    // var articles = document.querySelectorAll('.article-summary');

    // if ( articles ) {

    //   // Loop through all article summary tiles.
    //   for ( var i = 0; i < articles.length; i++ ) {

    //     // Listen for the hover event.
    //     articles[i].addEventListener('hover', function(e) {



    //     });

    //   } // for ( var i = 0; i < articles.length; i++ )
    // } // if ( articles )

  } // handleArticleSummaryHover()


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
