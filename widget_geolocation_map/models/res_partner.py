# -*- coding: utf-8 -*-
import logging

from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class ResPartner(models.Model):

    _inherit = 'res.partner'


    coordinates = fields.Json(string='Coordinates')

    cero = fields.Char(string='Cero')

    def prueba(self):
        return ''
