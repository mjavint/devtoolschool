# -*- coding: utf-8 -*-
{
    'name': 'Devtoolschool',
    'version': '17.0.1.0',
    'description': """ Devtoolschool Description """,
    'summary': """ Devtoolschool Summary """,
    'author': 'mjavint',
    'website': 'https://www.youtube.com/@devtoolschool',
    'category': 'Others',
    'depends': ['base', 'web', 'calendar', 'crm'],
    "data": [
        "views/calendar_event_views.xml"
    ],
    'assets': {
        'web.assets_backend': ['devtoolschool/static/src/**/*'],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
