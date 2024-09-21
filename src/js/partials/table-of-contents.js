//
//  TABLE OF CONTENTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

export const TableOfContents = (function () {
  //
  //  HANDLE TABLE OF CONTENTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleTableOfContents() {
    // console.log('handleTableOfContents()');

    // Variables.
    var toc = document.querySelector(".table-of-contents");
    var tocToggle = document.querySelector(".table-of-contents__toggle");
    var tocToggleClass = "-is-expanded";

    // If the ToC toggle exists on the page.
    if (tocToggle) {
      // Listen for clicks on the ToC toggle.
      tocToggle.addEventListener("click", function (e) {
        // If the ToC is expanded.
        if (toc.classList.contains(tocToggleClass)) {
          toc.classList.remove(tocToggleClass);

          // If the ToC is not expanded.
        } else {
          toc.classList.add(tocToggleClass);
        }
      });
    } // if ( tocToggle.length > 0 )
  } // handleTableOfContents()

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleTableOfContents();
  }

  return {
    init: init,
  };
})();
