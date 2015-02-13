define(function() {
    return codebox.settings.schema("statusbar",
        {
            "title": "Status Bar",
            "type": "object",
            "properties": {
                "visible": {
                    "description": "Show Status Bar",
                    "type": "boolean",
                    "default": true
                }
            }
        }
    );
});