define([
    "less!src/stylesheets/main.less"
], function() {
    var commands = codebox.require("core/commands");
    var dialogs = codebox.require("utils/dialogs");

    commands.register({
        id: "view.statusbar.toggle",
        title: "View: Toggle Status Bar",
        run: function() {

        }
    });
});