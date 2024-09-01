/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';

import { Component, useSubEnv, useState } from '@odoo/owl';

export class RpcService extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.state = useState({ partners: [] });
    this.getData = useService('owl_service_hooks.getRpcPartners');
  }

  async getRpcService() {
    this.state.partners = this.getData;
  }
}

RpcService.template = 'owl_service_hooks.RpcService';
RpcService.components = { Layout };

registry.category('actions').add('owl_service_hooks.RpcService', RpcService);
