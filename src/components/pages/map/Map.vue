<template>
  <div style="position:relative">
    <l-map style="height: 700px;z-index: 1" :zoom="zoom" :center="center" :options="{zoomControl: false}">
      <l-control-zoom position="bottomright"></l-control-zoom>
      <l-tile-layer :url="url"></l-tile-layer>

      <div v-if="datacollection.Polyclinics.show">
        <l-marker v-for="mark in datacollection.Polyclinics.data" :lat-lng="[mark.lat, mark.long]" :key="mark.title">
          <l-icon>
            <img :src="datacollection.Polyclinics.img" style="height:40px;width:40px" alt="polyclinics">
          </l-icon>
          <l-tooltip style="text-align: left">{{ mark.name }}<br>Tel: {{ mark.tel }}<br>Hours: {{ mark.hours }}
            <br>Address: {{ mark.address }}
          </l-tooltip>
        </l-marker>
      </div>

      <div v-if="datacollection.SASH_for_Children.show">
        <l-marker v-for="mark in datacollection.SASH_for_Children.data" :lat-lng="[mark.lat, mark.long]"
                  :key="mark.title">
          <l-icon>
            <img :src="datacollection.SASH_for_Children.img" style="height:40px;width:40px" alt="sash">
          </l-icon>
          <l-tooltip style="text-align: left">{{ mark.name }}<br>Tel: {{ mark.tel }}
            <br>Hours: {{ mark.hours }}
            <br>Address: {{ mark.address }}
          </l-tooltip>
        </l-marker>
      </div>

    </l-map>
    <v-select multiple :options="icons" label="title" @input="setSelected" class="inner">
      <template slot="option" slot-scope="option">
        <img :src="option.cardImage" style="height:40px;width:40px" alt="card image">
        <span style="margin-left: 20px">{{ option.title }}</span>
      </template>
    </v-select>
    <!--    <div>{{ datacollection }}</div>-->
  </div>
</template>

<script>
// import L from 'leaflet';
import {LControlZoom, LIcon, LMap, LMarker, LTileLayer, LTooltip} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import database from '../../../firebase.js';
import polyclinics_img from "@/assets/polyclinics.png";
import gps_img from "@/assets/gps.png";
import sash_img from "@/assets/sash.png";
import sashforchildren_img from "@/assets/sashforchildren.png";

export default {
  props: ['options'],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip,
    LControlZoom,
    vSelect
  },
  data() {
    return {
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=c76b00b2-2389-4b8b-bf94-517622dcddf9',
      zoom: 12,
      center: [1.3521, 103.8198],
      loaded: false,
      datacollection: {
        "Polyclinics": {img: polyclinics_img, data: null, show: false},
        "GPs": {img: gps_img, data: null, show: false},
        "SASH": {img: sash_img, data: null, show: false},
        "SASH_for_Children": {img: sashforchildren_img, data: null, show: false}
      },
      icons: [
        {title_code: "Polyclinics", title: "Polyclinics", cardImage: polyclinics_img},
        {title_code: "GPs", title: "GPs", cardImage: gps_img},
        {title_code: "SASH", title: "SASH", cardImage: sash_img},
        {title_code: "SASH_for_Children", title: "SASH for Children", cardImage: sashforchildren_img}
      ]
    };
  },
  created() {
    var arr = ["Polyclinics", "SASH_for_Children"];
    var count = arr.length;
    for (var i = 0; i < count; i++) {
      var locations = arr[i];
      let temp = [];
      database.collection(`mappage/markers/${locations}`).get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          var location = {
            name: doc.data().name,
            tel: doc.data().tel,
            address: doc.data().address,
            hours: doc.data().hours,
            lat: doc.data().lat,
            long: doc.data().long
          };
          temp.push(location);
        });
      });
      if (locations === 'GPs') {
        this.datacollection.GPs["data"] = temp;
      } else if (locations === "Polyclinics") {
        this.datacollection.Polyclinics["data"] = temp;
      } else if (locations === "SASH") {
        this.datacollection.SASH["data"] = temp;
      } else if (locations === "SASH_for_Children") {
        this.datacollection.SASH_for_Children["data"] = temp;
      }
    }
  },
  methods: {
    setSelected(value) {
      var value_title = value.map(a => a.title_code);
      for (let obj in this.datacollection) {
        this.datacollection[obj].show = false;
      }
      for (let obj_check in this.datacollection) {
        if (value_title.includes(obj_check)) {
          this.datacollection[obj_check].show = true;
        }
      }
    }
  }
};
</script>

<style scoped>
.inner {
  position: absolute;
  top: 25px;
  left: 16px;
  margin-bottom: 900px;
  width: 250px;
  z-index: 2
}
</style>