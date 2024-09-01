/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';

import { Component, useSubEnv, useState } from '@odoo/owl';

export class UserService extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.userService = useService('user');
    this.state = useState({ current_user: '' });
  }

  getCurrentUser() {
    const currentUser = this.userService;
    console.log(currentUser);
    this.state.current_user = JSON.stringify(currentUser.context);
  }
}

UserService.template = 'owl_service_hooks.UserService';
UserService.components = { Layout };

registry.category('actions').add('owl_service_hooks.userService', UserService);
