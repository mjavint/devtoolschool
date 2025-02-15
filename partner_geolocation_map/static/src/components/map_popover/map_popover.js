/** @odoo-module **/

import { Component, useState, onWillStart, onMounted, useRef } from "@odoo/owl";
import { loadJS, loadCSS } from "@web/core/assets";

export class MapPopover extends Component {
  static template = "partner_geolocation_map.MapPopover";
  static components = {};
  static props = {
    coordinates: { latitude: 0.0, longitude: 0.0 },
    save: Function,
    close: Function,
  };

  
  async updateAddressFromCoordinates(lat, lng) {
    try {
      const geocodeData = await this.reverseGeocode(lat, lng);
      console.log("using geocode ",geocodeData);
      this.state.address = this.formatAddress(geocodeData);
      console.log("using deagable ",this.state.address);
      
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      this.state.address = this.formatAddress({});
    }
  }

  setup() {
    this.mapRef = useRef("map");
    this.state = useState({
      coordinates: this.props.coordinates,
      address:{}
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

     await this.fetch_current_corrdinates()
    });

    onMounted(() => {
      this.initMap();
    });
  }

  async fetch_current_corrdinates(){
    const geocodeData = await this.reverseGeocode(this.state.coordinates.latitude, this.state.coordinates.longitude);
    this.state.address = this.formatAddress(geocodeData, 'drag');
  }
  
  initMap() {
    this.map = L.map(this.mapRef.el).setView(
      [this.state.coordinates.latitude, this.state.coordinates.longitude],
      13
    );
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);
    
    // Initialize geocoder control
    this.geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    }).addTo(this.map);
    
    // Initialize draggable marker with popup
    this.marker = L.marker(
      [this.state.coordinates.latitude, this.state.coordinates.longitude],
      {
        draggable: true,
        autoPan: true,
      }
    ).addTo(this.map);


    // Handle marker drag end
    this.marker.on("dragend", async (event) => {
      const { lat, lng } = event.target.getLatLng();
      this.state.coordinates = { latitude: lat, longitude: lng };
      try {
        const geocodeData = await this.reverseGeocode(lat, lng);
        this.state.address = this.formatAddress(geocodeData, 'drag');
        console.log("Address from drag:", this.state.address);
      } catch (error) {
        console.error("Drag reverse geocoding failed:", error);
      }
    });
    
    // Handle geocoder search result
    this.geocoder.on("markgeocode", async(event) => {
      const { lat, lng } = event.geocode.center;
      this.marker.setLatLng([lat, lng]);
      this.map.setView([lat, lng], this.map.getZoom());
      // Get initial address
      this.state.address = this.formatAddress(event.geocode, 'search');
      console.log("Address from search:", this.state.address);
      this.state.coordinates = { latitude: lat, longitude: lng };
    });
  }
  
  async reverseGeocode(lat, lng) {
    // Use a fixed zoom level for detailed information (as per your provided URL)
    const zoom = 18;
    // Construct the URL for Nominatim reverse geocoding in JSON format.
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=${zoom}&addressdetails=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Odoo/1.0 (contact@yourdomain.com)'
      }
    });
    if (!response.ok) {
      throw new Error(`Network response was not OK: ${response.statusText}`);
    }
    return await response.json();
  }  
  
  formatAddress(geocodeData, source) {
    // Handle different data structures from search vs drag
    const properties = source === 'search' ? 
      geocodeData.properties?.address : 
      geocodeData.address;

    return {
      street: source === 'search' ? geocodeData.name : geocodeData.display_name,
      city: properties?.city || properties?.town || properties?.village || '',
      state: properties?.state || '',
      zip: properties?.postcode || '',
      country: properties?.country || '',
      country_code: properties?.country_code || ''
    };
  }
  saveCoordinates() {
    this.props.save(this.state.coordinates,this.state.address);
    this.props.close();
  }
}
