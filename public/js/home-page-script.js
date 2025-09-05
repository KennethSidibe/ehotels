$(document).ready(function () {
    let getParams = new URLSearchParams(window.location.search);
    if(getParams.has('successful')) {
        $('#thanks-container').removeClass('hide');
    } else {
        $('#thanks-container').addClass('hide');
    }
});

