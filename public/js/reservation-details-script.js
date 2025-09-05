let bgColorModify = "#fffef4";

$(document).ready(function () {
    // Hide input 
    $('#modifyBtn').click(() => {
        $('.hide').toggleClass('hide');
        $('#cancelBtn').addClass('hide');
        $('#modifyBtn').addClass('hide');
        $('.reservation-date-info').addClass('hide');
        $('#confirmModificationBtn').removeClass('hide');

        $('#reservationInfo').css("background-color", "#fffef4");
        $('#reservationInfo')[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })

    $("#arrivalDateInput").on("change keyup paste", function(){
        updateReservDetails()
    })
    $("#departureDateInput").on("change keyup paste", function(){
        updateReservDetails()
    })

    function calculateNewNumberNights() {
        let arrivalDate = new Date($("#arrivalDateInput").val());
        let departureDate = new Date($("#departureDateInput").val());
        
        // Calculate the difference in milliseconds
        const differenceInMilliseconds = departureDate - arrivalDate;

        // Convert milliseconds to days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        return differenceInDays;
    }


    function updateReservDetails() {
        let newNumberNights = calculateNewNumberNights();
        newNumberNights = ( (newNumberNights < 0 ? 1 : newNumberNights ) );
        let roomNightPrice = parseInt($("#roomNightPriceElem").text());
        let newReservPrice = newNumberNights * roomNightPrice;

        // Updating number of nights
        let nightString = ( (newNumberNights > 1) ? "Nuits" : "Nuit" );
        $("#numberOfNightsElem").text(`${newNumberNights + " " + nightString}`);
        $("#numberOfNightsElem2").text(`${newNumberNights + " " + nightString.toLowerCase()}`);

        // Updating total reservation price
        $("#reservPriceElem").text(`${newReservPrice}$`);
    }


});