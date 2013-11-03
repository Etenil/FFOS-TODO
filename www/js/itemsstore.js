define(function(require) {
    require('pouchdb');
    
    return function() {
        this.db = new PouchDB('todos');
        this.remoteCouch = false;

        this.addItem = function(content, callback) {
            var todo = {
                '_id': new Date().toISOString(),
                'content': content,
            }
            this.db.put(todo, callback);
        };

        this.getAllItems = function(descending, callback) {
            var items = [];
            this.db.allDocs(
                {include_docs: true, descending: descending},
                callback
            );

            return items;
        };

        this.getItem = function(id, callback) {
            this.db.get(id, callback);
        };

        this.setItem = function(id, rev, item, callback) {
            var todo = {
                '_id': id,
                '_rev': rev,
                'content': item
            };
            this.db.put(todo, callback);
        };

        this.delItem = function(id, rev, callback) {
            this.db.remove({
                '_id': id,
                '_rev': rev
            }, callback);
        };
    };
});

