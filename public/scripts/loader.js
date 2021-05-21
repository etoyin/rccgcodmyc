$(document).ready(function(){
    $('#loader').css("cursor","pointer");
    $('#loader').animate({width: "20%", height: "20%"}, 'slow');

    setInterval(function() {
        $('#loader').animate({width: "5%"}, 'slow');
    }, 1000 );
    
    setInterval(function() {
        $('#loader').animate({width: "20%", height: "20%"}, 'slow');
    }, 1000 );
})