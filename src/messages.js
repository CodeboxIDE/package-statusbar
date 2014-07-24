define(function() {
    var hr = codebox.require("hr/hr");
    var _ = codebox.require("hr/utils");

    var Message = hr.Model.extend({
        defaults: {
            'content': "",
            'position': "left",
            'visible': true,
            'order': 10
        },

        // Toggle visibility
        toggleVisibility: function(st) {
            if (st == undefined) st = !this.get("visible");
            this.set("visible", st);
        }
    });

    var Messages = hr.Collection.extend({
        model: Message,
        comparator: function(msg) {
            return msg.get("order", 10);
        }
    });

    return Messages;
});