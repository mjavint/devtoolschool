/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';

import { Component, useSubEnv, useState } from '@odoo/owl';

export class OrmService extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });

    this.state = useState({ partners: [] });
    // this.orm = useService("orm");
    this.getData = useService('owl_service_hooks.getOrmPartners');
  }

  async getOrmService() {
    this.state.partners = this.getData;
  }
}

OrmService.template = 'owl_service_hooks.OrmService';
OrmService.components = { Layout };

registry.category('actions').add('owl_service_hooks.OrmService', OrmService);
