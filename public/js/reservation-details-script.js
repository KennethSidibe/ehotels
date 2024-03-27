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
});