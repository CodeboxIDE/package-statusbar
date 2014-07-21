define(function() {
    var hr = codebox.require("hr/hr");
    var _ = codebox.require("hr/utils");

    var StatusBar = hr.View.extend({
        className: "component-statusbar",



        // Show loading indicator for a promise
        // Return the same promise
        loading: function(p, options) {
            var that = this;
            options = _.defaults(options || {}, {
                // Interval for indicator update (in ms)
                interval: 300,

                // Size of indicator
                size: 7
            });

            var direction = 1;
            var position = 0;
            var interval;

            var showIndicator = function() {
                var content = "[";

                _.each(_.range(options.size), function(i) {
                    if (i == position) {
                        content += "=";
                    } else {
                        content += "-";
                    }
                })

                content += "]";

                that.$el.text(content);
                position = position + direction;
                if (position == (options.size -1)) {
                    direction = -direction;
                }
                if (position == 0) {
                    direction = -direction;
                }
            };

            interval = setInterval(showIndicator, options.interval);

            p.done(function() {
                clearInterval(interval);
                that.$el.text("");
            });

            return p;
        }
    });

    return StatusBar;
});