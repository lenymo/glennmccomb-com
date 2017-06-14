//
//  JAVASCRIPT
//––––––––––––––––––––––––––––––––––––––––––––––––––


//
//  TOGGLE MOBILE MENU
//––––––––––––––––––––––––––––––––––––––––––––––––––

(function() {
  var siteNavToggle = document.querySelector('.site-nav__nav-toggle');

  siteNavToggle.addEventListener('click', toggleSiteNav, false);

  function toggleSiteNav() {

    var siteNavOpenClass = 'site-nav-is-open';
    var siteNavOpenFlag = false;

    var bodyElem = document.querySelector('body');
    var bodyElemClasses = bodyElem.classList;

    // Loop though all body classes.
    for (var i = 0; i < bodyElemClasses.length; i++) {
      
      // If the menu is open.
      if ( bodyElemClasses[i] == siteNavOpenClass ) {
        siteNavOpenFlag = true;
        break;
      }
    }

    // If the menu is open.
    if ( siteNavOpenFlag ) {
      bodyElem.classList.remove(siteNavOpenClass);

    // If the menu is closed.
    } else {
      bodyElem.className += ' ' + siteNavOpenClass;
    }
  }

})();


//
//  OPEN EXTERNAL LINKS IN NEW TAB
//––––––––––––––––––––––––––––––––––––––––––––––––––

(function() {
  var links = document.links;

  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
    } 
  }
})();
