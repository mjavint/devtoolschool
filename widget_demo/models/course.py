import logging

from odoo import _, fields, models

_logger = logging.getLogger(__name__)


class Course(models.Model):
    _name = "course"
    _description = "Course"

    name = fields.Char("Name")
    profesor_id = fields.Many2one(
        string=_("Profesor"),
        comodel_name="res.partner",
    )
    course_date = fields.Date(string=_("Course Date"))
    priority = fields.Selection(
        string=_("Priority"),
        selection=[
            ("0", "Normal"),
            ("1", "Good"),
            ("2", "Very Good"),
            ("3", "Excellent"),
        ],
        default="0",
    )
    course_type = fields.Selection(
        string=_("Course Type"),
        selection=[
            ("online", "Online"),
            ("present", "Presencial"),
            ("semi", "Semi Presencial"),
        ],
    )
    source_code = fields.Text(string=_("Source Code"))
    insignea = fields.Char(string=_("Insignea"))
    percent = fields.Float(string=_("Percent"), default="62.5")
