# -*- coding: utf-8 -*-
import logging

from odoo import models, fields, api, _

_logger = logging.getLogger(__name__)


class CalendarEvent(models.Model):
    _inherit = 'calendar.event'

    origin_ref = fields.Reference(
        string=_('Origin'),
        selection='_select_target_model',
        readonly=True,
    )

    @api.model
    def _select_target_model(self):
        return (
            self.env['ir.model'].search([]).mapped(lambda m: (m.model, m.name))
        )

    @api.model
    def create(self, vals):
        ctx_model = self.env.context.get('active_model', False)
        ctx_id = self.env.context.get('active_id', False)
        if ctx_model and ctx_id:
            vals['origin_ref'] = f'{ctx_model},{ctx_id}'
        return super(CalendarEvent, self).create(vals)

    @api.model
    def default_get(self, fields_list):
        ctx_model = self.env.context.get('active_model', False)
        ctx_id = self.env.context.get('active_id', False)
        if ctx_model and ctx_id:
            self = self.with_context(
                default_origin_ref=f'{ctx_model},{ctx_id}',
            )
        return super(CalendarEvent, self).default_get(fields_list)

    state = fields.Selection(
        string=_('State'),
        selection=[
            ('default', _('Default')),
            ('open', _('open')),
            ('done', _('done')),
        ],
        default='default',
    )

    def action_default(self):
        self.write({'state': 'default'})

    def action_open(self):
        self.write({'state': 'open'})

    def action_done(self):
        self.write({'state': 'done'})
