

//
//  TOGGLE MOBILE MENU
//––––––––––––––––––––––––––––––––––––––––––––––––––

var ToggleMobileMenu = (function() {


  //
  //  TOGGLE MOBILE MENU
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function toggleMobileMenu() {

    var siteNavToggle = document.querySelector('.site-nav__nav-toggle');

    // If the site nav toggle exists.
    if ( siteNavToggle ) {

      // Listen for clicks on the menu toggle.
      siteNavToggle.addEventListener('click', toggleSiteNav, false);
    }

    function toggleSiteNav() {

      var siteNavOpenClass = 'site-nav-is-open';
      var siteNavOpenFlag = false;

      var bodyElem = document.querySelector('body');
      var bodyElemClasses = bodyElem.classList;

      // Loop though all classes on the body element.
      for (var i = 0; i < bodyElemClasses.length; i++) {
        
        // If the menu open class is on the body.
        if ( bodyElemClasses[i] == siteNavOpenClass ) {
          siteNavOpenFlag = true;
          break;
        }
      }

      // If the menu is open.
      if ( siteNavOpenFlag ) {

        // Close the menu.
        bodyElem.classList.remove(siteNavOpenClass);
        // console.log('Mobile menu was closed.');

      // If the menu is closed.
      } else {

        // Open the menu.
        bodyElem.className += ' ' + siteNavOpenClass;
        // console.log('Mobile menu was opened.');
      }
    }
  }


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    toggleMobileMenu();
  }


  //
  //  RETURN
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  return {
    init: init
  };

})();