$(document).ready(() => {

    // ----------------- CARDS Animations -------------------


    // This variable prevents that when the card is first clicked
    // that the card add the class clicked and removes it in the 
    // next line
    let noFirstClick = false;
    let enabledCardPrice = 0;      
    function cardHoverEffect() {
        let $this = $(this);
        $(this).children('.icon-container').toggleClass('hide');

        // when the card has not been clicked 
        if(!$(this).hasClass('clicked')) {
            $(this).removeClass('not-clicked');
            $(this).addClass('clicked');
            disableOtherCards($this);
        }

        // when the card was in a clicked state
        // We remove the clicked state and enter a fades out state
        // the border is removed momentarily with the hover effect
        // And added after a 500 milliseconds delays
        if($(this).hasClass('clicked') && noFirstClick) {
            $(this).removeClass('clicked');
            $(this).addClass('fades-out');
            enableOtherCards($this);
            
            setTimeout(function(){
                $this.addClass('not-clicked');
                $this.removeClass('fades-out');
                // It's not the first click so we reset it's value
                // Only God knows why it must be false now 
                noFirstClick = false;
            }, 500);
        }

        // If the first click happened we inverts the value of the no first click
        // The inverts is IMPORTANT 
        // Only God knows why 
        noFirstClick = !noFirstClick;
    }

    // Adds card hover effect to all cards
    $('.card').click(cardHoverEffect);

    function disableOtherCards(cardClicked) {
        let priceString = $(cardClicked).find('.price-digit').text();
        enabledCardPrice = parseInt(priceString);
        //set the price of the hidden input
        $('#roomPriceInput').val(enabledCardPrice);

        $('.card-room').not(cardClicked).each(function() {
            $(this).addClass('disabled');
            $(this).removeClass('not-clicked');
            $(this).off('click');
            $(this).find('.card-title').addClass('disabled');
            $(this).find('.price').addClass('disabled');
        });
    }

    function enableOtherCards(cardClicked) {
        enabledCardPrice = 0;
        //set the price of the hidden input
        $('#roomPriceInput').val(enabledCardPrice);

        $('.card-room').not(cardClicked).each(function() {
            $(this).removeClass('disabled');
           $(this).addClass('not-clicked');
           $(this).click(cardHoverEffect);
           $(this).find('.card-title').removeClass('disabled');
           $(this).find('.price').removeClass('disabled');
           noFirstClick = false;
        });
    }
    function disableAllCards() {
        $('.card-room').each(function() {
           $(this).addClass('disabled');
           $(this).removeClass('not-clicked');
           $(this).off('click');
           $(this).find('.card-title').addClass('disabled');
           $(this).find('.price').addClass('disabled');
           
        });
    }
    function enableAllCards() {
        $('.card-room').each(function() {
           $(this).removeClass('disabled');
           $(this).addClass('not-clicked');
           $(this).click(cardHoverEffect);
           $(this).find('.card-title').removeClass('disabled');
           $(this).find('.price').removeClass('disabled');
           noFirstClick = false;
        });
    }

    // ----------------- CARDS Animations -------------------
    
    
    // ----------------- Current date for arrival Date Picker -------------------

    var currentDate = new Date().toISOString().split('T')[0];
    $('#arrivalDateInput')[0].value = currentDate;

    // ----------------- Current date for arrival Date Picker -------------------
    
});