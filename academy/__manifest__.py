# -*- coding: utf-8 -*-
{
    'name': 'Academy',
    'version': '1.0.0',
    'summary': """ Academy Summary """,
    'author': 'mjavint',
    'website': 'https://www.youtube.com/@odoobrain',
    'category': 'Tools',
    'depends': ['base', 'web'],
    "data": [
        "views/academy_partner_component_client_action.xml"
    ],
    'assets': {
        'web.assets_backend': [
            'academy/static/src/**/*'
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
