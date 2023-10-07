<template>
  <div>
    <l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction"></l-geo-json>
    <l-control>
      <v-card v-if="show" class="mx-auto" max-width="400" outlined>
        <v-card-title>{{
          infoCard.nome_area ? infoCard.nome_area : "Nome não informado"
        }}</v-card-title>
        <!-- <v-card-text>{{ infoCard.parcela_co }}</v-card-text> -->
        <v-divider class="mx-4"></v-divider>

        <v-card-subtitle>Código da parcela</v-card-subtitle>
        <v-card-text>{{ infoCard.parcela_co }}</v-card-text>
        <v-divider class="mx-4"></v-divider>

        <!-- <v-card-subtitle>Código do imóvel</v-card-subtitle>
        <v-card-text>{{
          infoCard.codigo_imo ? infoCard.codigo_imo : "Código não fornecido"
        }}</v-card-text>
        <v-divider class="mx-4"></v-divider> -->

        <!-- <v-card-subtitle>Object Id</v-card-subtitle>
        <v-card-text>{{ infoCard.OBJECTID }}</v-card-text>
        <v-divider class="mx-4"></v-divider> -->

        <v-card-subtitle>Informações</v-card-subtitle>
        <v-card-text>
          Área do imóvel: {{ Math.round(infoCard.areaimovel * 100) / 100 }} ha
        </v-card-text>
        <v-card-text>
          Área desmatada em 2008:
          {{ Math.round(infoCard.desm_2008 * 100) / 100 }} ha ({{
            Math.round(infoCard.pct_2008 * 100) / 100
          }}% do total)
        </v-card-text>
        <v-card-text>
          Área desmatada em 2023:
          {{ Math.round(infoCard.desm_2023 * 100) / 100 }} ha ({{
            Math.round(infoCard.pct_2023 * 100) / 100
          }}% do total)
        </v-card-text>
        <v-card-text
          >Variação de desmatamento:
          {{ Math.round(infoCard.variacao_2008_2023 * 100) / 100 }}
          ha</v-card-text
        >

        <v-card-actions>
          <v-btn outlined rounded text @click="closeCard"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </l-control>
  </div>
</template>
<script>
import geojsonData from "../../static/imoveis_desmatamento_apos_2008.json";

export default {
  data() {
    return {
      geojson: geojsonData,
      infoCard: {
        variacao_2008_2023: null,
        OBJECTID: null,
        areaimovel: null,
        codigo_imo: "",
        desm_2008: null,
        desm_2023: null,
        nome_area: "",
        parcela_co: "",
        pct_2008: null,
        pct_2023: null,
      },
    };
  },
  computed: {
    show() {
      if (
        this.$store.state.layers.layerActive == "imoveisdesmatapos2008" &&
        this.infoCard.codigo_imo
      ) {
        return true;
      } else {
        return false;
      }
    },
    // dataAprovComputed() {},
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      return () => {
        return {
          weight: 3,
          color: "#bf0d00",
          opacity: 1,
          fillColor: "#ffffff",
          fillOpacity: 0,
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          `
          <div>
            ${
              feature.properties.nome_area
                ? feature.properties.nome_area
                : "Nome não informado"
            }
            </div>
            `
        );

        layer.on("click", (e) => {
          this.$store.commit("layers/change", {
            name: "imoveisdesmatapos2008",
          });
          this.infoCard.variacao_2008_2023 = feature.properties["2008_2023"];
          this.infoCard.OBJECTID = feature.properties.OBJECTID;
          this.infoCard.areaimovel = feature.properties.areaimovel;
          this.infoCard.codigo_imo = feature.properties.codigo_imo;
          this.infoCard.desm_2008 = feature.properties.desm_2008;
          this.infoCard.desm_2023 = feature.properties.desm_2023;
          this.infoCard.nome_area = feature.properties.nome_area;
          this.infoCard.parcela_co = feature.properties.parcela_co;
          this.infoCard.pct_2008 = feature.properties.pct_2008;
          this.infoCard.pct_2023 = feature.properties.pct_2023;
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
<style>
path.leaflet-interactive:focus {
  outline: none;
}
</style>
