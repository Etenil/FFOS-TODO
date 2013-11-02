define(function(require) {
    var PouchDB = require('pouchdb');
    
    return function() {
        this.db = new PouchDB('todos');
        this.remoteCouch = false;

        this.addItem = function(content) {
            var todo = {
                '_id': new Date().toISOString(),
                'content': content,
            }
            this.db.put(todo, function(err, result) {
                if(err) {
                    console.log("The item failed to save.");
                }
            });
        };

        this.getAllItems = function(descending, callback) {
            var items = [];
            this.db.allDocs(
                {include_docs: true, descending: true},
                function(err, doc) {
                    if(!err) {
                        items = doc.rows;
                    }
                }
            );

            return items;
        };
    };
});
