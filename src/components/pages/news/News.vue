<template>
  <div id="container">
    <h1 style="padding: 20px">COVID-19 Updates and Announcements</h1>
    <table class="table">
      <thead style="background: #2d3f55; color: white;">
      <tr style='width:18%'>
        <td class="border"><strong>Date</strong></td>
        <td class="border"><strong>Title</strong></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in itemsList" :key="item.Id">
        <td class="border" style="width:18%">{{ item.Date }}</td>
        <td class="border">{{ item.Title }}. <a :href="item.Link"> See more.</a></td>
      </tr>
      </tbody>
    </table>
    <p style="padding:40px; font-style:italic">
      Note: News information is taken from highly credible sources
      (<a href="https://www.gov.sg/article/covid-19-updates-and-announcements">https://www.gov.sg/article/covid-19-updates-and-announcements</a>)
    </p>
  </div>
</template>

<script>
import home from "@/assets/home2.jpg";
import database from '@/firebase.js';
import aboutvid from "@/assets/aboutvid2.mp4";

export default {
  data() {
    return {
      image: home,
      itemsList: [],
      background: aboutvid
    };
  },
  methods: {
    /* fetches items from database */
    fetchItems: function () {
      database.collection('newspage').orderBy('Id', 'desc').get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach(doc => {
          item = doc.data();
          this.itemsList.push(item);
        });
      });
    }
  },
  // Life cycle methods
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#container {
  min-height: calc(100vh - 100px - 80px - 40px);
}

.table {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.border {
  border: solid 1px lightgrey
}
</style>