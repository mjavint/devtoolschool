/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { TaskList } from './task_list';

import { Component, useState, useSubEnv, useChildSubEnv } from '@odoo/owl';
import { TaskStore, useTaskStore } from './task_store';

export class Task extends Component {
  static template = 'owl_env.Task';
  static components = { TaskList, Layout };

  setup() {
    this.nextId = 1;
    this.lists = useState([]);
  }

  addNewList() {
    const id = this.nextId++;
    this.lists.push({ id, name: `List ${id}` });
  }
}

registry.category('actions').add('owl_env.Task', Task);
