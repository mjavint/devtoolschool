/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';
import { Component, useSubEnv } from '@odoo/owl';

export class EffectService extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.effectService = useService('effect');
  }

  getEffect() {
    this.effectService.add({
      // type: "sepia",
      type: 'rainbow_man',
      message: 'El servicio esta funcionando correctamente',
    });
  }
}

EffectService.template = 'owl_service_hooks.EffectService';
EffectService.components = { Layout };

registry.category('actions').add('owl_service_hooks.EffectService', EffectService);
