//
//  LQIP IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

export const LqipImages = (function () {
  //
  //  HANDLE LQIP IMAGES
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleLqipImages() {
    var lqipImages;
    var lqipImage;
    var lqipImageWrapper;
    var lqipFigure;
    var fullImageSrc;
    var fullImage;
    var lqipImagesSelector = ".lqip";
    var fullImageClass = "lqip__full-image";
    var imageLoadingClass = "-image-is-loading";
    var imageLoadedClass = "-image-has-loaded";

    // On page load.
    window.onload = function () {
      // Find all LQIP images on the page.
      lqipImages = document.querySelectorAll(lqipImagesSelector);

      // Loop through all LQIP images.
      for (var i = 0; i < lqipImages.length; i++) {
        // Instantiate this individual image.
        lqipImage = lqipImages[i];

        // Get the lqip image wrapper (.lqip__wrapper).
        lqipImageWrapper = lqipImage.parentElement;

        // Get the images parent (.lqip__figure).
        lqipFigure = lqipImageWrapper.parentElement;

        // Add the loading class to the image shortcode.
        lqipFigure.classList.add(imageLoadingClass);

        // Get the full image src from the figure's data-full attr.
        fullImageSrc = lqipFigure.dataset.full;

        // Create a new image.
        fullImage = null;
        fullImage = new Image();

        // When the full image has loaded.
        fullImage.onload = function () {
          lqipImageWrapper = this.parentElement;
          lqipFigure = lqipImageWrapper.parentElement;

          // Add the loaded class to the full image.
          lqipFigure.classList.add(imageLoadedClass);

          // Remove the loading class.
          lqipFigure.classList.remove(imageLoadingClass);
        };

        // Add the src to the full image.
        fullImage.src = fullImageSrc;

        // Add the appropriate BEM class to the full image.
        fullImage.classList.add(fullImageClass);

        // Insert the full image before the LQIP image.
        lqipImageWrapper.insertBefore(fullImage, lqipImage);
      }
    };
  } // handleLqipImages()

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleLqipImages();
  }

  return {
    init: init,
  };
})();
