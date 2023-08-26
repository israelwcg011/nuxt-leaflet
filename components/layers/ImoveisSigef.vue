<template>
  <div>
    <l-geo-json :geojson="geojson" :options="options"></l-geo-json>
    <l-control>
      <v-card v-if="show" class="mx-auto" max-width="400" outlined>
        <v-card-title>{{ infoCard.nome_area }}</v-card-title>
        <v-card-text>{{ infoCard.parcela_co }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Situação</v-card-subtitle>
        <v-card-text>{{ infoCard.situacao_i }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Status</v-card-subtitle>
        <v-card-text>{{ infoCard.status }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>Datas</v-card-subtitle>
        <v-card-text> Submissão: {{ infoCard.data_submi }} </v-card-text>
        <v-card-text> Aprovação: {{ infoCard.data_aprov }} </v-card-text>
        <v-card-actions>
          <v-btn outlined rounded text @click="closeCard"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </l-control>
  </div>
</template>
<script>
import geojsonData from "../../static/imoveis_sigef.json";

export default {
  data() {
    return {
      geojson: geojsonData,
      infoCard: {
        art: "",
        codigo_imo: "",
        data_aprov: "",
        data_submi: "",
        municipio_: null,
        nome_area: "",
        parcela_co: "",
        registro_d: null,
        registro_m: null,
        rt: "",
        situacao_i: "",
        status: "",
        uf_id: 14,
      },
      drawerContent: {
        art: "",
      },
    };
  },
  computed: {
    show() {
      if (this.$store.state.layers.layerActive == "imoveissigef") {
        return true;
      } else {
        return false;
      }
    },
    dataAprovComputed() {},
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          `
          <div>
            ${feature.properties.nome_area}
            </div>
            `
        );

        layer.on("click", (e) => {
          this.$store.commit("layers/change", { name: "imoveissigef" });
          this.infoCard.nome_area = feature.properties.nome_area;
          this.infoCard.parcela_co = feature.properties.parcela_co;
          this.infoCard.situacao_i = feature.properties.situacao_i;
          this.infoCard.status = feature.properties.status;
          this.infoCard.data_aprov = feature.properties.data_aprov;
          this.infoCard.data_submi = feature.properties.data_submi;
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
.zindex {
  z-index: 1000;
}
</style>
