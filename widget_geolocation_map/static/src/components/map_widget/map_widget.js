/** @odoo-module **/

import { registry } from '@web/core/registry';
import { standardFieldProps } from '@web/views/fields/standard_field_props';
import { Component, useState, useRef } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';
import { MapPopover } from '../map_popover/map_popover';

export class MapWidget extends Component {
  static template = 'widget_geolocation_map.MapWidget';
  static components = {};
  static props = {
    ...standardFieldProps,
  };
  setup() {
    this.popover = useService('popover');
    this.popupRef = useRef('popupRef');
    this.state = useState({
      coordinates: this.getCoordinates(),
      isPopoverOpen: false,
    });
  }

  getCoordinates() {
    const value = this.props.record.data[this.props.name];
    try {
      if (typeof value === 'string') {
        return JSON.parse(value);
      } else if (typeof value === 'object') {
        return value;
      }
      return { latitude: 0.0, longitude: 0.0 };
    } catch (error) {
      console.error('Error while parsing coordinates', error);
      return { latitude: 0.0, longitude: 0.0 };
    }
  }

  openMapPopover() {
    if (!this.state.isPopoverOpen) {
      this.popover.add(
        this.popupRef.el,
        MapPopover,
        {
          coordinates: this.state.coordinates,
          save: (newCoordinates) => {
            this.state.coordinates = newCoordinates;
            this.props.record.update({
              [this.props.name]: newCoordinates,
            });
          },
          close: () => {
            this.state.isPopoverOpen = false;
          },
        },
        {
          position: 'bottom',
          onClose: () => {
            this.state.isPopoverOpen = false;
          },
        }
      );
    }
    this.state.isPopoverOpen = true;
  }
}

const mapWidget = {
  displayName: 'Map Widget',
  component: MapWidget,
  supportedTypes: ['json'],
  extractProps: ({ attrs }) => ({
    name: attrs.name,
  }),
};

registry.category('fields').add('geolocation_map', mapWidget);
