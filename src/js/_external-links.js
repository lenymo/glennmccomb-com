

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
    var link;

    // Loop through all links.
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {

      link = links[i];

      // If the link is to an external site or a javascript:void(0);.
      if (
        link.hostname != window.location.hostname &&
        link.href !== 'javascript:void(0)' &&
        link.href !== 'javascript:void(0);'
      ) {

        // Set the target of the link to _blank.
        link.target = '_blank';
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