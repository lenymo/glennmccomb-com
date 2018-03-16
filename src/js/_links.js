

//
//  OPEN EXTERNAL LINKS IN NEW TAB
//––––––––––––––––––––––––––––––––––––––––––––––––––

var HandleLinks = (function() {


  //
  //  HANDLE EXTERNAL LINKS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleExternalLinks() {

    // Variables.
    var links = document.links;
    var linksLength = links.length;
    var link;
    var linkHref;
    var hostname = window.location.hostname;

    // Loop through all links.
    for (var i = 0; i < linksLength; i++) {

      // Instantite the indivdual link.
      link = links[i];

      // Get the link's href attribute.
      linkHref = link.href;

      // If the link is to an external site or a javascript:void(0);.
      if (
        link.hostname != hostname &&
        linkHref !== 'javascript:void(0)' &&
        linkHref !== 'javascript:void(0);'
      ) {

        // Set the target of the link to _blank.
        link.target = '_blank';
      }
    }
  } // handleExternalLinks()


  //
  //  HANDLE LINK CLICKS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleLinkClicks(e) {

    // Get the links href attribute.
    var linkHref = this.href;

    // Get the links anchor from the linkHref.
    var linkAnchor = getAnchor( linkHref );

    // Get the link elem.
    var linkElem = document.querySelector( linkAnchor );

    // Scroll to the anchor.
    linkElem.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }


  //
  //  GET ANCHOR
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function getAnchor( linkHref ) {

    // Instantiate variables.
    var length;
    var anchorIndex;
    var anchor;

    // Get link href length.
    length = linkHref.length;

    // Get anchor index.
    anchorIndex = linkHref.indexOf('#');

    // Get everthing from the href element from the hash onwards.
    anchor = linkHref.substring( anchorIndex, length);

    // Return the anchor.
    return anchor;

  } // getAnchor()


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