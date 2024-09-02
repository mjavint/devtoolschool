# -*- coding: utf-8 -*-
{
    'name': 'OWL Enviroment',
    'version': '17.0.1.0.0',
    'summary': """ OWL Enviroment """,
    'author': 'mjavint',
    'website': 'https://www.youtube.com/@devtoolschool',
    'category': 'Learn',
    'depends': ['base', 'web'],
    "data": [
        "views/menus.xml",
        "views/task_client_action.xml",
    ],
    'assets': {
        'web.assets_backend': ['owl_env/static/src/**/*'],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
