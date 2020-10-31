<template>
  <div>
    <h1>COVID-19 Updates and Annoucements</h1>
    <table class="table">
      <thead style="background: #2D3F55; color: white;">
      <tr style='width:18%'>
        <td class="border"><strong>Date</strong></td>
        <td class="border"><strong>Title</strong></td>
      </tr>
      </thead>

      <tbody style="border: 5px solid #990000; box-sizing: border-box; border-image: none;">
      <tr v-for="item in itemsList" v-bind:key="item.id">
        <td class="border" style="width:18%">{{item.Date}}</td>
        <td class="border">{{item.Title}}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import home from "@/assets/home2.jpg"
import database from '@/firebase.js'

export default {
  data() {
    return {
      image: home,
      itemsList: []
    };
  },
  methods: {
    /* fetches items from database */
    fetchItems: function () {
      var count = 1
      database.collection('newspage').get().then((querySnapShot) => {
        console.log('READING FROM DATABASE')
        let item = {}
        querySnapShot.forEach(doc => {
          item = doc.data()
          item.id = count
          console.log(item)
          console.log(item.Date)
          this.itemsList.push(item)
          count += 1
        })
        console.log('done')
      })
    }
  },
  // Life cycle methods
  created(){
    this.fetchItems()
  },
};
</script>

<style scoped>
.table {
  margin-left:100px;
  margin-right:100px;

}
.border {
  border: solid 1px lightgrey
}
</style>