

//
//  LQIP IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

var LqipImages = (function() {


  //
  //  HANDLE LQIP IMAGES
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleLqipImages() {

    var lqipImages;
    var lqipImage;
    var lqipImageWrapper;
    var imgShortcode;
    var fullImageSrc;
    var fullImage;
    var fullImageClass = 'img-shortcode__img-full'
    var imageLoadingClass = '-image-is-loading';
    var imageLoadedClass = '-image-has-loaded';


    // On page load.
    window.onload = function() {

      // Find all LQIP images on the page.
      lqipImages = document.querySelectorAll('.img-shortcode__img-lqip');

      // Loop through all LQIP images.
      for (var i = 0; i < lqipImages.length; i++) {

        // Instantiate this individual image.
        lqipImage = lqipImages[i];

        lqipImageWrapper = lqipImage.parentElement;

        // Get the images parent (.img-shortcode).
        imgShortcode = lqipImageWrapper.parentElement;

        // Add the loading class to the image shortcode.
        imgShortcode.classList.add( imageLoadingClass );

        // Get the full image src.
        fullImageSrc = imgShortcode.dataset.full;

        // Create a new image.
        fullImage = null;
        fullImage = new Image();

        // When the full image has loaded.
        fullImage.onload = function() {

          lqipImageWrapper = this.parentElement;
          imgShortcode = lqipImageWrapper.parentElement;

          // Add the loaded class to the full image.
          imgShortcode.classList.add( imageLoadedClass );
        }

        // Add the src to the full image.
        fullImage.src = fullImageSrc;

        // Add the appropriate BEM clas to the full image.
        fullImage.classList.add( fullImageClass );

        // Insert the full image before the LQIP image.
        lqipImageWrapper.insertBefore( fullImage, lqipImage );

      }
    }
  } // handleLqipImages()


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleLqipImages();
  }

  return {
    init: init
  };
})();
