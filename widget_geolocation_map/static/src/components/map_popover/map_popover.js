/** @odoo-module **/

import { Component, useState, onWillStart, onMounted, useRef } from "@odoo/owl";
import { loadJS, loadCSS } from "@web/core/assets";

export class MapPopover extends Component {
  static template = "widget_geolocation_map.MapPopover";
  static components = {};
  static props = {
    coordinates: { latitude: 0.0, longitude: 0.0 },
    save: Function,
    close: Function,
  };

  setup() {
    this.mapRef = useRef("map");
    this.state = useState({
      coordinates: this.props.coordinates,
    });

    onWillStart(async () => {
      await loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
      await loadJS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
      await loadJS(
        "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
      );
      await loadCSS(
        "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
      );
      await loadJS(
        "https://cdn.jsdelivr.net/npm/leaflet.control.opacity@1.6.0/dist/L.Control.Opacity.min.js"
      );
      await loadJS(
        "https://unpkg.com/leaflet-transparency@latest/leaflet-transparency.js"
      );
      await loadCSS(
        "https://cdn.jsdelivr.net/npm/leaflet.control.opacity@1.6.0/dist/L.Control.Opacity.css"
      );
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

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Initialize geocoder control
    this.geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    }).addTo(map);

    // Initialize draggable marker with popup
    this.marker = L.marker(
      [this.state.coordinates.latitude, this.state.coordinates.longitude],
      {
        draggable: true,
        autoPan: true,
      }
    )
      .addTo(map)

    // Handle marker drag end
    this.marker.on("dragend", async (event) => {
      const { lat, lng } = event.target.getLatLng();
      this.state.coordinates = { latitude: lat, longitude: lng };
    });

    // Handle geocoder search result
    this.geocoder.on("markgeocode", (event) => {
      const { lat, lng } = event.geocode.center;
      this.marker
        .setLatLng([lat, lng])
      map.setView([lat, lng], map.getZoom());
      this.state.coordinates = { latitude: lat, longitude: lng };
    });
   
  }



  saveCoordinates() {
    this.props.save(this.state.coordinates);
    this.props.close();
  }
}
