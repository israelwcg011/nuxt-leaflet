<template>
  <div>
    <l-geo-json
      :geojson="geojson"
      :options="options"
      :options-style="styleFunction"
    ></l-geo-json>
    <l-control>
      <v-card
        v-if="show"
        class="mx-auto"
        max-width="400"
        min-width="280"
        outlined
      >
        <v-card-title
          >{{ infoCard.nm_mun }} (gid: {{ infoCard.gid }})</v-card-title
        >
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle> Área (Km quadrado)</v-card-subtitle>
        <v-card-text>{{ infoCard.area_km2 }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle> Código municipal</v-card-subtitle>
        <v-card-text>{{ infoCard.cd_mun }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle> UF </v-card-subtitle>
        <v-card-text>{{ infoCard.sigla_uf }}</v-card-text>
        <v-card-actions>
          <v-btn outlined rounded text @click="closeCard"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </l-control>
  </div>
</template>
<script>
import geojsonData from "../../static/limite_municipal.json";

export default {
  data() {
    return {
      geojson: geojsonData,
      infoCard: {
        area_km2: null,
        cd_mun: "",
        gid: null,
        nm_mun: "",
        sigla_uf: "",
      },
    };
  },

  computed: {
    show() {
      if (
        this.$store.state.layers.layerActive == "limitemunicipal" &&
        this.infoCard.area_km2
      ) {
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
    styleFunction() {
      return () => {
        return {
          weight: 3,
          color: "#000000",
          opacity: 1,
          fillColor: "#035c0c",
          fillOpacity: 0
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          `
          <div>
            ${feature.properties.nm_mun}
            </div>
            `
        );

        layer.on("click", (e) => {
          this.$store.commit("layers/change", { name: "limitemunicipal" });
          this.infoCard.area_km2 = feature.properties.area_km2;
          this.infoCard.cd_mun = feature.properties.cd_mun;
          this.infoCard.gid = feature.properties.gid;
          this.infoCard.nm_mun = feature.properties.nm_mun;
          this.infoCard.sigla_uf = feature.properties.sigla_uf;
          console.log(feature.properties);
        });
      };
    },
  },
  methods: {
    closeCard() {
      this.$store.commit("layers/change", { name: "" });
    },
  },
};
</script>
