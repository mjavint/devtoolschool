/** @odoo-module **/

import { Component, useState, onWillStart } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { Dropdown } from '@web/core/dropdown/dropdown';
import { DropdownItem } from '@web/core/dropdown/dropdown_item';
import { useService } from '@web/core/utils/hooks';
import { session } from '@web/session';

class CurrencyRate extends Component {
  setup() {
    super.setup(...arguments);

    this.orm = useService('orm');
    this.action = useService('action');
    this.state = useState({ rate_usd: { rate: 0.0, symbol: '', currency_id: 0 } });

    onWillStart(async () => {
      const rateUsd = await this.orm.call('res.currency', 'exchange_rate_usd', [
        session.company_id,
      ]);
      this.state.rate_usd = rateUsd;
    });
  }

  get rateUsd() {
    const { rate, symbol } = this.state.rate_usd;
    return `${symbol} ${rate.toFixed(2)}`;
  }

  _openCurrencyRates() {
    const { currency_id } = this.state.rate_usd;
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Moneda USD',
      res_model: 'res.currency',
      view_mode: 'form',
      views: [[false, 'form']],
      res_id: currency_id,
      target: 'new',
    });
  }
}

CurrencyRate.template = 'CurrencyRate';
CurrencyRate.components = { Dropdown, DropdownItem };
export const currencyRate = { Component: CurrencyRate };

registry.category('systray').add('CurrencyRate', currencyRate, { sequence: 1 });
