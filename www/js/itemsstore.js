define(function(require) {
    /**
     * This is an object that wraps around localStorage
     * to store and retrieve items easier.
     */
    return function() {
        // Testing for localStorage. Otherwise it's useless.
        try {
            'localStorage' in window && window['localStorage'] !== null;
        }
        catch(e) {
            throw "No localStorage support.";
        }

        this.counter = 0;

        // Getting the highest key value for the counter.
        for(var key in localStorage) {
            if(key > this.counter) {
                this.counter = key;
            }
        }

        /**
         * Simply adds an item to the store.
         */
        this.addItem = function(content) {
            localStorage.setItem(++this.counter, content); 
            return this.counter;
        };

        /**
         * Deletes an item.
         */
        this.delItem = function(key) {
            localStorage.removeItem(key);
            return key;
        }

        /**
         * Gets an item from its key.
         */
        this.getItem = function(key) {
            return localStorage.getItem(key);
        };

        /**
         * Sets an item value from its key.
         */
        this.setItem = function(key, content) {
            return localStorage.setItem(key, content);
        };

        /**
         * Gets the last added item.
         */
        this.getLastItem = function() {
            return localStorage.getItem(this.counter);
        };

        /**
         * Retrieve all items as an array and sorts them.
         */
        this.getAllItems = function(descending) {
            var items = [];
            for(var key in localStorage) {
                items.push({id: key, value: localStorage.getItem(key)});
            }
            items.sort(function(a, b) {
                if(a.id == b.id) {
                    return 0;
                } else {
                    if(descending) {
                        if(a.id < b.id) {
                            return -1;
                        }
                        else if(a.id > b.id) {
                            return 1;
                        }
                    } else {
                        if(a.id < b.id) {
                            return 1;
                        }
                        else if(a.id > b.id) {
                            return -1;
                        }
                    }
                }
            });
            return items;
        }

        /**
         * Iterates on all items.
         */
        this.iterate = function(handler) {
            for(var key in localStorage) {
                handler(key, localStorage.getItem(key));
            }
        };
    }
});
