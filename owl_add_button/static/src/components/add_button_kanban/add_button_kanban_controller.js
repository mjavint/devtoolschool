/** @odoo-module **/

import { KanbanController } from '@web/views/kanban/kanban_controller';

export class ProductPriceKanbanController extends KanbanController {
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
