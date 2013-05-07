function closeOverlay(closefunc) {
    return function(e) {
        $('.overlay').hide();

        if(closefunc) {
            closefunc();
        }
    };
}

function overlayMsg(message, closefunc) {
    $('.overlay .message').html(message);
    $('.overlay').show();

    $('.overlay #closeoverlay').click(closeOverlay(closefunc));
}

