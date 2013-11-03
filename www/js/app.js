// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    var $ = require('zepto');
    var ffos = require('./ffosbase');
    var Mustache = require('mustache');
    require('receiptverifier');
    require('./btninstall');
    localItemsStore = require('./localitemsstore');
    itemsStore = require('./itemsstore');

    var localstore = null;
    var store = null;
    var currentItem = null;

    /**
     * Refreshes the items in the todo list.
     */
    function refreshItems() {
        // Loading storage items.
        store.getAllItems(true, function(err, doc) {
            if(!err && doc.rows.length > 0) {
                var items = doc.rows;
                // Wiping all demo items.
                $('#itemsList .list .spinner').hide();
                $('#itemsList .list .placeholder').hide();
                $('#itemsList .list .item').remove();
                for(var key in items) {
                    var item = items[key];
                    $('#itemsList .list').append(
                        Mustache.render($('#tpl-todo-item').html(), item.doc)
                    );
                }
            } else {
                $('#itemsList .list .item').remove();
                $('#itemsList .list .spinner').hide();
                $('#itemsList .list .placeholder').show();
            }
        });
    }

    $(document).ready(function() {
        // Do we have localstorage support? If not, forget it.
        try {
            localstore = new localItemsStore();
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
        // OK, now the new store.
        try {
            store = new itemsStore();
        }
        catch(e) {
            alert("An error occured. Please contact the developer.");
            console.log(e);
            return;
        }

        // Do we need to upgrade?
        items = localstore.getAllItems();
        if(items.length > 0) {
            // Migrating...
            for(var key in items) {
                if(items[key].id != "_pouch_todos") {
                    var item = {
                        content: items[key].value,
                    };
                    store.addItem(item);
                    localstore.delItem(items[key].id);
                }
            }
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

        // Click on item (to display/edit it)
        $('.item p').live('click', function(e) {
            var self = $(this);
            var li = self.closest('li');
            currentItem = {
                _id: self.attr('itemid'),
                _rev: self.attr('itemrev')
            };
            li.addClass('active');
            setTimeout(function() { li.removeClass('active'); }, 400);
            store.getItem(currentItem._id, function(err, item) {
                if(err) {
                    alert("Couldn't retrieve item.");
                } else {
                    currentItem = item;
                    $('#editItemField').val(item.content);
                    ffos.rightFrame.show();
                }
            });
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
            var item = currentItem;
            item.content = $('#editItemField').val();

            if(item.content.trim() != "") {
                store.setItem(item, function(err, response) {
                    refreshItems();
                    ffos.rightFrame.hide();
                });
            } else {
                ffos.showDialog("Can't save without description.");
            }
        });

        // Deletes the current item.
        $('#delItem').click(function(e) {
            store.delItem(currentItem._id, currentItem._rev, function(err, response) {
                if(err) {
                    console.log(err);
                    return;
                }
                refreshItems();
                ffos.rightFrame.hide();
            });
        });

        // Adds a new item.
        $('#addItem').click(function(e) {
            var item = {
                content: $('#newItem').val(),
            };
            if(item.content.trim() != "") {
                store.addItem(item, function(err, result) {
                    if(err) {
                        console.log("The item failed to save.");
                    } else {
                        $('#newItem').val('');
                        // Note that the items are refreshed while the form is shown.
                        refreshItems();
                        $('#addItemFrame').hideFrame();
                    }
                });
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
            var self = $(this);
            dialog.show(function(button) {
                if(button == 'yes') {
                    store.delItem(
                        self.attr('itemid'),
                        self.attr('itemrev'),
                        function(err, response) {
                            if(err) {
                                console.log(err);
                                return;
                            }
                            refreshItems();
                    });
                }
            });
        });

        // Check an item.
        $('.btnCheckItem').live('click', function(e) {
            var self = $(this);
            var id = self.attr('itemid');

            store.getItem(id, function(err, item) {
                if(err) {
                    alert("Couldn't change the item.");
                    return;
                }

                item.checked = !self.hasClass('checked');

                store.setItem(item, function(err, response) {
                    if(item.checked) {
                        self.addClass('checked');
                    } else {
                        self.removeClass('checked');
                    }
                });
            });
       });
    });
});

