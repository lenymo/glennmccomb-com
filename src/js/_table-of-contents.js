

//
//  TABLE OF CONTENTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var TableOfContents = (function() {


  //
  //  HANDLE TABLE OF CONTENTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleTableOfContents() {

    // console.log('handleTableOfContents()');

    // Variables.
    var toc = document.querySelector('.table-of-contents');
    var tocToggle = document.querySelector('.table-of-contents__toggle');
    var tocToggleClass = '-is-expanded';

    // console.log( tocToggle );

    // Listen for clicks on the ToC toggle.
    tocToggle.addEventListener('click', function(e){
      
      // If the ToC is expanded.
      if ( toc.classList.contains( tocToggleClass ) ) {
        toc.classList.remove( tocToggleClass );

      // If the ToC is not expanded.
      } else {
        toc.classList.add( tocToggleClass );
      }
    });
  }


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleTableOfContents();
  }

  return {
    init: init
  };
})();
