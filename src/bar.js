define([
    "src/messages"
], function(Messages) {
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

            this.messages = new MessagesList({}, this);
            this.messages.appendTo(this);
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

                content += "[";
                _.each(_.range(options.size), function(i) {
                    if (i == position) {
                        content += "=";
                    } else {
                        content += " ";
                    }
                })
                content += "]";

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

            p.fin(function() {
                clearInterval(interval);
                msg.destroy();
            });

            return p;
        }
    });

    return StatusBar;
});