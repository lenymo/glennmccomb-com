

//
//  FORMS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var HandleForms = (function() {


  //
  //  MONITOR INPUTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  
  function monitorInputs() {

    // Get all inputs.
    var inputs = document.querySelectorAll('input, select, textarea');

    var toggleClass = '-has-error';

    // Loop through all inputs.
    for ( var i = 0; i < inputs.length; i++ ) {

      // Listen for the invalid event.
      inputs[i].addEventListener('invalid', function(e) {

        this.classList.add( toggleClass );

      });

      // Listen for the blur event.
      inputs[i].addEventListener('blur', function(e) {

        this.checkValidity();

      });
    }
  } // monitorInputs()


  //
  //  MONITOR EMAIL INPUTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  // Listen to email inputs and add 
  function monitorEmailInputs() {

    // Get all email form fields.
    var emailInputs = document.querySelectorAll('input[type="email"]');

    var toggleClass = '-has-text';

    // Loop through form fields.
    for ( var i = 0; i < emailInputs.length; i++ ) {

      // Listen for the input event.
      emailInputs[i].addEventListener('input', function(e) {

        // Get the input value.
        var inputValue = this.value;

        // If there's 1 or more characters.
        if ( inputValue.length > 0 ) {

          // Add the .has-text class.
          this.classList.add( toggleClass );

        // If there are no characters in the field.
        } else {

          // Remove the .has-text class.
          this.classList.remove( toggleClass );
        }
      });
    }
  }


  //
  //  MONITOR SELECTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function monitorSelectInputs() {

    // Get all select inputs.
    var selectInputs = document.querySelectorAll('select');

    var toggleClass = '-has-focus';

    var fieldWrapper;

    // Loop through form fields.
    for ( var i = 0; i < selectInputs.length; i++ ) {
      
      // Focus event.
      selectInputs[i].addEventListener('focus', function(e) {

        fieldWrapper = this.parentElement;
        
        // Add the toggle class.
        fieldWrapper.classList.add( toggleClass );

      });

      // Blur event.
      selectInputs[i].addEventListener('blur', function(e) {

        fieldWrapper = this.parentElement;
        
        // Remove the toggle class.
        fieldWrapper.classList.remove( toggleClass );

      });
    }
  }
  
  


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
    init: init
  };

})();