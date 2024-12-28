/** @odoo-module **/

import { registry } from '@web/core/registry';
import { listView } from '@web/views/list/list_view';
import { ProductPriceListController } from './add_button_list_controller';

export const productPriceListView = {
  ...listView,
  Controller: ProductPriceListController,
  buttonTemplate: 'owl_add_button.ListView.Buttons',
};

registry.category('views').add('product_price_list', productPriceListView);
