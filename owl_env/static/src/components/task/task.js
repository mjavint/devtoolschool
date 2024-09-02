/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { TaskList } from '@owl_env/components/task_list/task_list';

import { Component, useState } from '@odoo/owl';

export class Task extends Component {
  static template = 'owl_env.Task';
  static components = { TaskList, Layout };

  setup() {
    this.store = useState(this.env.taskStore);
  }

  addNewList() {
    this.store.createList();
  }
}

registry.category('actions').add('owl_env.Task', Task);
