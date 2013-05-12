function closeDialog(closefunc) {
    return function(e) {
        $('.dialog').hideFrame();

        if(closefunc) {
            closefunc();
        }
    };
}

function showRight() {
    $('body').removeClass('hideRight');
    $('body').addClass('showRight');
}

function hideRight() {
    $('body').removeClass('showRight');
    $('body').addClass('hideRight');
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

