

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
    var parentToggleClass = '-field-has-error';

    // Loop through all inputs.
    for ( var i = 0; i < inputs.length; i++ ) {

      // Listen for the invalid event.
      inputs[i].addEventListener('invalid', function(e) {

        this.classList.add( toggleClass );
        this.parentElement.classList.add( parentToggleClass );

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
  //  HANDLE CONTACT FORM SUBMISSION
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleContactFormSubmission() {

    var sendingClass = '-is-sending';
    var sentClass = '-is-sent';
    var doneClass = '-is-done';

    var sendingDelay = 1000;
    
    // Get contact form.
    var contactForm = document.querySelector('.form__contact');

    contactForm.addEventListener('submit', function(e) {

      // Stop the form from submitting.
      e.preventDefault();

      // Get the form action.
      var form = this;
      var action = form.action;

      // Get the form field values (name, email, message).
      var name = document.querySelector('.form__field-name').value;
      var email = document.querySelector('.form__field-email').value;
      var message = document.querySelector('.form__field-message').value;
      var button = document.querySelector('.form__field-message').value;

      // Add the sending class.
      form.classList.add( sendingClass );

      // Put together the request string.
      var requestString = '?form-name=contact';
      requestString += '&name=' + name;
      requestString += '&email=' + email;
      requestString += '&message=' + message;

      // Build the request URL.
      var requestUrl = action + requestString;

      // Encode the URL.
      requestUrl = encodeURI(requestUrl);

      // Create a new request.
      var request = new XMLHttpRequest();

      // Open the request.
      request.open('POST', requestUrl, true);

      // When the request is loaded.
      request.onload = function() {

        // If it was successful.
        if (request.status >= 200 && request.status < 400) {

          console.log('Success');

          setTimeout( function() {
            form.classList.add( sentClass );
          }, sendingDelay );

          setTimeout( function() {
            form.classList.add( doneClass );
          }, sendingDelay * 2 );

        // If the server was contacted but submissions was unsuccessful.
        } else {
          console.log('Server was reached but it returned an error');
        }
      };

      // Handle errors.
      request.onerror = function() {
        console.log('There was a connection error of some sort.');
      };

      // Send the request.
      request.send();

    });
  }


  
  
  


  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    monitorInputs();
    monitorEmailInputs();
    monitorSelectInputs();
    handleContactFormSubmission();
  }


  //
  //  RETURN
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  return {
    init: init
  };

})();