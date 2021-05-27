$(document).ready(function(){
    $('#loader').css("cursor","pointer");
    $('#loader').animate({width: "15%", height: "15%"}, 'slow');

    setInterval(function() {
        $('#loader').animate({width: "5%"}, 'slow');
    }, 1000 );
    
    setInterval(function() {
        $('#loader').animate({width: "15%", height: "15%"}, 'slow');
    }, 1000 );
})