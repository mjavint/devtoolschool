/** @odoo-module **/
import { ListController } from '@web/views/list/list_controller';

export class ProductPriceListController extends ListController {
  setup() {
    super.setup();
  }

  productPrice() {
    this.actionService.doAction({
      type: 'ir.actions.act_window',
      res_model: 'product.price.wizard',
      name: 'Product Price',
      view_mode: 'form',
      view_type: 'form',
      views: [[false, 'form']],
      target: 'new',
      res_id: false,
    });
  }
}
