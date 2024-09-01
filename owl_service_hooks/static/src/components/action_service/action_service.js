/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';

import { Component, useSubEnv } from '@odoo/owl';

export class ActionService extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.action = useService('action');
  }

  getAction() {
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Partner',
      res_model: 'res.partner',
      domain: [],
      context: { group_by: 'commercial_company_name' },
      views: [
        [false, 'list'],
        [false, 'form'],
        [false, 'kanban'],
      ],
      view_mode: 'list, form, kanban',
      target: 'current',
    });
  }
}

ActionService.template = 'owl_service_hooks.ActionService';
ActionService.components = { Layout };

registry.category('actions').add('owl_service_hooks.ActionService', ActionService);
