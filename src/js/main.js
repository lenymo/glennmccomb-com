//
//  JAVASCRIPT
//––––––––––––––––––––––––––––––––––––––––––––––––––

import { ToggleMobileMenu } from "./partials/mobile-menu-toggle";
import { HandleLinks } from "./partials/links";
import { HandleForms } from "./partials/forms";
import { HandleContactForm } from "./partials/contact-form";
import { TableOfContents } from "./partials/table-of-contents";
import { ParallaxHover } from "./partials/parallax-hover";
import { ObjectFitPolyfill } from "./partials/object-fit-polyfill";
import { ExpandableCodeBlocks } from "./partials/expandable-code-blocks";
import { LqipImages } from "./partials/lqip-images";

(function () {
  ToggleMobileMenu.init();
  HandleLinks.init();
  HandleForms.init();
  HandleContactForm.init();
  TableOfContents.init();
  // ArticleSummaryHover.init();
  ParallaxHover.init();
  ObjectFitPolyfill.init();
  ExpandableCodeBlocks.init();
  LqipImages.init();
})();
