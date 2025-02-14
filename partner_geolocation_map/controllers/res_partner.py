from odoo import http
from odoo.http import request


class PartnerController(http.Controller):

    @http.route("/partner/map_address", type="json", auth="user", methods=["POST"])
    def map_address_to_partner(self, address):
        # Use sudo() if necessary to bypass access rights (or remove sudo() if not required)
        country = request.env["res.country"].sudo().search([("code", "=", str(address.get("country_code")).upper())], limit=1)
        state = (
            request.env["res.country.state"]
            .sudo()
            .search([("name", "=", address.get("state")), ("country_id", "=", country.id)], limit=1)
        )


        result = {
            "street": address.get("street", ""),
            "city": address.get("city", ""),
            "zip": address.get("zip", ""),
            "country_id": country.id if country else False,
            "state_id": state.id if state else False,
        }
        return result
