
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    var $ = require('zepto');
    var ffos = require('./ffosbase');
    require('receiptverifier');
    require('./btninstall');
    itemsStore = require('./itemsstore');

    var store = null;
    var currentItem = null;

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
                        + '<p itemid="' + item.id + '">' + item.value + '</p>'
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
            ffos.showFrame('#addItemFrame');
        });

        // Hides the add item frame.
        $('#btnCancel').click(function(e) {
            ffos.hideFrame('#addItemFrame');
        });

        // Click on item (to display/edit it)
        $('.item p').live('click', function(e) {
            currentItem = $(this).attr('itemid');
            if(!currentItem) {
                return;
            }
            $(this).addClass('active');
            var that = $(this);
            setTimeout(function() { that.removeClass('active'); }, 400);
            var item = store.getItem(currentItem);
            $('#editItemField').val(item);
            ffos.rightFrame.show();
        });

        // Back to the main page.
        $('#btnMain').click(function(e) {
            ffos.rightFrame.hide();
        });

        // Save a modified item.
        $('#editItem').click(function(e) {
            var val = $('#editItemField').val();
            if(val.trim() != "") {
                store.setItem(currentItem, val);
                refreshItems();
                ffos.rightFrame.hide();
            } else {
                ffos.showDialog("Can't save without description.");
            }
        });

        // Deletes the current item.
        $('#delItem').click(function(e) {
            store.delItem(currentItem);
            refreshItems();
            ffos.rightFrame.hide();
        });

        // Adds a new item.
        $('#addItem').click(function(e) {
            var val = $('#newItem').val();
            if(val.trim() != "") {
                store.addItem(val);
                $('#newItem').val('');
                // Note that the items are refreshed while the form is shown.
                refreshItems();
                $('#addItemFrame').hideFrame();
            } else {
                ffos.showDialog("No TODO description entered.");
            }
        });

        // Deletes an item.
        $('.btnDelItem').live('click', function(e) {
            // It's a bit too easy to delete, so we show a dialog here.
            var dialog = new ffos.Dialog(
                "Are you sure that you want to delete this item?",
                ffos.Dialog.BUTTONS_YESNO
            );
            var that = this;
            dialog.show(function(button) {
                if(button == 'yes') {
                    store.delItem($(that).attr('id'))
                    refreshItems();
                }
            });
        });
    });
});

