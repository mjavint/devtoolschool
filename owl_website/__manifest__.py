# -*- coding: utf-8 -*-
{
    'name': 'Website with OWL',
    'version': '17.0.1.0.0',
    'summary': """ Website with OWL """,
    'author': 'mjavint',
    'website': 'https://www.youtube.com/@devtoolschool',
    'category': 'Website',
    'depends': ['base', 'web', 'website'],
    "data": ["views/templates.xml"],
    'assets': {
        'web.assets_frontend': [
            'owl_website/static/src/components/**/*',
        ]
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
