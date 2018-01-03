

//
//  OBJECT FIT POLYFILL
//––––––––––––––––––––––––––––––––––––––––––––––––––

var ObjectFitPolyfill = (function() {


  //
  //  OBJECT FIT POLYFILL
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function objectFitPolyfill() {

    // Check if object-fit is supported.
    var needsPolyfill = testObjectFitSupport();

    // If the object-fit polyfill is required.
    if ( needsPolyfill ) {

      // Apply object-fit polyfill.
      applyObjectFitPolyfill();

    }
  } // handleTableOfContents()


  //
  //  TEST OBJECT FIT SUPPORT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function testObjectFitSupport() {

    var needsPolyfill;

    if ('objectFit' in document.documentElement.style === false) {
      needsPolyfill = true;

    } else {
      needsPolyfill = false;
    }

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

        console.log( 'container' );
        console.log( container );

        // Get picture element.
        picture = container.querySelector('.-uses-object-fit');

        console.log( 'picture' );
        console.log( picture );

        console.log( picture.dataset );

        if ( picture.dataset !== undefined ) {

          // Get image source.
          imageSource = picture.dataset.source;

        } else {

          imageSource = picture.getAttribute('data-source');
        }


        // If there's no image source.
        // if ( ! imageSource ) {
        // }

        console.log( 'imageSource' );
        console.log( imageSource );


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
