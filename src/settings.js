define(function() {
    return codebox.settings.schema("find",
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