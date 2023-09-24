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
        max-width="450"
        min-width="280"
        outlined
      >
        <!-- <v-card-title
          >{{ infoCard.nomeabrev }} ({{ infoCard.sigla }}, gid:
          {{ infoCard.gid }})</v-card-title
        >
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Administração</v-card-subtitle>
        <v-card-text>{{ infoCard.administra }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Ano</v-card-subtitle>
        <v-card-text>{{ infoCard.ano }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Área (ha)</v-card-subtitle>
        <v-card-text>{{ infoCard.area_ha }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Situação</v-card-subtitle>
        <v-card-text>{{ infoCard.situacao }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Decreto</v-card-subtitle>
        <v-card-text>{{ infoCard.decreto }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Lei</v-card-subtitle>
        <v-card-text>{{ infoCard.lei }}</v-card-text>
        <v-divider class="mx-4"></v-divider> -->
        <v-card-actions>
          <v-btn outlined rounded text @click="closeCard"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </l-control>
  </div>
</template>
<script>
import geojsonData from "../../static/ucs_estaduais.json";

export default {
  data() {
    return {
      geojson: geojsonData,
      // infoCard: {
      //   gid: null,
      //   nomeabrev: "",
      //   sigla: "",
      //   administra: "",
      //   ano: null,
      //   situacao: "",
      //   decreto: "",
      //   lei: "",
      //   area_ha: null,
      // },
    };
  },

  computed: {
    show() {
      if (
        this.$store.state.layers.layerActive == "ucsestaduais" &&
        this.infoCard.gid
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
          weight: 2,
          color: "#a67e0f",
          opacity: 1,
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          `
          <div>
            ${feature.properties.NomeUC}
            </div>
            `
        );

        layer.on("click", (e) => {
          // this.$store.commit("layers/change", { name: "ucsestaduais" });
          // this.infoCard.gid = feature.properties.gid;
          // this.infoCard.nomeabrev = feature.properties.nomeabrev;
          // this.infoCard.sigla = feature.properties.sigla;
          // this.infoCard.administra = feature.properties.administra;
          // this.infoCard.ano = feature.properties.ano;
          // this.infoCard.situacao = feature.properties.situacao;
          // this.infoCard.decreto = feature.properties.decreto;
          // this.infoCard.lei = feature.properties.lei;
          // this.infoCard.area_ha = feature.properties.area_ha;
          // console.log(feature.properties);
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
<style>
path.leaflet-interactive:focus {
  outline: none;
}
</style>