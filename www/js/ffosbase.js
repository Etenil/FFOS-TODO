define(function(require) {
    var $ = require('zepto');

    (function($) {
        $.extend($.fn, {
            showFrame: function() {
                $(this).addClass('show');
                $(this).removeClass('hide');
            },
            hideFrame: function() {
                $(this).removeClass('show');
                $(this).addClass('hide');
            }
        });
    })($);

    function FFOSBase() {
        ffos = this;

        this.showFrame = function(selector) {
            var frame = $(selector);
            frame.addClass('show');
            frame.removeClass('hide');
        };

        this.hideFrame = function(selector) {
            var frame = $(selector);
            frame.removeClass('show');
            frame.addClass('hide');
        };

        this.Pane = function(name) {
            this.name = name;

            this.show = function() {
                $('body').removeClass('hide' + this.name);
                $('body').addClass('show' + this.name);
            };

            this.hide = function() {
                $('body').removeClass('show' + this.name);
                $('body').addClass('hide' + this.name);
            };
        };

        /* Declaring a few standard items. */
        this.sideBar = new this.Pane('Side');
        this.rightFrame = new this.Pane('Right');


        this.Dialog = function(message, buttons_type, buttons) {
            this.frame = $('#msgDialog');
            this.msg = $('#msgDialog .message');
            this.buttons = $('#msgDialog .buttons');

            this.close_handler = null;

            if(!buttons_type) {
                buttons_type = ffos.Dialog.BUTTONS_DISMISS;
            }


            this._init = function(message, buttons) {
                this.msg.html(message);

                if(buttons_type == ffos.Dialog.BUTTONS_CUSTOM && buttons instanceof Array) {
                    var buttonshtml = '';
                    for(buttonkey in buttons) {
                        var button = buttons[buttonkey];
                        buttonshtml+= '<button class="close" id="dialog-button-' +
                            button.name + '">' + button.label + '</button>';
                    }
                    this.buttons.html(buttonshtml);
                }
                else if(buttons_type == ffos.Dialog.BUTTONS_DISMISS) {
                    this.buttons.html(
                        '<button id="dialog-button-dismiss" class="close">Dismiss</button>'
                    );
                }
                else if(buttons_type == ffos.Dialog.BUTTONS_YESNO) {
                    var labels = ['Yes', 'No'];
                    if(buttons instanceof Array) {
                        labels = buttons;
                    }
                    this.buttons.html(
                        '<button id="dialog-button-yes" class="close half">'
                        + labels[0]
                        + '</button>'
                        + '<button id="dialog-button-no" class="close half">'
                        + labels[1]
                        + '</button>'
                    );
                }

                // Binds the closing function.
                var that = this;
                $('#msgDialog .buttons button').live('click', function(e) {
                    that._close($(this).attr('id'));
                });
            };

            this.dom = $('#msgDialog');
            this.message = $('#msgDialog .message');

            this.message.html(message);

            this.show = function(closefunc) {
                this.close_handler = closefunc;
                this.dom.showFrame();
            };

            this._close = function(id) {
                this.frame.hideFrame();
                if(this.close_handler) {
                    this.close_handler(id.substr(14));
                }
            };

            this._init(message, buttons_type, buttons);
        }
        this.Dialog.BUTTONS_DISMISS = 0;
        this.Dialog.BUTTONS_YESNO = 1;
        this.Dialog.BUTTONS_CUSTOM = 2;

        /* Simple wrapper for the default dialog. */
        this.showDialog = function(message, buttons, closefunc) {
            var dialog = new ffos.Dialog(message);
            dialog.show();
        };
    }

    return new FFOSBase();
});

