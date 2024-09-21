//
//  FORMS
//––––––––––––––––––––––––––––––––––––––––––––––––––

export const HandleForms = (function () {
  //
  //  MONITOR INPUTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function monitorInputs() {
    // Get all inputs.
    var inputs = document.querySelectorAll("input, select, textarea");
    var forms = document.querySelectorAll(".form");

    var toggleClass = "-has-error";
    var parentToggleClass = "-field-has-error";

    // If there are inputs.
    if (inputs.length > 0 && forms.length > 0) {
      // Loop through all inputs.
      for (var i = 0; i < inputs.length; i++) {
        // Listen for the invalid event.
        inputs[i].addEventListener("invalid", function (e) {
          this.classList.add(toggleClass);
          this.parentElement.classList.add(parentToggleClass);
        });

        // Listen for the blur event.
        inputs[i].addEventListener("blur", function (e) {
          this.checkValidity();
        });
      } // for ( var i = 0; i < inputs.length; i++ )
    } // if ( inputs.length > 0 )
  } // monitorInputs()

  //
  //  MONITOR EMAIL INPUTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  // Listen to email inputs and add
  function monitorEmailInputs() {
    // Get all email form fields.
    var emailInputs = document.querySelectorAll('input[type="email"]');

    var toggleClass = "-has-text";

    // If there are email inputs on the page.
    if (emailInputs.length > 0) {
      // Loop through email fields.
      for (var i = 0; i < emailInputs.length; i++) {
        // Listen for the input event.
        emailInputs[i].addEventListener("input", function (e) {
          // Get the input value.
          var inputValue = this.value;

          // If there's 1 or more characters.
          if (inputValue.length > 0) {
            // Add the .has-text class.
            this.classList.add(toggleClass);

            // If there are no characters in the field.
          } else {
            // Remove the .has-text class.
            this.classList.remove(toggleClass);
          }
        });
      } // for ( var i = 0; i < emailInputs.length; i++ )
    } // if ( emailInputs.length > 0 )
  } // monitorEmailInputs()

  //
  //  MONITOR SELECTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function monitorSelectInputs() {
    // Get all select inputs.
    var selectInputs = document.querySelectorAll("select");

    var toggleClass = "-has-focus";

    var fieldWrapper;

    // If there are select inputs.
    if (selectInputs.length > 0) {
      // Loop through form fields.
      for (var i = 0; i < selectInputs.length; i++) {
        // Focus event.
        selectInputs[i].addEventListener("focus", function (e) {
          fieldWrapper = this.parentElement;

          // Add the toggle class.
          fieldWrapper.classList.add(toggleClass);
        });

        // Blur event.
        selectInputs[i].addEventListener("blur", function (e) {
          fieldWrapper = this.parentElement;

          // Remove the toggle class.
          fieldWrapper.classList.remove(toggleClass);
        });
      } // for ( var i = 0; i < selectInputs.length; i++ )
    } // if ( selectInputs.length > 0 )
  } // monitorSelectInputs()

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    monitorInputs();
    monitorEmailInputs();
    monitorSelectInputs();
  }

  //
  //  RETURN
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  return {
    init: init,
  };
})();
