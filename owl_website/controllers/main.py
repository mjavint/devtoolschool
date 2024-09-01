from odoo import http
from odoo.http import request


class Main(http.Controller):
    @http.route('/owl/custom', type='http', auth='public', website=True)
    def owl_custom(self, **kw):
        return request.render('owl_website.custom_page')
