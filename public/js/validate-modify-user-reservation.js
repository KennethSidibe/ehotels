
$(document).ready(function() {
    
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
    
    $('#confirmModificationBtn').click(function() {
        $('#updateUserReservForm').submit();
    });

    $('#updateUserReservForm').submit(function(event) {
        
        let formArrivalDate = $('#' + ARRIVAL_DATE_INPUT_ID).val();
        let formDepartureDate = $('#' + DEPARTURE_DATE_INPUT_ID).val();
    
        // validate the form
        let stayDatesValid = validateArrivalAndDepartureDate(formArrivalDate, formDepartureDate, ARRIVAL_DATE_ERROR_ID, 
            DEPARTURE_DATE_ERROR_ID, ARRIVAL_DATE_INPUT_ID, ARRIVAL_DATE_ERROR_ID);
    
        // if valid, submit the form.
        if (stayDatesValid) {
            alert("form data valid, submitting");
        } else {
            event.preventDefault();
            $('#updateUserReservForm')[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    const ARRIVAL_DATE_ERROR_ID = 'arrivalDateError';
    const DEPARTURE_DATE_ERROR_ID = 'departureDateError';
    
    const ARRIVAL_DATE_INPUT_ID = 'arrivalDateInput';
    const DEPARTURE_DATE_INPUT_ID = 'departureDateInput';
});
