/** @odoo-module */

import { registry } from '@web/core/registry';

export const getRpcPartners = {
  dependencies: ['rpc'],
  async start(env, { rpc, orm }) {
    const data = await rpc('/owl/rpc_service', { limit: 6 });
    return data;
  },
};

registry.category('services').add('owl_service_hooks.getRpcPartners', getRpcPartners);
