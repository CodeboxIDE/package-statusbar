define(function() {
    var hr = codebox.require("hr/hr");
    var _ = codebox.require("hr/utils");

    var Message = hr.Model.extend({
        defaults: {
            'id': "",
            'content': "",
            'position': "left"
        }
    });

    var Messages = hr.Collection.extend({
        model: Message
    });

    return Messages;
});