import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LWMSTileLayer, LPolygon } from 'vue2-leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-wms-tile-layer', LWMSTileLayer);
Vue.component('l-polygon', LPolygon)