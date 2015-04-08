var Model = codebox.require("hr.model");
var Collection = codebox.require("hr.collection");
var _ = codebox.require("hr.utils");

var Message = Model.extend({
    defaults: {
        'content': "",
        'position': "left",
        'visible': true,
        'order': 10,
        'click': null
    },

    // Toggle visibility
    toggleVisibility: function(st) {
        if (st == undefined) st = !this.get("visible");
        this.set("visible", st);
    }
});

var Messages = Collection.extend({
    model: Message,
    comparator: function(msg) {
        return msg.get("order", 10);
    }
});

module.exports = Messages;
