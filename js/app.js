var store = null;

/**
 * Refreshes the items in the todo list.
 */
function refreshItems() {
    // Loading storage items.
    var items = store.getAllItems(true);
    if(items.length > 0) {
        // Wiping all demo items.
        $('#itemsList .list').html('');
        for(var key in items) {
            var item = items[key];
            $('#itemsList .list').append(
                '<li id="' + item.id + '"class="item">'
                    + '<button id="'+ item.id +'" class="btnDelItem"></button>'
                    + '<p>' + item.value + '</p>'
                    + '</li>');
        }
    } else {
       $('#itemsList .list').html(
                '<li class="item">'
              + '   <p>'
              + '     Press the <strong>+</strong> button to add a TODO item.'
              + '   </p>'
              + '</li>');
    }
}

$(document).ready(function() {
    // Do we have localstorage support? If not, forget it.
    try {
        store = new itemsStore();
    }
    catch(e) {
        if(e == "No localStorage support.") { 
            alert("Sorry but you can't use this app without local storage support." +
                  " Please use a compatible browser.");
        } else {
            alert("An error occured. Please contact the developer.");
            console.log(e);
        }
        return;
    }

    refreshItems();

    // The add button was clicked.
    $('#btnAdd').click(function(e) {
        $('#addItemFrame').showFrame();
    });

    // Hides the add item frame.
    $('#btnMain').click(function(e) {
        $('#addItemFrame').hideFrame();
    });

    // Adds a new item.
    $('#addItem').click(function(e) {
        var val = $('#newItem').val();
        if($('#newItem').val().trim() != "") {
            store.addItem($('#newItem').val());
            $('#newItem').val('');
            // Note that the items are refreshed while the form is shown.
            refreshItems();
            $('#addItemFrame').hide();
            $('#mainFrame').show();
        } else {
            showDialog("No TODO description entered.");
        }
    });

    // Deletes an item.
    $('.btnDelItem').live('click', function(e) {
        store.delItem($(this).attr('id'))
        refreshItems();
    });
});
