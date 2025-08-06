# -*- coding: utf-8 -*-

from odoo import models
from datetime import date


class ResCurrency(models.Model):
    _inherit = "res.currency"

    def exchange_rate_usd(self):
        currency_usd = self.env.ref("base.USD")
        company = self.env.company

        rate = company.currency_id._convert(
            from_amount=1.0,
            to_currency=currency_usd,
            company=company,
            date=date.today(),
        )

        return {
            "rate": rate,
            "symbol": currency_usd.symbol,
            "currency_id": currency_usd.id,
        }
