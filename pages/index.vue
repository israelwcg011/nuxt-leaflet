<template>
  <div id="map-wrap">
    <!-- Overlays -->
    <client-only>
      <l-map
        :zoom="rootMapProps.zoom"
        :center="rootMapProps.center"
        :options="rootMapProps.options"
      >
        <l-control position="topleft" class="l-control">
          <v-app-bar-nav-icon
            color="black"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </l-control>
        <l-tile-layer
          v-if="baseMapsGroup == 0"
          :url="baseMap.url"
          :attribution="baseMap.attribution"
        ></l-tile-layer>
        <l-wms-tile-layer
          v-if="baseMapsGroup == 1"
          :base-url="srtm30.url"
          :layers="srtm30.layers"
        ></l-wms-tile-layer>
        <l-tile-layer
          v-if="baseMapsGroup == 2"
          :url="worldImagery.url"
          :attribution="worldImagery.attribution"
        ></l-tile-layer>
        <LayersImoveisSigef
          v-if="layersActive.includes(0)"
        ></LayersImoveisSigef>
        <LayersTerrasIndigenas
          v-if="layersActive.includes(1)"
        ></LayersTerrasIndigenas>
        <!-- <LayersImoveisCar v-if="layersActive.includes(2)"> </LayersImoveisCar> -->
        <LayersLimiteMunicipal v-if="layersActive.includes(2)">
        </LayersLimiteMunicipal>
        <LayersUcsEstaduais
          v-if="layersActive.includes(3)"
        ></LayersUcsEstaduais>
        <LayersImoveisSigefClassificado
          v-if="layersActive.includes(4)"
        ></LayersImoveisSigefClassificado>
      </l-map>
    </client-only>

    <!-- Navigation drawer -->
    <v-navigation-drawer class="nav" v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Mapas base </v-list-item-title>
        </v-list-item-content>
        <v-list-item-group
          v-model="baseMapsGroup"
          active-class="deep-purple text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Open Street</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>SRTM 30 Colored Hillshade</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item>
            <v-list-item-title>World Imagery</v-list-item-title>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Camadas </v-list-item-title>
        </v-list-item-content>

        <v-list-item-group
          v-model="layersActive"
          multiple
          active-class="deep-purple text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Imóveis SIGEF</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Terras indígenas</v-list-item-title>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-title>Imóveis Car</v-list-item-title>
          </v-list-item> -->
          <v-list-item>
            <v-list-item-title>Limite municipal</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Unidades de conservação</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>SIGEF classificado</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Pesquisar coordenada
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-text-field
            v-model="coordinates"
            label="latitude, longitude"
            solo
            @keydown.enter="findCoordinate"
          ></v-text-field>
        </v-list-item-content>
      </v-list>
    </v-navigation-drawer>
    <Dialog
      class="dialog"
      :visible="dialogProps.dialogShow"
      :color="dialogProps.color"
      :title="dialogProps.title"
      :text="dialogProps.text"
      @close="dialogProps.dialogShow = false"
    ></Dialog>
  </div>
</template>
<script>
import Dialog from "../components/Dialog.vue";

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      drawer: false,
      baseMapsGroup: 0,
      enableTooltip: true,
      baseMapActive: null,
      layersActive: [],
      geojson: null,
      coordinates: "",
      dialogProps: {
        dialogShow: false,
        color: "",
        title: "",
        text: "",
      },
      rootMapProps: {
        zoom: 9,
        center: [2.820831, -60.730241],
        options: { zoomControl: false },
      },
      baseMap: {
        name: "Open Street",
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      },
      srtm30: {
        url: "http://ows.mundialis.de/services/service?",
        layers: "SRTM30-Colored-Hillshade",
      },
      worldImagery: {
        name: "World Imagery",
        url: "https://tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png",
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      },
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    imRobotOptions() {
      return {
        onEachFeature: this.imRobotFeatureFunction,
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>code:" +
            feature.properties.code +
            "</div><div>nom: " +
            feature.properties.nom +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    },
    imRobotFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          `
          <div>
            ${feature.properties.situacao_i}
            </div>
            `
        );
      };
    },
  },
  watch: {
    layersActive() {
      console.log(this.layersActive);
    },
  },
  async created() {
    const response = await fetch(
      "https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson"
    );
    const data = await response.json();
    this.geojson = data;
  },
  methods: {
    findCoordinate(event) {
      event.preventDefault();
      try {
        let coordinatesParsed = this.coordinates.replace(" ", "");
        let [latitude, longitude] = coordinatesParsed.split(",");
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        if (latitude && longitude) {
          if (latitude >= -180 && latitude <= 180) {
            if (longitude >= -90 && longitude <= 90) {
              this.rootMapProps.center = [latitude, longitude];
              this.rootMapProps.zoom = 14;
            }
          }
        } else {
          this.dialogProps.title = "Erro";
          this.dialogProps.text =
            "Coordenadas inseridas inválidas. Por favor, verifique se as coordenadas estão no formato 'Latitude, Longitude', onde Latitude deve estar entre os números -180 e 180 e Longitude deve estar entre os números -90 e 90. Lembre-se também de colocar vírgula entre os dois números, como por exemplo '2, 4', ou '-60.2, 40.23'.";
          this.dialogProps.color = "red lighten-1";
          this.dialogProps.dialogShow = true;
        }
      } catch (error) {
        this.dialogProps.title = "Erro";
        this.dialogProps.text =
          "Coordenadas inseridas inválidas. Por favor, verifique se as coordenadas estão no formato 'Latitude, Longitude', onde Latitude deve estar entre os números -180 e 180 e Longitude deve estar entre os números -90 e 90. Lembre-se também de colocar vírgula entre os dois números, como por exemplo '2, 4', ou '-60.2, 40.23'.";
        this.dialogProps.color = "red lighten-1";
        this.dialogProps.dialogShow = true;
      }
    },
  },
  mounted() {
    console.log(this.terrasIndigenas);
  },
};
</script>
<style>
#map-wrap {
  height: 100%;
  width: 100%;
}
.nav {
  z-index: 1000;
}
.dialog {
  z-index: 1000;
}

.zindex {
  z-index: 1000;
}

path.leaflet-interactive:focus {
  outline: none;
}
</style>
