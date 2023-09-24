<template>
  <div>
    <l-geo-json :geojson="geojson" :options="options"></l-geo-json>
  </div>
</template>
<script>
import geojsonData from "../../static/limite_municipal.json";

export default {
  data() {
    return {
      geojson: geojsonData,
    };
  },
  computed: {
    show() {
      if (this.$store.state.layers.layerActive == "imoveiscar") {
        return true;
      } else {
        return false;
      }
    },
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        // layer.bindTooltip(
        //   `
        //   <div>
        //     ${feature.properties.nome_area}
        //     </div>
        //     `
        // );

        layer.on("click", (e) => {
          // this.$store.commit("layers/change", { name: "imoveissigef" });
          // console.log(feature.properties);
        });
      };
    },
  },
};
</script>
<style>
path.leaflet-interactive:focus {
  outline: none;
}
</style>
