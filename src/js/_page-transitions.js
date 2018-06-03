

//
//  PAGE TRANSITIONS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var PageTransitions = (function() {


  //
  //  PAGE TRANSITIONS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function pageTransitions() {

    // Code goes here.
    // console.log( Barba );
    Barba.Pjax.start();

  } // pageTransitions()


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    pageTransitions();
  }

  return {
    init: init
  };
})();
