// Nothing yet

/**
 * Just testing for localstorage support.
 */
function has_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

$(document).ready(function() {
    // Do we have localstorage support? If not, forget it.
    if(!has_storage()) {
        alert("Sorry but you can't use this app without local storage support." +
              " Please use a compatible browser.");
    }

    // Wiping all demo items.
    $('#itemsList .list').html('');
    // Loading storage items.
    for(var key in localStorage) {
        $('#itemsList .list').append('<li id="' + key + '"class="item"><p>'
                                     + localStorage.getItem(key)
                                     + '</p></li>');
    }

    // An item was clicked.
    $('#itemsList .item').live('click', function(e) {
        console.log("Item '"+$(this).attr('id')+"' was clicked.");
    });

    // The add button was clicked.
    $('#btnAdd').click(function(e) {
        
    });
});
