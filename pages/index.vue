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
        <l-geo-json
          v-if="layersActive.includes(0)"
          :geojson="geojson"
          :options="options"
        ></l-geo-json>
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

          <v-list-item>
            <v-list-item-title>World Imagery</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
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
            <v-list-item-title>Pays de la Loire</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>
         -->
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      baseMapsGroup: 0,
      enableTooltip: true,
      baseMapActive: null,
      layersActive: [],
      geojson: null,
      coordinates: "",
      rootMapProps: {
        zoom: 9,
        center: [48.11788, -0.52042],
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
  },
  watch: {
    layersActive() {
      console.log(this.layersActive);
    },
    baseMapsGroup() {
      console.log(this.baseMapsGroup);
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
          console.log("Something went wrong.");
        }
        console.log(latitude);
        console.log(longitude);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {},
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
</style>
