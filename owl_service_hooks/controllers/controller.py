from odoo import http


class Controller(http.Controller):
    @http.route('/owl/rpc_service', type='json', auth='public')
    def get_partners(self, **kw):
        return http.request.env['res.partner'].search_read(
            [],
            ["image_128", "name", "email"],
            limit=kw.get('limit'),
        )
