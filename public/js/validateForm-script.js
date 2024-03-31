
$(document).ready(function() {
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
    function validateCountry(country, countryErrorMsg, countryErrorId, countryInputId) {
        if(country.toLowerCase() === 'pays') {
            $('#'+countryErrorId).removeClass('hide');
            $('#'+countryErrorId).text(countryErrorMsg);
            return false;
        }
        $('#'+countryErrorId).removeClass('hide');
        $('#'+countryErrorId).addClass('hide');
        return true;

    }
    
    function validatePhoneNumber(phoneNumber, phoneNoValErrorMsg, phoneInvalidErrorMsg, PhoneErrorId, PhoneInputId) {
        // This regular expression matches only strings of digits
        if(!hasValue(phoneNumber, phoneNoValErrorMsg, PhoneErrorId, PhoneInputId)) {
            return false;
        }
        const regex = /^[0-9\-\(\) \+]+$/;
        let isPhoneValid = regex.test(phoneNumber);
        if(!isPhoneValid) {
            showError(PhoneErrorId, phoneInvalidErrorMsg, PhoneInputId);
            return false;
        }
        hideError(PhoneErrorId);
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
        $('#bookRoomForm').submit();
    });

    $('#bookRoomForm').submit(function(event) {
        
        let formFirstName = $('#'+ FIRST_NAME_INPUT_ID).val();
        let formLastName = $('#'+ LAST_NAME_INPUT_ID).val();
        let formEmail = $('#'+ EMAIL_INPUT_ID).val();
        let formPwd = $('#'+ PWD_INPUT_ID).val();
        // to get phone number
        const phoneInput = document.querySelector('#' + PHONE_NUMBER_INPUT_ID);
        const iti = intlTelInput(phoneInput);
        let formPhone = iti.getNumber();
        // to get phone number
        let formStreetName = $('#'+ STREET_NAME_INPUT_ID).val();
        let formCity = $('#'+ CITY_INPUT_ID).val();
        let formCountry = $('#'+ COUNTRY_INPUT_ID).val();
        let formZip = $('#'+ ZIP_CODE_INPUT_ID).val();
    
        // validate the form
        let firstNameValid = hasValue(formFirstName, FIRST_NAME_REQUIRED, FIRST_NAME_ERROR_ID, FIRST_NAME_INPUT_ID);
        let lastNameValid = hasValue(formLastName, LAST_NAME_REQUIRED, LAST_NAME_ERROR_ID, LAST_NAME_INPUT_ID);
        let emailValid = validateEmail(formEmail, EMAIL_REQUIRED, EMAIL_INVALID, EMAIL_ERROR_ID, EMAIL_INPUT_ID);
        let pwdValid = validatePassword(formPwd, PWD_INVALID, PWD_ERROR_ID, PWD_INPUT_ID);
        let phoneValid = validatePhoneNumber(formPhone, PHONE_NUMBER_REQUIRED, PHONE_INVALID, PHONE_NUMBER_ERROR_ID, PHONE_NUMBER_INPUT_ID)
        let streetNameValid = hasValue(formStreetName, STREET_INVALID, STREET_NAME_ERROR_ID, STREET_NAME_INPUT_ID);
        let cityValid = hasValue(formCity, CITY_INVALID, CITY_ERROR_ID, CITY_INPUT_ID);
        let zipValid = hasValue(formZip, ZIP_INVALID, ZIP_CODE_ERROR_ID, ZIP_CODE_INPUT_ID);
        let countryValid = validateCountry(formCountry, COUNTRY_INVALID, COUNTRY_ERROR_ID, COUNTRY_INPUT_ID);
    
        // if valid, submit the form.
        if (firstNameValid && lastNameValid && emailValid && pwdValid && phoneValid && streetNameValid && countryValid && cityValid && zipValid) {
            console.log("form data valid, submitting");
        } else {
            event.preventDefault();
            $('#bookRoomForm')[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    const FIRST_NAME_REQUIRED = "S'il-te-plaît, Entre ton prénom";
    const LAST_NAME_REQUIRED = "S'il-te-plaît, Entre ton nom";
    const EMAIL_REQUIRED = "S'il-te-plaît, entre ton email";
    const EMAIL_INVALID = "S'il-te-plaît, entre une addresse e-mail correcte";
    const PWD_INVALID = "S'il-te-plaît, entre mot de passe sécurisé (nombres, longueur min 6 et un caractère spécial inclus)";
    const PHONE_NUMBER_REQUIRED = "S'il-te-plaît, entre ton numéro de téléphone";
    const PHONE_INVALID = "S'il-te-plaît, entre un numéro de téléphone valide";
    const STREET_INVALID = "S'il-te-plaît, entre ta rue";
    const CITY_INVALID = "S'il-te-plaît, entre ta ville";
    const COUNTRY_INVALID = "S'il-te-plaît, entre ton pays";
    const ZIP_INVALID = "S'il-te-plaît, entre ton code postale";
    
    const FIRST_NAME_ERROR_ID = 'firstNameError';
    const LAST_NAME_ERROR_ID = 'lastNameError';
    const EMAIL_ERROR_ID = 'emailError';
    const PWD_ERROR_ID = 'pwdError';
    const PHONE_NUMBER_ERROR_ID = 'phoneNumberError';
    const STREET_NAME_ERROR_ID = 'streetNameError';
    const CITY_ERROR_ID = 'cityError';
    const COUNTRY_ERROR_ID = 'countryError';
    const ZIP_CODE_ERROR_ID = 'zipCodeError';
    
    const FIRST_NAME_INPUT_ID = 'firstNameInput';
    const LAST_NAME_INPUT_ID = 'lastNameInput';
    const EMAIL_INPUT_ID = 'emailInput';
    const PWD_INPUT_ID = 'pwdInput';
    const PHONE_NUMBER_INPUT_ID = "phone";
    const STREET_NAME_INPUT_ID = 'streetNameInput';
    const CITY_INPUT_ID = 'cityInput';
    const COUNTRY_INPUT_ID = 'countryInput';
    const ZIP_CODE_INPUT_ID = 'zipCodeInput';
});
