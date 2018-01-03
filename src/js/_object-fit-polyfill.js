

//
//  OBJECT FIT POLYFILL
//––––––––––––––––––––––––––––––––––––––––––––––––––

var ObjectFitPolyfill = (function() {


  //
  //  OBJECT FIT POLYFILL
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function objectFitPolyfill() {

    // Check if object-fit is supported.
    var needsPolyfill = testObjectFit();

    // If the object-fit polyfill is required.
    if ( needsPolyfill ) {

      // Apply object-fit polyfill.
      applyObjectFitPolyfill();

    }
  } // handleTableOfContents()


  //
  //  TEST OBJECT FIT SUPPORT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function testObjectFit() {

    var needsPolyfill;

    if ('objectFit' in document.documentElement.style === false) {
      needsPolyfill = true;

    } else {
      needsPolyfill = false;
    }

    console.log( needsPolyfill );

    return needsPolyfill;
  }


  //
  //  APPLY OBJECT FIT POLYFILL
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function applyObjectFitPolyfill() {

    var objectFitContainers;
    var container;
    var imageSource;
    var picture;

    // Find all object fit containers.
    objectFitContainers = document.querySelectorAll('.-is-object-fit-parent');

    // If there are object fit containers.
    if ( objectFitContainers ) {

      // Loop through containers.
      for (var i = 0; i < objectFitContainers.length; i++) {

        // Instantiate container as variable for convenience.
        container = objectFitContainers[i];

        // Get image source.
        imageSource = container.querySelector('img').srcset;

        // Get picture element.
        picture = container.querySelector('.-uses-object-fit');

        // Hide picture element.
        picture.style.display = 'none';

        // Apply the background image to the container.
        container.style.backgroundImage = 'url(' + imageSource + ')';
      }
    }
  }
  


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    objectFitPolyfill();
  }

  return {
    init: init
  };
})();
