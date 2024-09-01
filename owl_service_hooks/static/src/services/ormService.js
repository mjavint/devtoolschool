/** @odoo-module */

import { registry } from '@web/core/registry';

export const getOrmPartners = {
  dependencies: ['orm'],
  async start(env, { rpc, orm }) {
    const data = await orm.searchRead(
      'res.partner',
      [],
      ['image_128', 'name', 'website', 'phone']
    );
    return data;
  },
};

registry.category('services').add('owl_service_hooks.getOrmPartners', getOrmPartners);
