# -*- coding: utf-8 -*-
{
    'name': 'Inherit Widget with OWL',
    'version': '17.0.1.0.0',
    'summary': """ Inherit Widget with OWL """,
    'author': 'mjavint',
    'website': 'https://www.youtube.com/@devtoolschool',
    'category': 'Learn',
    'depends': ['base', 'web'],
    "data": [
        "views/res_partner_views.xml",
    ],
    'assets': {
        'web.assets_backend': [
            'owl_intl_phone_field/static/src/components/**/*'
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
