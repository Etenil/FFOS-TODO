function closeDialog(closefunc) {
    return function(e) {
        $('.dialog').hideFrame();

        if(closefunc) {
            closefunc();
        }
    };
}

(function($) {
    $.extend($.fn, {
        showFrame: function() {
            $(this).addClass('show');
            $(this).removeClass('hide');
        },
        hideFrame: function() {
            $(this).removeClass('show');
            $(this).addClass('hide');
        }
    });
})(Zepto);

function showDialog(message, closefunc) {
    $('.dialog .message').html(message);

    $('.dialog').showFrame();

    $('.dialog button.close').click(closeDialog(closefunc));
}

