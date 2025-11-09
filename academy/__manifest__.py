{
    "name": "Academy",
    "version": "1.0.0",
    "summary": """ Training to start implementing for Odoo """,
    "author": "Odoo Brain",
    "website": "https://www.youtube.com/@odoobrain",
    "category": "Learning",
    "depends": [
        "base",
        "widget_literal_time_float",
    ],
    "data": [
        "security/ir.model.access.csv",
        "views/ob_task_views.xml",
    ],
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
