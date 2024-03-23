let old = $('.card').get(0);
$('.card').click(function(){
  if(old!=null && $(old).hasClass('open')){
    $(old).toggleClass('open');
    $(old).find('.info').addClass('mt-3');
  }
   $(this).toggleClass('open');
   $(this).find('.info').toggleClass('mt-3');
   old = this;

})