$(document).ready(function () {
    let getParams = new URLSearchParams(window.location.search);
    console.log(`Get Params: ${JSON.stringify(getParams.entries(), null, 2)}`);
    if(getParams.has('successful')) {
        $('#thanks-container').removeClass('hide');
    } else {
        $('#thanks-container').addClass('hide');
    }
});

