/** @odoo-module */

import { Component, useState } from '@odoo/owl';

export class TaskItem extends Component {
  static template = 'owl_env.TaskItem';
  static props = {
    task: {
      type: Object,
      shape: { id: Number, description: String, isCompleted: Boolean },
    },
    toggle: Function,
    remove: Function,
  };

  onChange() {
    this.props.toggle(this.props.task.id);
  }

  onRemove() {
    this.props.remove(this.props.task.id);
  }
}
