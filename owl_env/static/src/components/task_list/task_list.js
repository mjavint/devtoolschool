/** @odoo-module **/

import { Component, useState, useRef, onMounted } from '@odoo/owl';
import { TaskItem } from '../task_item/task_item';

export class TaskList extends Component {
  static template = 'owl_env.TaskList';
  static components = { TaskItem };
  static props = { name: String };

  setup() {
    this.store = useState(this.env.taskStore);
    const ref = useRef('input');

    onMounted(() => {
      ref.el.focus();
    });
  }

  addTask(ev) {
    if (ev.keyCode === 13 && ev.target.value != '') {
      this.store.addTask(this.props.list.id, ev.target.value);
      ev.target.value = '';
    }
  }
}
