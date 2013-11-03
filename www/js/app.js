// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    var $ = require('zepto');
    var ffos = require('./ffosbase');
    var Mustache = require('mustache');
    require('receiptverifier');
    require('https://login.persona.org/include.js');
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
            $('#itemsList .list .placeholder').hide();
            $('#itemsList .list .item').remove();
            for(var key in items) {
                var item = items[key];
                $('#itemsList .list').append(
                    Mustache.render($('#tpl-todo-item').html(), item)
                );
            }
        } else {
            $('#itemsList .list .item').remove();
            $('#itemsList .list .placeholder').show();
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

        // Setting up buttons...
        $('.signedin').hide();
        $('.signedout').show();

        // Persona
        navigator.id.watch({
            loggedInUser: null,
            onlogin: function(assertion) {
                $.ajax({
                    url: 'http://localhost:8000/login',
                    async: false,
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        assertion: assertion
                    },
                    success: function(data, status, xhr) {
                        $('#userEmail').html(data.email);
                        $('.signedin').show();
                        $('.signedout').hide();
                    },
                    error: function(xhr, errorType, error) {
                        alert("Sorry, couldn't log you in...");
                    }
                });
            },
            onlogout: function() {
                $.ajax({
                    url: 'http://localhost:8000/logout',
                    async: false,
                    dataType: 'json',
                    success: function(data, status, xhr) {
                        $('.signedin').hide();
                        $('.signedout').show();
                    },
                    error: function(data, status, xhr) {
                        alert("Something bad happened...");
                    }
                });
            }
        });
        $('#signIn').click(function(e) {
            e.preventDefault();
            navigator.id.request({
                siteName: "TODO app for Firefox"
            });
        });
        $('#signOut').click(function(e) {
            e.preventDefault();
            navigator.id.logout();
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

        // Display the sidebar.
        $('#btnSidebar').click(function(e) {
            if(ffos.sideBar.shown) {
                ffos.sideBar.hide();
            } else {
                ffos.sideBar.show();
            }
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

        // Check an item.
        $('.btnCheckItem').click(function(e) {
            var self = $(this);
            if(!self.hasClass('checked')) {
                self.addClass('checked');
            } else {
                self.removeClass('checked');
            }
       });
    });
});

