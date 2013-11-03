define(function(require) {
    require('pouchdb');
    
    return function() {
        this.db = new PouchDB('todos');
        this.remoteCouch = false;

        this.addItem = function(item, callback) {
            item._id = new Date().toISOString();
            this.db.put(item, callback);
        };

        this.getAllItems = function(descending, callback) {
            var items = [];
            this.db.allDocs({include_docs: true, descending: descending}, callback);

            return items;
        };

        this.getItem = function(id, callback) {
            this.db.get(id, callback);
        };

        this.setItem = function(item, callback) {
            this.db.put(item, callback);
        };

        this.delItem = function(id, rev, callback) {
            this.db.remove({ '_id': id, '_rev': rev }, callback);
        };
    };
});

