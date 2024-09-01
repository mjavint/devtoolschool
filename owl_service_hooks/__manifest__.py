# -*- coding: utf-8 -*-
{
    'name': 'OWL Service Hooks',
    'version': '17.0.1.0.0',
    'summary': """ OWL Service Hooks """,
    'author': 'mjavint',
    'category': 'Learn',
    'depends': ['base', 'web'],
    "data": [
        "views/menus.xml",
        "views/orm_service_views.xml",
        "views/rpc_service_views.xml",
        "views/posts_views.xml",
        "views/action_service_views.xml",
        "views/effect_service_views.xml",
        "views/router_service_views.xml",
        "views/user_service_views.xml",
        "views/company_service_views.xml",
    ],
    'assets': {
        'web.assets_backend': ['owl_service_hooks/static/src/**/*'],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
