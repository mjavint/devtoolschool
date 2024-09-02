/** @odoo-module */

import { useEnv, useState } from '@odoo/owl';

export class TaskStore {
  static nextId = 1;

  constructor() {
    this.lists = [];
  }

  createList() {
    const id = TaskStore.nextId++;
    this.lists.push({ id, name: `List ${id}`, tasks: [] });
  }

  addTask(listId, description) {
    const list = this.lists.find((l) => l.id === listId);
    const task = {
      id: TaskStore.nextId++,
      listId,
      description,
      isCompleted: false,
    };
    list.tasks.push(task);
  }

  toggleTask(listId, taskId) {
    const list = this.lists.find((l) => l.id === listId);
    const task = list.tasks.find((t) => t.id === taskId);
    task.isCompleted = !task.isCompleted;
  }

  removeTask(listId, taskId) {
    const list = this.lists.find((l) => l.id === listId);
    const index = list.tasks.findIndex((t) => t.id === taskId);
    list.tasks.splice(index, 1);
  }
}

export function useTaskStore() {
  const env = useEnv();
  return useState(env.taskStore);
}
