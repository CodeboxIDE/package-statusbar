define([
    "src/settings",
    "src/messages"
], function(settings, Messages) {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");
    var _ = codebox.require("hr/utils");

    var MessageItem = hr.List.Item.extend({
        events: {
            click: "click"
        },

        render: function() {
            var className = "message";

            className += " position-"+this.model.get("position");
            if (this.model.get("click")) className += " type-action";

            this.$el.html(this.model.get("content"));
            this.$el.attr("class", className);
            this.$el.toggle(this.model.get("visible"));

            return this.ready();
        },

        click: function(e) {
            if (this.model.get("click")) {
                this.model.get("click")(e);
            }
        }
    });

    var MessagesList = hr.List.extend({
        className: "statusbar-messages",

        Collection: Messages,
        Item: MessageItem
    });

    var StatusBar = hr.View.extend({
        className: "component-statusbar",

        initialize: function() {
            StatusBar.__super__.initialize.apply(this, arguments);

            this.Messages = Messages;

            // Create list of all messages in status bar
            this.messages = new MessagesList({}, this);
            this.messages.appendTo(this);

            // Bind settings update
            this.listenTo(settings.data, "change", this.onSettingsChange);
            this.onSettingsChange();
        },

        // Add/Get message
        message: function(options) {
            return this.messages.collection.add(options);
        },

        // Show loading indicator for a promise
        // Return the same promise
        loading: function(p, options) {
            var that = this;
            options = _.defaults(options || {}, {
                // Interval for indicator update (in ms)
                interval: 100,

                // Size of indicator
                size: 8,

                // Prefix
                prefix: ""
            });

            var msg = this.message({
                order: 1
            });

            var direction = 1;
            var position = 0;
            var interval;

            var showIndicator = function() {
                var content = options.prefix? options.prefix+" " : "";

                if (options.size > 0) {
                    content += "[";
                    _.each(_.range(options.size), function(i) {
                        if (i == position) {
                            content += "=";
                        } else {
                            content += " ";
                        }
                    })
                    content += "]";
                }

                msg.set("content", content);
                position = position + direction;
                if (position == (options.size -1)) {
                    direction = -direction;
                }
                if (position == 0) {
                    direction = -direction;
                }
            };

            interval = setInterval(showIndicator, options.interval);

            p
            .fin(function() {
                return Q.delay(300);
            })
            .fin(function() {
                clearInterval(interval);
                msg.destroy();
            });

            return p;
        },

        // Show progress indicator for a promise
        // Return the same promise
        progress: function(p, options) {
            var that = this;
            options = _.defaults(options || {}, {
                // Prefix
                prefix: ""
            });

            var msg = this.message({
                order: 1
            });

            var update = function(percent) {
                percent = _.isNumber(percent) ? percent : percent.percent;
                msg.set("content", options.prefix+" "+percent+"%");
            };

            update(0);
            p
            .progress(update)
            .fin(function() {
                return Q.delay(300);
            })
            .fin(function() {
                msg.destroy();
            });

            return p;
        },

        // Show short message
        show: function(msg, duration) {
            return this.loading(Q.delay(duration), {
                prefix: msg,
                size: 0
            });
        },

        // When settings changed
        onSettingsChange: function() {
            codebox.app.$el.toggleClass("hide-statusbar", !settings.data.get("visible"));
        }
    });

    return StatusBar;
});