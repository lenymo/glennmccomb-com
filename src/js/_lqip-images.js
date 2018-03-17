

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

        lqipImage = lqipImages[i];

        // Get the images parent (.img-shortcode).
        imgShortcode = lqipImages[i].parentElement;

        imgShortcode.classList.add( imageLoadingClass );


        fullImageSrc = lqipImage.dataset.full;
        fullImage = new Image();
        fullImage.src = fullImageSrc;
        fullImage.classList.add( fullImageClass );

        fullImage.onload = function() {
          imgShortcode.classList.add( imageLoadedClass );
        }

        imgShortcode.insertBefore( fullImage, lqipImage );

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
