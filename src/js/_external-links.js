//
//  OPEN EXTERNAL LINKS IN NEW TAB
//––––––––––––––––––––––––––––––––––––––––––––––––––

var ExternalLinks = (function() {


  //
  //  HANDLE EXTERNAL LINKS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleExternalLinks() {

    // Variables.
    var links = document.links;

    // Loop through all links.
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {

      // If the link is to an external site.
      if (links[i].hostname != window.location.hostname) {

        // Set the target of the link to _blank.
        links[i].target = '_blank';
      } 
    }
  }


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleExternalLinks();
  }

  return {
    init: init
  };
})();