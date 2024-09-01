/** @odoo-module */

import { registry } from "@web/core/registry";

const API = "https://jsonplaceholder.typicode.com/posts";

export const postService = {
  dependencies: ["http"],
  async start(env, { http }) {
    const postsList = await http.get(API);
    return postsList;
  },
};

registry.category("services").add("owl_service_hooks.postService", postService);
