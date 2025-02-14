/** @odoo-module **/

import { registry } from '@web/core/registry';
import { standardFieldProps } from '@web/views/fields/standard_field_props';
import { Component, useState, useRef, onWillUpdateProps,onWillStart } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';
import { MapPopover } from '../map_popover/map_popover';
import { rpc } from "@web/core/network/rpc";

export class MapWidget extends Component {
  static template = 'partner_geolocation_map.MapWidget';
  static components = {};
  static props = {
    ...standardFieldProps,
  };
  setup() {
    this.popover = useService('popover');
    this.orm = useService('orm')
    this.popupRef = useRef('popupRef');
    this.state = useState({
      coordinates: this.getCoordinates(),
      isPopoverOpen: false,
    });

    onWillUpdateProps((nextProps) => {
    
      
      const newCoordinates = this.getCoordinates(nextProps);
      if (JSON.stringify(newCoordinates) !== JSON.stringify(this.state.coordinates)) {
        this.state.coordinates = newCoordinates;
      }

    });
  

  }

  getCoordinates(props = this.props) {
    const value = props.record.data[props.name];
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
      console.log(this.props);
      
      this.popover.add(
        this.popupRef.el,
        MapPopover,
        {
          coordinates: this.state.coordinates,
          save: async(newCoordinates,address) => {
            console.log("addresss in parrent",address)
            const data = await rpc('/partner/map_address',{ address: address})
      
            this.state.coordinates = newCoordinates;
            this.props.record.update({
              [this.props.name]: newCoordinates
            });
            if (this.props.record.resId){
              await this.orm.write(this.props.record._config.resModel, [this.props.record.resId],
                {
                    'state_id':data.state_id || false,
                    'street': data.street,
                    'city': data.city,
                    'zip': data.zip,
                    'country_id':data.country_id || false
  
                }
            );
            }
            // this.props.record.data["state_id"]= addressData.state_id
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
  displayName: 'Parnter Map Widget',
  component: MapWidget,
  supportedTypes: ['json'],
  extractProps: ({ attrs }) => ({
    name: attrs.name,
  }),
};

registry.category('fields').add('partner_geolocation_map', mapWidget);
