/** @odoo-module */

export class TaskStore {
  static nextListId = 1;
  static nextTaskId = 1;

  constructor() {
    this.lists = [];
  }

  createList() {
    const id = TaskStore.nextListId++;
    this.lists.push({ id, name: `List ${id}`, tasks: [] });
  }

  addTask(listId, description) {
    const list = this.lists.find((l) => l.id === listId);
    const task = {
      id: TaskStore.nextTaskId++,
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

  deleteList(listId) {
    const index = this.lists.findIndex((l) => l.id === listId);
    if (index >= 0) {
      this.lists.splice(index, 1);
    }
  }
}
