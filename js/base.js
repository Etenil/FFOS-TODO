function closeOverlay(closefunc) {
    return function(e) {
        $('.overlay').hideFrame();

        if(closefunc) {
            closefunc();
        }
    };
}

(function($) {
    $.extend($.fn, {
        showFrame: function() {
            $(this).addClass('show');
        },
        hideFrame: function() {
            $(this).removeClass('show');
        }
    });
})(Zepto);

function overlayMsg(message, closefunc) {
    $('.overlay .message').html(message);

    $('.overlay').showFrame();

    $('.overlay #closeoverlay').click(closeOverlay(closefunc));
}

