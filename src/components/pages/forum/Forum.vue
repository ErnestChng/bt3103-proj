<template>
  <div id="forumPage" :style="{backgroundImage: `url(${image})`}">
    <div id="searchBarPlaceHolder">
      <SearchBar></SearchBar>
    </div>

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
import SearchBar from "@/components/pages/forum/SearchBar";
import CreateForumPost from "@/components/pages/forum/CreateForumPost";
import database from "@/firebase";

export default {
  data() {
    return {
      image: home,
      posts: []
    };
  },
  components: {
    ForumPostPlaceHolder,
    SearchBar,
    CreateForumPost
  },
  methods: {
    fetchItems: function() {
      database.collection("forumposts").get().then((querySnapShot) => {
        let item = {}
        querySnapShot.forEach(doc => {
          item = doc.data()
          item.show = false
          this.posts.push(item)
        })
      })
      alert("Posts updated!")
    }
  },
  created() {
    this.fetchItems()
  }
};
</script>

<style scoped>
#searchBarPlaceHolder {
  position: absolute;
  width: 50%;
  top: 0;
  height: 100px;
}

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
  color: #FFFFFF;
  font-size: 20px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
}

.divider {
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 20px;
  height: 5px;
  width: 200px;
}
</style>