# -*- coding: utf-8 -*-
{
    "name": "OWL Add Button",
    "version": "1.0.0",
    "summary": """ OWL Add Button Summary """,
    "author": "Odoo Brain",
    "website": "https://www.youtube.com/@odoobrain",
    "category": "Others",
    "depends": ["base", "web", "product"],
    "data": [
        "security/ir.model.access.csv",
        "views/product_template_views.xml",
        "wizards/product_price_wizard.xml",
    ],
    "assets": {
        "web.assets_backend": ["owl_add_button/static/src/**/*"],
    },
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
