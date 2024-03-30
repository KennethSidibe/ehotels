
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

    function validateArrivalAndDepartureDate(arrivalDateString, departureDateString, 
        arrivalDateErrorId, departureDateErrorId, arrivalDateInputId, departureDateInputId) {
        const DATE_INVALID = "S'il te plait, entre une date.";
        const DATE_EXACT = "La date d'arrivée et de départ doit être différente";
        const STAY_INVALID = "La date de départ doit être après la date d'arrivée";
        const ARRIVAL_PAST_DATE_ERROR = "La date d'arrivée doit être doit dans le futur";
        const DEPARTURE_PAST_DATE_ERROR = "La date de départ doit être doit dans le futur";
        const DEPARTURE_DATE_CURRENT_DATE_ERROR = "La date de départ ne peut pas être aujourd'hui";

        // Current date at midnight for comparison
        const currentDate = new Date();

        // Reset error messages
        $('#' + arrivalDateErrorId).text('');
        $('#' + departureDateErrorId).text('');

        // arrival date has no value
        if(arrivalDateString.toLowerCase() === "yyyy-mm-dd" || arrivalDateString === "") {
            showError(arrivalDateErrorId, DATE_INVALID, arrivalDateInputId);
            return false;
        }

        // departure date has no value
        if(departureDateString.toLowerCase() === "yyyy-mm-dd" || departureDateString === "") {
            showError(departureDateErrorId, DATE_INVALID, departureDateErrorId);
            return false;
        }

        // Parse the provided date strings to Date objects
        const arrivalDate = new Date(arrivalDateString);
        const departureDate = new Date(departureDateString);

        // Adjust provided dates to midnight for fair comparison
        arrivalDate.setHours(24, 0, 0, 0);
        departureDate.setHours(24, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        // arrival and departure are exact
        if(arrivalDate.getDay() === departureDate.getDay() && arrivalDate.getMonth() === departureDate.getMonth() 
            && arrivalDate.getFullYear() === departureDate.getFullYear() ) {
            showError(arrivalDateErrorId, DATE_EXACT, DEPARTURE_DATE_INPUT_ID);
            return false;
        }

        // Arrival Date is before current date
        if(arrivalDate < currentDate) {
            showError(arrivalDateErrorId, ARRIVAL_PAST_DATE_ERROR, arrivalDateInputId);
            return false;
        }

        // Departure Date is before current date
        if(departureDate < currentDate) {
            showError(departureDateErrorId, DEPARTURE_PAST_DATE_ERROR, departureDateErrorId);
            return false;
        }

        // Departure date is before arrival Date
        if(departureDate < arrivalDate) {
            showError(arrivalDateErrorId, STAY_INVALID, arrivalDateErrorId);
            return false;
        }

        // departure date is exact to current date
        if(departureDate.getDay() === currentDate.getDay() && departureDate.getMonth() === currentDate.getMonth()
            && departureDate.getFullYear() === currentDate.getFullYear()) {
            showError(departureDateErrorId, DEPARTURE_DATE_CURRENT_DATE_ERROR, departureDateInputId);
            return false;
        }

        hideError(arrivalDateErrorId);
        hideError(departureDateErrorId);
        // If all validations pass
        console.log("Validation passed. Dates are valid.");
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

    function validateRoomPrice(roomPrice, roomPriceErrorMsg, roomPriceErrorId, roomPriceInputId) {
        if(parseInt(roomPrice) === 'NaN' || roomPrice <= 0) {
            showError(roomPriceErrorId, roomPriceErrorMsg, roomPriceInputId);
            return false;
        }
        hideError(roomPriceErrorId);
        return true;
    }
    
    $('#submitFormBtn').click(function() {
        $('#bookRoomForm').submit();
    });

    $('#bookRoomForm').submit(function(event) {
        
        let formArrivalDate = $('#' + ARRIVAL_DATE_INPUT_ID).val();
        let formDepartureDate = $('#' + DEPARTURE_DATE_INPUT_ID).val();
        let formFirstName = $('#'+ FIRST_NAME_INPUT_ID).val();
        let formLastName = $('#'+ LAST_NAME_INPUT_ID).val();
        let formEmail = $('#'+ EMAIL_INPUT_ID).val();
        let formPwd = $('#'+ PWD_INPUT_ID).val();
        let formPhone = $('#'+ PHONE_NUMBER_INPUT_ID).val();
        let formStreetName = $('#'+ STREET_NAME_INPUT_ID).val();
        let formCity = $('#'+ CITY_INPUT_ID).val();
        let formCountry = $('#'+ COUNTRY_INPUT_ID).val();
        let formZip = $('#'+ ZIP_CODE_INPUT_ID).val();
        let formRoomPrice = $('#' + ROOM_PRICE_INPUT_ID).val();
    
        // validate the form
        let stayDatesValid = validateArrivalAndDepartureDate(formArrivalDate, formDepartureDate, ARRIVAL_DATE_ERROR_ID, 
                                DEPARTURE_DATE_ERROR_ID, ARRIVAL_DATE_INPUT_ID, ARRIVAL_DATE_ERROR_ID);

        let roomPriceValid = validateRoomPrice(formRoomPrice, ROOM_PRICE_REQUIRED, ROOM_PRICE_ERROR_ID, ROOM_PRICE_INPUT_ID);
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
        if (stayDatesValid && roomPriceValid && firstNameValid 
            && lastNameValid && emailValid && pwdValid && phoneValid 
            && streetNameValid && countryValid && cityValid && zipValid) {
        } else {
            event.preventDefault();
            $('#bookRoomForm')[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    const ROOM_PRICE_REQUIRED = "S'il te plaît, choisi une chambre."
    const FIRST_NAME_REQUIRED = "S'il te plaît, Entre ton prénom";
    const LAST_NAME_REQUIRED = "S'ilte plaît, Entre ton nom";
    const EMAIL_REQUIRED = "S'il te plaît, entre ton email";
    const EMAIL_INVALID = "S'il te plaît, entre une addresse e-mail correcte";
    const PWD_INVALID = "S'il te plaît, entre mot de passe sécurisé (nombres, longueur min 6 et un caractère spécial inclus)";
    const PHONE_NUMBER_REQUIRED = "S'il te plaît, entre ton numéro de téléphone";
    const PHONE_INVALID = "S'il te plaît, entre un numéro de téléphone valide";
    const STREET_INVALID = "S'il te plaît, entre ta rue";
    const CITY_INVALID = "S'il te plaît, entre ta ville";
    const COUNTRY_INVALID = "S'il te plaît, entre ton pays";
    const ZIP_INVALID = "S'il te plaît, entre ton code postale";
    
    const ARRIVAL_DATE_ERROR_ID = 'arrivalDateError';
    const ROOM_PRICE_ERROR_ID = 'roomError';
    const DEPARTURE_DATE_ERROR_ID = 'departureDateError';
    const FIRST_NAME_ERROR_ID = 'firstNameError';
    const LAST_NAME_ERROR_ID = 'lastNameError';
    const EMAIL_ERROR_ID = 'emailError';
    const PWD_ERROR_ID = 'pwdError';
    const PHONE_NUMBER_ERROR_ID = 'phoneNumberError';
    const STREET_NAME_ERROR_ID = 'streetNameError';
    const CITY_ERROR_ID = 'cityError';
    const COUNTRY_ERROR_ID = 'countryError';
    const ZIP_CODE_ERROR_ID = 'zipCodeError';
    
    const ARRIVAL_DATE_INPUT_ID = 'arrivalDateInput';
    const ROOM_PRICE_INPUT_ID = 'roomPriceInput'
    const DEPARTURE_DATE_INPUT_ID = 'departureDateInput';
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
