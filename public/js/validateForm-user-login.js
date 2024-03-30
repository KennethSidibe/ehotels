
$(document).ready(function() {

    // Print a message if login was unsuccessful
    function checkforLoginError() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const getParams = Object.fromEntries(urlSearchParams.entries());
        console.log(`Get Params: ${JSON.stringify(getParams, null, 2)}`);
        if('unsuccessful' in getParams) {
            showError(EMAIL_ERROR_ID, INVALID_CREDENTIALS, EMAIL_INPUT_ID)
        } else {
            hideError(EMAIL_ERROR_ID);            
        }
    }
    

    function validateEmail(email, requiredMsg, invalidMsg, emailErrorId, emailInputId) {
        // check if the value is not empty
        if (!hasValue(email, requiredMsg, emailErrorId, emailInputId)) {
            return false;
        }
        // validate email format
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        const emailTrimmed = email.trim();
        if (!emailRegex.test(emailTrimmed)) {
            showError(emailErrorId, invalidMsg, emailInputId);
            return false;
        }
        hideError(emailErrorId);
        return true;
    }
    
    function validatePassword(password, pwdErrorMsg, pwdErrorId, pwdInputId) {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigits = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        const isValidLength = password.length >= minLength;
        const isValidPassword = hasUpperCase && hasLowerCase && hasDigits && hasSpecialChar && isValidLength;
    
        if(isValidPassword == false) {
            showError(pwdErrorId, pwdErrorMsg, pwdInputId);
            $('#'+pwdInputId).val('');
            return false;
        }
        hideError(pwdErrorId);
        return true;
    }


    
    function hasValue(input, errorMessage, errorElementId, inputId) {
        if (input.trim() === "") {
            showError(errorElementId, errorMessage, inputId);
            return false;
        }
        hideError(errorElementId);
        return true;
    }
    
    function showError(errorElementId, errorMessage, inputId) {
        let element = $('#'+errorElementId);
        element.removeClass('hide');
        element.text(errorMessage);
    }
    function hideError(inputErrorId) {
        let element = $('#'+inputErrorId);
        element.addClass('hide');
        element.text('');
    }
    
    $('#submitFormBtn').click(function() {
        $('#loginUserForm').submit();
    });

    $('#loginUserForm').submit(function(event) {
        
        let formEmail = $('#'+ EMAIL_INPUT_ID).val();
        let formPwd = $('#'+ PWD_INPUT_ID).val();
    
        // validate the form
        let emailValid = validateEmail(formEmail, EMAIL_REQUIRED, EMAIL_INVALID, EMAIL_ERROR_ID, EMAIL_INPUT_ID);
        let pwdValid = hasValue(formPwd, PWD_INVALID, PWD_ERROR_ID, PWD_INPUT_ID);
    
        // if valid, submit the form.
        if (emailValid && pwdValid) {
        } else {
            event.preventDefault();
        }
    });
    
    const EMAIL_REQUIRED = "S'il-te-plaît, entre ton email";
    const EMAIL_INVALID = "S'il-te-plaît, entre une addresse e-mail correcte";
    const PWD_INVALID = "S'il-te-plaît, entre un mot de passe";
    const INVALID_CREDENTIALS = "Données de connexion invalide";
    
    const EMAIL_ERROR_ID = 'emailError';
    const PWD_ERROR_ID = 'pwdError';
    
    const EMAIL_INPUT_ID = 'emailInput';
    const PWD_INPUT_ID = 'pwdInput';

    checkforLoginError();
});
