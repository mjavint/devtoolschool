/** @odoo-module */

import { Component, useState } from '@odoo/owl';

export class TaskItem extends Component {
  static template = 'owl_env.TaskItem';
  static props = {
    task: {
      type: Object,
      shape: {
        id: Number,
        listId: Number,
        description: String,
        isCompleted: Boolean,
      },
    },
  };

  setup() {
    this.store = useState(this.env.taskStore);
  }

  onChange() {
    const task = this.props.task;
    this.store.toggleTask(task.listId, task.id);
  }

  onRemove() {
    const task = this.props.task;
    this.store.removeTask(task.listId, task.id);
  }
}
