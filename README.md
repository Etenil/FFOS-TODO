TODO
========

## A TODO app for firefox OS

Just a very simple TODO app created to learn native-looking FFOS apps development.

If you just want to use it, you can also get it from http://todo.etenil.net

## Installing

### App
To run the development server, install _node.js_ and _npm_ somehow (depends on your
platform) then install _volo_ with npm like this:

    $ sudo npm install -g volo

On some distros, running npm with sudo creates locked-up temporary directories in
your home folder. Get rid of those:

    $ sudo rm -rf ~/.npm ~/tmp

You'll need to install the build system's dependencies like so:

    $ npm install

Afterwards, you'll be able to run the dev server like this:

    volo serve

To get a production-ready app, run this:

    volo build

The resulting code sits in the "www-built" directory. You can zip it and use it as app.


