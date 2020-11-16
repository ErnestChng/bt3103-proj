<template>
  <div id="forumPage" :style="{backgroundImage: `url(${image})`}">
    <div id="forumBlock">
      <ForumPostPlaceHolder
          v-for="post in posts"
          v-bind:user="post.user"
          v-bind:subject="post.subject"
          v-bind:body="post.body"
          v-bind:timestamp="post.timestamp"
          v-bind:category="post.category"
          v-bind:likes="post.likes"
          v-bind:replies="post.replies"
          v-bind:id="post.id"
          v-bind:key="post.key"
      ></ForumPostPlaceHolder>
    </div>
    <CreateForumPost></CreateForumPost>
  </div>
</template>

<script>
import home from "@/assets/home2.jpg";
import ForumPostPlaceHolder from "@/components/pages/forum/ForumPostPlaceHolder";
import CreateForumPost from "@/components/pages/forum/CreateForumPost";
import database from "@/firebase";

export default {
  data() {
    return {
      image: home,
      posts: [],
      keyword: this.$route.params.keyword
    };
  },
  components: {
    ForumPostPlaceHolder,
    CreateForumPost
  },
  methods: {
    fetchItems: function () {
      this.posts = [];
      database.collection("forumposts").get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach(doc => {
          item = doc.data();
          item.show = false;
          if (item.id !== "0") {
            this.posts.push(item);
          }
        });
      });
      console.log("All posts updated in forum page!");
    },
    fetchItemsWithKeyword: function (string) {
      string = string + "";
      this.posts = [];
      database.collection("forumposts").get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach(doc => {
          item = doc.data();
          item.show = false;

          if (item.user.includes(string) ||
              item.subject.includes(string) ||
              item.body.includes(string) ||
              item.category.includes(string)) {
            this.posts.push(item);
          }
        });
      });
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = from.params.id;
    },
    keyword: function () {
      this.fetchItemsWithKeyword(this.keyword);
    }
  },
  created() {
    this.fetchItems(this.keyword);
    console.log("keyword passed: " + this.keyword);
  }
};
</script>

<style scoped>
#forumBlock {
  position: absolute;
  width: 70%;
  height: 80%;
  top: 100px;
  display: inline-block;
  overflow: scroll;
  overflow-x: hidden;
}

#forumPage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  min-height: calc(100vh - 100px - 80px - 40px);
  color: #FFFFFF;
  font-size: 20px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>