/** @odoo-module **/

import { Component, useState, useRef, onMounted } from '@odoo/owl';
import { TaskItem } from './task_item';

export class TaskList extends Component {
  static template = 'owl_env.TaskList';
  static components = { TaskItem };
  static props = { name: String };

  setup() {
    this.nextId = 4;
    this.tasks = useState([]);
    const ref = useRef('input');

    onMounted(() => {
      ref.el.focus();
    });
  }

  addTask(ev) {
    if (ev.keyCode === 13 && ev.target.value != '') {
      this.tasks.push({
        id: this.nextId++,
        description: ev.target.value,
        isCompleted: false,
      });
      ev.target.value = '';
    }
  }

  toggleTask(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  }

  removeTask(taskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
