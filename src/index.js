require("./stylesheets/main.less");

var settings = require("./settings");
var StatusBar = require("./bar");

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
        settings.data.set("visible", !settings.data.get("visible"));
        codebox.settings.save();
    }
});

// Exports statusbar
codebox.statusbar = bar;
