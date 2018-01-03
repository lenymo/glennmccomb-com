

//
//  HELPERS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var Helpers = (function() {


  //
  //  GET VIEWPORT WIDTH
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function getViewportWidth() {

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return w;

  } // handleTableOfContents()


  //
  //  CHECK IE VERSION
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function isIE () {
    
    // // OLD CODE TO DETECT IE 10 AND UNDER.
    // var myNav = navigator.userAgent.toLowerCase();
    // return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;

    var isIE = false;

    if (/MSIE 10/i.test(navigator.userAgent)) {
       // This is internet explorer 10
       isIE = 10;
    }

    if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        // This is internet explorer 9 or 11
        isIE = 11;
    }

    if (/Edge\/\d./i.test(navigator.userAgent)){
       isIE = 'edge';
    }

    return isIE;
  }


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    // getViewportWidth();
  }

  return {
    // init: init,
    getViewportWidth: getViewportWidth,
    isIE: isIE
  };
})();
