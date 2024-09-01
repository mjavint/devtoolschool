/** @odoo-module **/

import { Component } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';
import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog';

export class PostItem extends Component {
  setup() {
    this.notificationService = useService('notification');
    this.dialogService = useService('dialog');
  }

  showNotification() {
    this.notificationService.add('Servicio ejecutado Exitosamente', {
      title: 'Uso de Notificaciones',
      type: 'success',
      sticky: false,
      className: 'rounded-3',
      onClose: () => {
        console.log('Salimos de la notificación');
      },
      buttons: [
        {
          name: 'Show Again',
          onClick: () => {
            this.showNotification();
          },
          primary: true,
        },
        {
          name: 'Other',
          onClick: () => {
            console.log('Otras acciones');
          },
        },
      ],
    });
  }

  showDialog() {
    this.dialogService.add(
      ConfirmationDialog,
      {
        title: 'Servicio Dialogo',
        body: 'Estas seguro de que deseas continuar la accion?',
        confirm: () => {
          console.log('Confirmado');
        },
        cancel: () => {
          console.log('Cancelado');
        },
      },
      {
        onClose: () => {
          console.log('Se ejecuta cuando se cierra el dialogo');
        },
      }
    );
  }
}

PostItem.template = 'owl_service_hooks.PostItem';
