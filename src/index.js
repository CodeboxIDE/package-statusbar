define([
    "src/bar",
    "less!src/stylesheets/main.less"
], function(StatusBar) {
    var commands = codebox.require("core/commands");
    var dialogs = codebox.require("utils/dialogs");

    // Create the bar and add it to the body
    var bar = new StatusBar();
    bar.appendTo(codebox.app.$el);

    commands.register({
        id: "view.statusbar.toggle",
        title: "View: Toggle Status Bar",
        shortcuts: [
            "mod+b", "mod+k"
        ],
        run: function() {
            codebox.app.$el.toggleClass("hide-statusbar");
        }
    });

    // Exports statusbar
    codebox.statusbar = bar;
});