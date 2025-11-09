import logging

from odoo import api, fields, models
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class ObTask(models.Model):
    _name = "ob.task"
    _description = "Task"

    name = fields.Char("Name")
    duration = fields.Float(
        string="Duración",
        help="Duración de la tarea en horas.",
    )

    @api.constrains("duration")
    def _check_duration(self):
        for task in self:
            if task.duration < 0:
                raise ValidationError("La duración no puede ser negativa.")
