<template>
  <div id="map-wrap">
    <rootMap :zoom="rootMapProps.zoom" :center="rootMapProps.center">
      <baseMap
        v-for="baseMap in baseLayers"
        :key="baseMap.name"
        :url="baseMap.url"
        :attribution="baseMap.attribution"
      ></baseMap>
      <l-wms-tile-layer
        v-for="wmsLayer in wmsLayers"
        :key="wmsLayer.name"
        :base-url="wmsLayer.url"
        :layers="wmsLayer.layers"
        :visible="wmsLayer.visible"
        :name="wmsLayer.name"
        :attribution="wmsLayer.attribution"
        :transparent="true"
        format="image/png"
        layer-type="base"
      >
      </l-wms-tile-layer>
    </rootMap>
  </div>
</template>
<script>
import baseLayers from "../assets/data/baselayers.json";
import wmsLayers from "../assets/data/wmslayers.json";

export default {
  data() {
    return {
      model: 1,
      drawer: true,
      mini: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      rootMapProps: {
        zoom: 3,
        center: [47.41322, -1.219482],
      },
      baseLayers: [
        {
          name: "Open Street",
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
          attribution: "teste",
        },
      ],
      wmsLayers: [
        {
          url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
          name: "Weather Data",
          visible: true,
          format: "image/png",
          layers: "nexrad-n0r-900913",
          transparent: true,
          attribution:
            "Weather data &copy; 2012 <a href='https://mesonet.agron.iastate.edu/docs/nexrad_mosaic/'>IEM Nexrad</a>",
        },
      ],
    };
  },
  mounted() {},
};
</script>
<style>
#map-wrap {
  height: 100%;
  width: 100%;
}
</style>
