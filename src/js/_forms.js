

//
//  FORMS
//––––––––––––––––––––––––––––––––––––––––––––––––––

var HandleForms = (function() {


  //
  //  MONITOR INPUTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  
  function monitorInputs() {

    // Get all inputs.
    var inputs = document.querySelectorAll( 'input, select, textarea' );
    var forms = document.querySelectorAll( '.form' );

    var toggleClass = '-has-error';
    var parentToggleClass = '-field-has-error';

    // If there are inputs.
    if ( inputs.length > 0 && forms.length > 0 ) {

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

    var toggleClass = '-has-text';

    // If there are email inputs on the page.
    if ( emailInputs.length > 0 ) {

      // Loop through email fields.
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
      } // for ( var i = 0; i < emailInputs.length; i++ )
    } // if ( emailInputs.length > 0 )

  } // monitorEmailInputs()


  //
  //  MONITOR SELECTS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function monitorSelectInputs() {

    // Get all select inputs.
    var selectInputs = document.querySelectorAll('select');

    var toggleClass = '-has-focus';

    var fieldWrapper;

    // If there are select inputs.
    if ( selectInputs.length > 0 ) {

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
      } // for ( var i = 0; i < selectInputs.length; i++ )
    } // if ( selectInputs.length > 0 )
  } // monitorSelectInputs()


  //
  //  HANDLE CONTACT FORM SUBMISSION
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleContactFormSubmission() {

    // Toggle classes.
    var sendingClass = '-is-sending';
    var sentClass = '-is-sent';
    var doneClass = '-is-done';
    var thanksClass = '-is-thankful';

    var sendingDelay = 1000;
    
    // Get contact form.
    var contactForm = document.querySelector('.form__contact');

    // If the contact form exists.
    if ( contactForm !== null && contactForm.length > 0 ) {

      // Listen for form submission event.
      contactForm.addEventListener('submit', function(e) {

        // Stop the form from submitting.
        e.preventDefault();

        // Get the form action.
        var form = this;
        var action = form.action;

        // Get form fields.
        var nameField = document.querySelector('.form__field-name');
        var emailField = document.querySelector('.form__field-email');
        var messageField = document.querySelector('.form__field-message');
        var buttonElem = document.querySelector('.form__field-message');

        // Get the form field values (name, email, message).
        var name = nameField.value;
        var email = emailField.value;
        var message = messageField.value;
        var button = buttonElem.value;

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

            // console.log('Success');

            setTimeout( function() {
              form.classList.add( sentClass );
            }, sendingDelay );

            setTimeout( function() {
              form.classList.add( doneClass );
            }, sendingDelay * 2 );

            setTimeout( function() {
              form.classList.add( thanksClass );

              // Empty fields.
              nameField.value = '';
              emailField.value = '';
              messageField.value = '';

              // Remove the -has-text class from email field.
              emailField.classList.remove('-has-text');

              // Reset the form.
              form.reset();

            }, sendingDelay * 3 );

          // If the server was contacted but submissions was unsuccessful.
          } else {
            // console.log('Server was reached but it returned an error');
          }
        };

        // Handle errors.
        request.onerror = function() {
          // console.log('There was a connection error of some sort.');
        };

        // Send the request.
        request.send();

      }); // contactForm.addEventListener('submit', function(e)
    } // if ( contactForm.length > 0 )
  } // handleContactFormSubmission()


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