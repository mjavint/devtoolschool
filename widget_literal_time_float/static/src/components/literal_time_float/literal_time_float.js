/** @odoo-module **/

import { registry } from '@web/core/registry';
import { standardFieldProps } from '@web/views/fields/standard_field_props';
import { Component } from '@odoo/owl';
import { useInputField } from '@web/views/fields/input_field_hook';

const HOURS_PER_UNIT = Object.freeze({
  w: 168, // 7 days * 24 hours
  d: 24,
  h: 1,
  m: 1 / 60,
  s: 1 / 3600,
});

const TIME_UNITS = Object.freeze([
  { key: 'w', hours: 168, label: 'week' },
  { key: 'd', hours: 24, label: 'day' },
  { key: 'h', hours: 1, label: 'hour' },
  { key: 'm', hours: 1 / 60, label: 'minute' },
]);

const DURATION_PATTERN = /(\d+(?:\.\d+)?)\s*([wdhms])/g;

const parseLiteralTimeToFloat = (str) => {
  if (!str || typeof str !== 'string') {
    return 0;
  }

  const clean = str.trim().toLowerCase();

  if (!/[wdhms]/.test(clean)) {
    const num = parseFloat(clean);
    return Number.isNaN(num) ? 0 : num;
  }

  let totalHours = 0;
  let match;

  DURATION_PATTERN.lastIndex = 0;
  while ((match = DURATION_PATTERN.exec(clean))) {
    const value = parseFloat(match[1]);
    const unit = match[2];
    if (!Number.isNaN(value) && HOURS_PER_UNIT[unit]) {
      totalHours += value * HOURS_PER_UNIT[unit];
    }
  }
  return totalHours;
};

const formatFloatToLiteralTime = (hours) => {
  if (hours == null || hours === 0 || hours === false) {
    return '';
  }

  const isNegative = hours < 0;
  const absHours = Math.abs(hours);
  const parts = [];

  let remainingHours = absHours;

  for (const { key, hours: unitHours } of TIME_UNITS.slice(0, 3)) {
    if (remainingHours >= unitHours) {
      const unitValue = Math.floor(remainingHours / unitHours);
      parts.push(`${unitValue}${key}`);
      remainingHours -= unitValue * unitHours;
    }
  }

  const minutes = Math.round(remainingHours * 60);
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (parts.length === 0) {
    return '';
  }
  const result = parts.join(' ');
  return isNegative ? `-${result}` : result;
};

export class LiteralTimeFloat extends Component {
  static template = 'widget_literal_time_float.LiteralTimeFloat';
  static props = {
    ...standardFieldProps,
    placeholder: { type: String, optional: true },
  };
  setup() {
    this.input = useInputField({
      getValue: () => this.formattedValue,
      refName: 'literalTimeFloatInput',
      parse: parseLiteralTimeToFloat,
    });
  }

  get formattedValue() {
    return formatFloatToLiteralTime(this.props.record.data[this.props.name]);
  }

  get isReadonly() {
    return this.props.readonly;
  }
}

const literalTimeFloat = {
  displayName: 'Literal Time Float',
  component: LiteralTimeFloat,
  supportedTypes: ['float'],
  extractProps: ({ attrs }) => ({
    placeholder: attrs.placeholder,
  }),
};

registry.category('fields').add('literal_time_float', literalTimeFloat);
