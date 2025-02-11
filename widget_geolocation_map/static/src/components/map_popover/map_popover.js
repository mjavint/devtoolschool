/** @odoo-module **/

import { Component, useState, onWillStart, onMounted, useRef } from '@odoo/owl';
import { loadJS, loadCSS } from '@web/core/assets';

export class MapPopover extends Component {
  static template = 'widget_geolocation_map.MapPopover';
  static components = {};
  static props = {
    coordinates: { latitude: 0.0, longitude: 0.0 },
    save: Function,
    close: Function,
  };

  setup() {
    this.mapRef = useRef('map');
    this.state = useState({
      coordinates: this.props.coordinates,
    });

    onWillStart(async () => {
      await loadCSS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
      await loadJS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
    });

    onMounted(() => {
      this.initMap();
    });
  }

  initMap() {
    const map = L.map(this.mapRef.el).setView(
      [this.state.coordinates.latitude, this.state.coordinates.longitude],
      13
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this.marker = L.marker(
      [this.state.coordinates.latitude, this.state.coordinates.longitude],
      {
        draggable: true,
      }
    ).addTo(map);

    this.marker.on('dragend', (event) => {
      const { lat, lng } = event.target.getLatLng();
      this.state.coordinates = { latitude: lat, longitude: lng };
    });
  }

  saveCoordinates() {
    this.props.save(this.state.coordinates);
    this.props.close();
  }
}
