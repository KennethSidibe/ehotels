$(document).ready(function () {
    var countryName = 'Canada'; // The country name you have
    $('#country').filter(function() {
        return $(this).text() === countryName;
    }).prop('selected', true);
});