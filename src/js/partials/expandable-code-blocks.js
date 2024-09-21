//
//  EXPANDABLE CODE BLOCKS
//––––––––––––––––––––––––––––––––––––––––––––––––––

export const ExpandableCodeBlocks = (function () {
  //
  //  EXPANDABLE CODE BLOCKS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function expandableCodeBlocks() {
    var expandClass;

    var highlights;
    var highlight;
    var highlightWidth;
    var code;
    var codeWidth;

    expandClass = "-is-expandable";

    // Get all highlight elements.
    highlights = document.querySelectorAll(".highlight");

    // If there are highlights.
    if (highlights) {
      // Loop through all highlights.
      for (var i = 0; i < highlights.length; i++) {
        // Get the width of the highlight.
        highlight = highlights[i];

        highlightWidth = highlight.offsetWidth;

        // Get the width of the child <code> element.
        code = highlight.querySelector("code");

        if (code) {
          codeWidth = code.offsetWidth;
        }

        if (highlightWidth && codeWidth) {
          if (codeWidth > highlightWidth) {
            highlight.classList.add(expandClass);
          }
        }
      } // for()
    } // if ( highlights )
  } // handleTableOfContents()

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    expandableCodeBlocks();
  }

  return {
    init: init,
  };
})();
