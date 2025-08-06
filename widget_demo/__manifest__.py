# -*- coding: utf-8 -*-
{
    'name': 'Widget Demo',
    'version': '18.0.1.0.0',
    'summary': """ Widget Demo Summary """,
    'author': 'Odoo Brain',
    'website': 'https://www.youtube.com/@odoobrain',
    'category': 'Tools',
    'depends': ['base', 'web'],
    "data": [
        "security/ir.model.access.csv",
        "views/course_views.xml"
    ],
    'assets': {
        'web.assets_backend': [
            'widget_demo/static/src/**/*'
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
