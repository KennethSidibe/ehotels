document.getElementById('nasInput').addEventListener('input', function (e) {
    var value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    var formatted = '';
    value = value.substring(0, 9);

    // Loop through the digits and add dashes as needed
    for (var i = 0; i < value.length; i++) {
        if (i === 3 || i === 6) {
            formatted += '-'; // Add dash before the 4th and 7th digit
        }
        formatted += value[i];
    }

    e.target.value = formatted; // Update the input with the formatted value
});

document.getElementById('postalCodeInput').addEventListener('input', function(e) {
    var value = e.target.value.toUpperCase(); // Convert to upper case for consistency
    value = value.replace(/[^A-Z0-9]/gi, ''); // Remove all non-alphanumeric characters

    // Remove excess characters beyond the 6 needed for the pattern
    value = value.substring(0, 6);

    var formatted = '';
    for (var i = 0; i < value.length; i++) {
        if (i === 3) {
            formatted += ' '; // Add a space before the fourth character
        }
        formatted += value[i];
    }

    e.target.value = formatted; // Update the input with the formatted value
});