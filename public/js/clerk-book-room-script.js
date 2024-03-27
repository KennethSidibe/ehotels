$(document).ready(() => {

    // ----------------- CARDS Animations -------------------

    // This variable prevents that when the card is first clicked
    // that the card add the class clicked and removes it in the 
    // next line
    let noFirstClick = false;
    $('.card').click(function() {
        let $this = $(this);
        $(this).children('.icon-container').toggleClass('hide');

        // when the card has not been clicked 
        if(!$(this).hasClass('clicked')) {
            $(this).removeClass('not-clicked');
            $(this).addClass('clicked');
        }

        // when the card was in a clicked state
        // We remove the clicked state and enter a fades out state
        // the border is removed momentarily with the hover effect
        // And added after a 500 milliseconds delays
        if($(this).hasClass('clicked') && noFirstClick) {
            $(this).removeClass('clicked');
            $(this).addClass('fades-out');
            
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
    });

    // ----------------- CARDS Animations -------------------
    
    
    // ----------------- Current date for arrival Date Picker -------------------

    var currentDate = new Date().toISOString().split('T')[0];
    $('#arrival-date')[0].value = currentDate;
    
});