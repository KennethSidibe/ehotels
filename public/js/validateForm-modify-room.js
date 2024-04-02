
$(document).ready(function() {
    
    function validatenumberInput(number, numberErrorMsg, numberInputErrorId, numberInputId) {
        
        if(parseInt(number) === 'NaN') {
            showError(numberInputErrorId, "S'il-te-plaît, Entre un nombre", numberInputId);
            return false;
        }
        
        if(number <= 0) {
            showError(numberInputErrorId, numberErrorMsg, numberInputId);
            return false;
        }

        hideError(numberInputErrorId);
        return true;
    }

    function validateSelectInput(selectInput, selectInputId, selectInputErrorId, selectInputErrorMsg) {
        let selectElement = document.getElementById(selectInputId);
        let isInputExactToOneSelected = false;
        $('#' + selectInputId + ' option').each(function() {
            if(selectInput.toLowerCase() === $(this).val().toLowerCase()) {
                isInputExactToOneSelected = true;
            }
        });
        if(!isInputExactToOneSelected) {
            showError(selectInputErrorId, selectInputErrorMsg, selectInputId);
            return false;
        }
        hideError(selectInputErrorId);
        return true;
         
    }

    function validateRequiredSelectedInput(selectInput, selectInputInputId, selectInputErrorId, selectInputErrorMsg) {
        const noValueRequiredString = 'no-value';
        let isInputExactToOneSelected = false;
        $('#' + selectInputInputId + ' option').each(function() {
            if(selectInput.toLowerCase() === $(this).val().toLowerCase()) {
                isInputExactToOneSelected = true;
            }
        });
        if(selectInput.toLowerCase() === noValueRequiredString){
            isInputExactToOneSelected = false;
        }
        if(!isInputExactToOneSelected) {
            showError(selectInputErrorId, selectInputErrorMsg, selectInputInputId);
            return false;
        }
        hideError(selectInputErrorId);
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

    $('#modifyRoomForm').submit(function(event) {
        
        event.preventDefault();

        let formRoomName = $('#'+ ROOM_NAME_INPUT_ID).val();
        let formRoomPrice = $('#'+ ROOM_PRICE_INPUT_ID).val();
        let formNumberOfRooms = $('#'+ NUMBER_OF_ROOMS_INPUT_ID).val();
        let formRoomType = $('#'+ ROOM_TYPE_INPUT_ID).val();
        let formRoomCapacity = $('#'+ ROOM_CAPACITY_INPUT_ID).val();
        let formRoomCommodity = $('#'+ ROOM_COMMODITY_INPUT_ID).val();
        let formRoomView = $('#'+ ROOM_VIEW_INPUT_ID).val();
        let formRoomExtension = $('#'+ ROOM_EXTENSION_INPUT_ID).val();
        
    
        // validate the form
        let roomNameValid = hasValue(formRoomName, ROOM_NAME_REQUIRED, ROOM_NAME_ERROR_ID, ROOM_NAME_INPUT_ID);
        let roomPriceValid = validatenumberInput(formRoomPrice, ROOM_PRICE_REQUIRED, ROOM_PRICE_ERROR_ID, ROOM_PRICE_INPUT_ID);
        let numbersOfRoomsValid = validatenumberInput(formNumberOfRooms, NUMBER_OF_ROOMS_REQUIRED, NUMBER_OF_ROOMS_ERROR_ID, NUMBER_OF_ROOMS_INPUT_ID);
        let roomTypeValid = validateRequiredSelectedInput(formRoomType, ROOM_TYPE_INPUT_ID, ROOM_TYPE_ERROR_ID, ROOM_TYPE_REQUIRED);
        let roomCapacityValid = validateRequiredSelectedInput(formRoomCapacity, ROOM_CAPACITY_INPUT_ID, ROOM_CAPACITY_ERROR_ID, ROOM_CAPACITY_REQUIRED);
        let roomCommodityValid = validateSelectInput(formRoomCommodity, ROOM_COMMODITY_INPUT_ID, ROOM_COMMODITY_ERROR_ID, SELECT_ERROR_REQUIRED);
        let roomViewValid = validateSelectInput(formRoomView, ROOM_VIEW_INPUT_ID, ROOM_VIEW_ERROR_ID, SELECT_ERROR_REQUIRED);
        let roomExtensionValid = validateSelectInput(formRoomExtension, ROOM_EXTENSION_INPUT_ID, ROOM_EXTENSION_ERROR_ID, SELECT_ERROR_REQUIRED);
        
        // if valid, submit the form.
        if (roomNameValid && roomPriceValid && numbersOfRoomsValid && roomTypeValid && roomCapacityValid && roomCommodityValid && roomViewValid && roomExtensionValid) {
            alert('form valid');
            this.submit();
        } else {
            event.preventDefault();
            $('#modifyRoomForm')[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    const ROOM_NAME_REQUIRED = "S'il-te-plaît, Entre le nom de la chambre";
    const ROOM_PRICE_REQUIRED = "S'il-te-plaît, Entre un prix";
    const ROOM_TYPE_REQUIRED = "S'il-te-plaît, choisi un type de chambre";
    const ROOM_CAPACITY_REQUIRED = "S'il-te-plaît, choisi une capacité";
    const SELECT_ERROR_REQUIRED = "S'il-te-plaît, choisi une option valide";
    const NUMBER_OF_ROOMS_REQUIRED = "S'il-te-plaît, entre le nombre de chambres";
    
    const ROOM_NAME_ERROR_ID = 'roomNameError';
    const ROOM_PRICE_ERROR_ID = 'roomPriceError';
    const ROOM_TYPE_ERROR_ID = 'roomTypeError';
    const ROOM_CAPACITY_ERROR_ID = 'roomCapacityError';
    const ROOM_COMMODITY_ERROR_ID = 'roomCommodityError';
    const ROOM_VIEW_ERROR_ID = 'roomViewError';
    const ROOM_EXTENSION_ERROR_ID = 'roomExtensionError';
    const NUMBER_OF_ROOMS_ERROR_ID = 'numberOfRoomsError';
    
    const ROOM_NAME_INPUT_ID = 'roomNameInput';
    const ROOM_PRICE_INPUT_ID = 'roomPriceInput';
    const ROOM_TYPE_INPUT_ID = 'roomTypeInput';
    const ROOM_CAPACITY_INPUT_ID = 'roomCapacityInput';
    const ROOM_COMMODITY_INPUT_ID = 'roomCommodityInput';
    const ROOM_VIEW_INPUT_ID = 'roomViewInput';
    const ROOM_EXTENSION_INPUT_ID = 'roomExtensionInput';

    const NUMBER_OF_ROOMS_INPUT_ID = 'numberOfRoomsInput';

});
