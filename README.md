TODO
========

## A TODO app for firefox OS

Just a very simple TODO app created to learn native-looking FFOS apps development.

If you just want to use it, you can also get it from http://todo.etenil.net

## Installing

### App
To run the development server, install _node.js_ and _npm_ somehow (depends on your
platform) then install _volo_ with npm like this:

    npm install -g volo

Afterwards, you'll be able to run the client server like this:

    volo serve

### Sync server
The sync service is written in PHP and based on [Atlatl](http://github.com/Etenil/atlatl).
You'll need to install [Composer](http://getcomposer.org) and then run

    composer install

within the _sync_ folder. This will install the PHP dependencies for you.

Run the sync server like so:

    php -S 0.0.0.0 8000



