<template>
  <div>
    <l-geo-json
      :geojson="geojson"
      :options="options"
      :options-style="styleFunction"
    >
    </l-geo-json>
    <l-control>
      <v-card
        v-if="show"
        class="mx-auto"
        max-width="400"
        min-width="280"
        outlined
      >
        <v-card-title>{{ infoCard.terrai_nom }}</v-card-title>
        <v-card-text>{{ infoCard.terrai_cod }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Etnia(s)</v-card-subtitle>
        <v-card-text>{{ infoCard.etnia_nome }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Fase</v-card-subtitle>
        <v-card-text>{{ infoCard.fase_ti }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Outros</v-card-subtitle>
        <v-card-text>
          gid: {{ infoCard.gid }} | id {{ infoCard.id }}
        </v-card-text>
        <!-- <v-card-text> id: {{ infoCard.id }} </v-card-text> -->
        <v-card-actions>
          <v-btn outlined rounded text @click="closeCard"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </l-control>
  </div>
</template>
<script>
import geojsonData from "../../static/terras_indigenas.json";

export default {
  data() {
    return {
      geojson: geojsonData,
      infoCard: {
        etnia_nome: "",
        fase_ti: "",
        gid: null,
        id: null,
        terrai_cod: null,
        terrai_nom: "",
      },
    };
  },
  computed: {
    show() {
      if (
        this.$store.state.layers.layerActive == "terrasindigenas" &&
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
          weight: 3,
          color: "#035c0c",
          opacity: 1,
          fillColor: "#035c0c",
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          `
          <div>
            ${feature.properties.terrai_nom}
          </div>
          `
        );

        layer.on("click", (e) => {
          this.$store.commit("layers/change", { name: "terrasindigenas" });
          this.infoCard.etnia_nome = feature.properties.etnia_nome;
          this.infoCard.fase_ti = feature.properties.fase_ti;
          this.infoCard.gid = feature.properties.gid;
          this.infoCard.id = feature.properties.id;
          this.infoCard.terrai_cod = feature.properties.terrai_cod;
          this.infoCard.terrai_nom = feature.properties.terrai_nom;
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
