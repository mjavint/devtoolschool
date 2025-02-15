# -*- coding: utf-8 -*-
{
    "name": "Partner Geolocation Map",
    "version": "1.0.0",
    "summary": """ Widget Geolocation Map Summary """,
    "author": "devtoolschool",
    "website": "https://www.youtube.com/@devtoolschool",
    "category": "Tools",
    "depends": ["base", "web"],
    "data": ["views/res_partner_views.xml"],
    "assets": {
        "web.assets_backend": ["partner_geolocation_map/static/src/**/*"],
    },
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
