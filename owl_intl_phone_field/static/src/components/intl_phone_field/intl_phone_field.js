/** @odoo-module **/

import { registry } from '@web/core/registry';
import { PhoneField } from '@web/views/fields/phone/phone_field';
import { onWillStart, onMounted, useRef, useState } from '@odoo/owl';
import { loadJS, loadCSS } from '@web/core/assets';
import { useService } from '@web/core/utils/hooks';

export class IntlPhoneField extends PhoneField {
  static props = {
    ...super.props,
    separateDialCode: { type: Boolean, optional: true },
    initialCountry: { type: String, optional: true },
    onlyCountries: { type: Array, optional: true },
  };
  setup() {
    super.setup();
    console.log('Inherit Widget Phone');

    this.phoneInput = useRef('input');
    this.state = useState({
      isValidNumber: false,
      iti: undefined,
    });

    this.notificationService = useService('notification');

    onWillStart(async () => {
      await loadCSS(
        '/owl_intl_phone_field/static/src/lib/intl-tel-input/build/css/intlTelInput.css'
      );
      await loadJS(
        '/owl_intl_phone_field/static/src/lib/intl-tel-input/build/js/intlTelInput.min.js'
      );
    });

    onMounted(() => {
      this.state.iti = intlTelInput(this.phoneInput.el, {
        separateDialCode: this.props.separateDialCode,
        initialCountry: this.props.initialCountry,
        onlyCountries: this.props.onlyCountries,
        utilsScript:
          '/owl_intl_phone_field/static/src/lib/intl-tel-input/build/js/utils.js',
      });
    });
  }
  validate() {
    if (this.state.iti) {
      this.state.isValidNumber = this.state.iti.isValidNumber();
    }
    if (this.state.isValidNumber) {
      this.notificationService.add('El teléfono es válido', {
        title: 'Validación del teléfono',
        type: 'success',
        sticky: false,
        className: 'rounded-3',
      });
    } else {
      this.notificationService.add('El teléfono no es válido', {
        title: 'Validación del teléfono',
        type: 'danger',
        sticky: false,
        className: 'rounded-3',
      });
    }
    console.log(this.state.isValidNumber);
  }
}

IntlPhoneField.template = 'owl_intl_phone_field.IntlPhoneField';

export const intlPhoneFieldProps = {
  component: IntlPhoneField,
  extractProps: ({ options }) => {
    return {
      separateDialCode: options.separate_dial_code,
      initialCountry: options.initial_country,
      onlyCountries: options.only_countries || [],
    };
  },
};
registry.category('fields').add('intl_phone', intlPhoneFieldProps);
