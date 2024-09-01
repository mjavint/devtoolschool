/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';

import { Component, useSubEnv, useState } from '@odoo/owl';
import { PostItem } from './post_item';

export class Posts extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.postService = useService('owl_service_hooks.postService');
    this.state = useState({ posts: [] });
  }

  async getPosts() {
    this.state.posts = this.postService;
  }
}

Posts.template = 'owl_service_hooks.Posts';
Posts.components = { Layout, PostItem };

registry.category('actions').add('owl_service_hooks.Posts', Posts);
