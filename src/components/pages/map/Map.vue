<template>
  <div class="container">
      <l-map style="height: 700px;z-index: 1" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
      </l-map>
      <v-select multiple :options="['GPs', 'Polyclinics', 'SASH', 'SASH for children']" @input="setSelected" class="inner">
      </v-select>
    <div>{{ datacollection }}</div>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import database from '../../../firebase.js'

export default {
  props: ['options'],
  components: {
    LMap,
    LTileLayer,
    vSelect
  },
  data () {
    return {
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      zoom: 12,
      center: [1.3521, 103.8198],
      datacollection: {
        GPs: [],
        Polyclinics: [],
        SASH: [],
        SASH_for_children: []
      }
    };
  },
  methods: {
    setSelected(value) {
      var count = value.length
      for (var i = 0; i < count; i++) {
        var locations = value[i]
        database.collection('mappage/markers/GPs').get().then(querySnapShot => {
          querySnapShot.forEach(doc => {
            var location = {
              name: doc.data().name,
              tel: doc.data().tel,
              address: doc.data().address,
              hours: doc.data().hours
            }
            if (locations === 'GPs') {
              this.datacollection.GPs.push(location)
            } else if (locations === "Polyclinics") {
              this.datacollection.Polyclinics.push(location)
            } else if (locations === "SASH") {
              this.datacollection.SASH.push(location)
            } else if (locations === "SASH for children") {
              this.datacollection.SASH_for_children.push(location)
            }
          })
        })
    }
    }
  }
}
</script>

<style scoped>
.inner {
  position: absolute;
  top: 100px;
  left: 16px;
  margin-bottom: 900px;
  width: 200px;
  z-index: 2
}
.container{
  position: relative;
}
</style>