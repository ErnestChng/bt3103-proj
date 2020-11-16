<template>
  <div id="threadPage" :style="{backgroundImage: `url(${image})`}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="blockElements">
      <div id="thread">
        <div id="iconPlaceholder">
          <span id="icon"><i id="userIcon" class="fa fa-user"></i></span>
        </div>
        <div id="forumHeader">
          <h3 id="forumTitle" class="text-display">{{ subject }}</h3>
          <p id="forumAuthorAndDate" class="text-display">by {{ userName }} in {{ category }} - {{ getDateDisplay() }}
            at {{ getTimeDisplay() }}</p>
        </div>
        <div id="buttonsPlaceholder">
          <i id="likeButton" class="fa fa-thumbs-up" v-on:click="pressLike()"></i>
          <p id="likeCounter">{{ likes }}</p>
          <i id="replyButton" class="fa fa-mail-reply" v-on:click="openModal"></i>
          <p id="replyCounter">{{ getNumReplies() }}</p>
        </div>
        <div id="forumDetailsPlaceHolder">
          <p id="forumDetailsText" class="text-display">{{ body }}</p>
        </div>
      </div>
      <div class="replies" id="repliesDiv">
        <Reply
            v-for="response in replies.responses"
            v-bind:sender="response.sender"
            v-bind:date="response.date"
            v-bind:body="response.body"
            v-bind:key="response.key"
        ></Reply>
      </div>
    </div>
    <div id="modalWindow" class="modal">
      <div class="modal-content">
        <span class="closeContainer"><span class="close" v-on:click="closeModal()">&times;</span></span>
        <div id="replyContentDisplay">
          <div id="replyContentHeader">
            <span id="titleDisplay">{{ subject }}</span>
          </div>
          <div id="postDetailsDisplay">
            <span class="text-display">
              by {{ userName }} in {{ category }} - {{ getDateDisplay() }} at {{ getTimeDisplay() }}
            </span>
          </div>
          <div id="postBodyDisplay" class="text-display">{{ body }}</div>
        </div>
        <textarea id="textArea" rows="10" cols="100" v-model="replyBody"></textarea>
        <div id="buttonPlaceholder">
          <button class="button" v-on:click="submit"><span>Submit</span></button>
        </div>
        <i style="position: absolute; bottom: 14px; left: 12px; font-size: 14px;">
          Note: Please be mindful on what is said on the forum. Let us spread positivity through our community.
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import home from "@/assets/home2.jpg";
import Reply from "@/components/pages/forum/Reply";
import database from "@/firebase";
import {mapGetters} from "vuex";

export default {
  name: "ForumThread.vue",
  components: {
    Reply
  },
  data() {
    return {
      id: this.$route.params.id,
      image: home,
      replyBody: "",
      isValid: false,
      hasLiked: false,
      userName: "",
      subject: "",
      body: "",
      timestamp: "",
      category: "",
      likes: "",
      replies: {
        count: "",
        responses: [{
          sender: "",
          date: "",
          body: ""
        }]
      }
    };
  },
  methods: {
    openModal: function () {
      document.getElementById("modalWindow").style.display = "block";
    },
    closeModal: function () {
      document.getElementById("modalWindow").style.display = "none";
    },
    submit: function () {
      if (this.isValid) {
        this.replies.count = parseInt(this.replies.count) + 1;
        this.replies.responses.push({
          sender: this.user.data.displayName,
          date: new Date().toUTCString(),
          body: this.replyBody
        });
        database.collection("forumposts").doc(this.id + "").update({
          replies: this.replies
        });
        console.log("successfully added reply");
      } else {
        alert("Field cannot be empty");
      }
    },
    pressLike: function () {
      if (!this.hasLiked) {
        document.getElementById("likeButton").style.color = "firebrick";
        this.hasLiked = true;
        var likesCountPlus = parseInt(this.likes) + 1;
        this.likes = likesCountPlus + "";
        database.collection("forumposts").doc(this.id + "").update({
          likes: parseInt(this.likes)
        });
      } else {
        document.getElementById("likeButton").style.color = "#808080";
        this.hasLiked = false;
        var likesCountMinus = parseInt(this.likes) - 1;
        this.likes = likesCountMinus + "";
        database.collection("forumposts").doc(this.id + "").update({
          likes: parseInt(this.likes)
        });
      }
    },
    getDateDisplay: function () {
      const timeOfPost = new Date(this.timestamp);
      const timeStampNow = new Date();
      const diffTime = Math.abs(timeStampNow.getMilliseconds() - timeOfPost.getMilliseconds());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        var pluralSuffixDay = "s";
        if (diffDays === 1) {
          pluralSuffixDay = "";
        }
        return diffDays.toString() + " day" + pluralSuffixDay + " ago";
      } else if (diffDays <= 31) {
        var pluralSuffixWeek = "s";
        if (diffDays === 1) {
          pluralSuffixWeek = "";
        }
        return Math.ceil(diffDays / 7) + " week" + pluralSuffixWeek + " ago";
      } else {
        return new Date(this.timestamp).toLocaleString().split(',')[0];
      }
    },
    getTimeDisplay: function () {
      var timeOfPost = new Date(this.timestamp);
      var hours = timeOfPost.getHours();
      var minutes = timeOfPost.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    },
    fetchPost: function () {
      database.collection("forumposts").get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach(doc => {
          item = doc.data();
          if (item.id === this.id) {
            this.userName = item.user;
            this.subject = item.subject;
            this.body = item.body;
            this.timestamp = item.timestamp;
            this.category = item.category;
            this.likes = item.likes;
            this.replies = item.replies;
            console.log("Retrieving data for forum thread");
            console.log("item.user : " + item.user);
          }
        });
      });
    },
    getNumReplies: function () {
      return this.replies.responses.length;
    }
  },
  watch: {
    replyBody: function () {
      this.isValid = this.replyBody !== "";
    },
    id: function () {
      database.collection("forumposts").get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach(doc => {
          item = doc.data();
          if (item.id === this.id) {
            this.userName = item.user;
            this.subject = item.subject;
            this.body = item.body;
            this.timestamp = item.timestamp;
            this.category = item.category;
            this.likes = item.likes;
            this.replies = item.replies;
            console.log("Retrieving data for forum thread");
            console.log("item.user : " + item.user);
          }
        });
      });
    }
  },
  created() {
    this.fetchPost();
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style scoped>
.blockElements {
  height: 100%;
  width: 100%;
  padding-top: 50px;
}

#postBodyDisplay {
  width: 100%;
  height: auto;
  min-height: 40px;
  word-wrap: break-word;
  font-size: 16px;
  text-shadow: none;
  text-align: left;
  padding: 20px;
  overflow: scroll;
  overflow-x: hidden;
  background-color: snow;
}

#postDetailsDisplay {
  width: 100%;
  text-align: right;
  padding-right: 8px;
  background-color: snow;
  padding: 10px;
}

#postDetailsDisplay span {
  font-size: 14px;
}

#replyContentHeader {
  width: 100%;
  height: auto;
  min-height: 30px;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  text-shadow: none;
  text-align: left;
  padding: 20px;
  background-color: #cccccc;
}

#replyContentDisplay {
  width: 100%;
  height: auto;
  bottom: 0;
}

#buttonPlaceholder {
  height: max-content;
  position: relative;
  bottom: 0;
  margin-top: 10px;
}

button {
  background-color: #466386;
  border: none;
  outline: none;
  border-radius: 5px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 10px 2px;
  cursor: pointer;
  transition: 0.5s;
}

.button:active {
  background-color: #354a64;
  box-shadow: 0 1px #D8D8D8;
  transform: translateY(1px);
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: white;
  text-shadow: none;
  font-size: 16px;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 20px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

textarea {
  position: relative;
  padding: 8px;
  height: 350px;
  font-size: 14px;
}

/* The Close Button */
.close {
  color: #aaa;
  text-align: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  overflow-x: hidden;
}

/* Modal Content/Box */
.modal-content {
  background-color: #dee5ed;
  margin: 10% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 50%;
  color: black;
  height: 75%;
}

#forumHeader {
  position: absolute;
  right: 15%;
  bottom: 0;
  width: 70%;
  height: auto;
  padding-top: 5%;
  max-height: 150px;
}

#thread {
  width: 60%;
  max-height: 40%;
  background-color: #e6f7ff;
  min-height: 15%;
  position: relative;
  border-radius: 5px 5px 5px 5px;
  display: inline-block;
  margin-bottom: 10%;
}

#repliesDiv {
  position: relative;
  width: 60%;
  height: fit-content;
  background-color: #ffffff;
  flex-direction: column-reverse;
  display: inline-block;
  overflow: scroll;
  overflow-x: hidden;
  max-height: 60%;
  padding: 2px;
  margin-top: 20px;
}

#likeButton {
  position: absolute;
  bottom: 4px;
  left: 10px;
  cursor: pointer;
  color: #808080;
  text-decoration: none;
  margin: 4px 2px;
  transition: 0.5s;
}

#replyButton {
  position: absolute;
  bottom: 4px;
  right: 35px;
  cursor: pointer;
  color: #808080;
  text-decoration: none;
  margin: 4px 2px;
  transition: 0.5s;
}

#replyButton:active {
  color: #2B2D42;
  box-shadow: 0 1px #D8D8D8;
  transform: translateY(1px);
}

#likeCounter {
  font-size: 15px;
  padding: 0;
  position: absolute;
  bottom: 0;
  line-height: 4px;
  left: 40px;
  color: #2c3e50;
  font-weight: bolder;
  text-shadow: none;
}

#replyCounter {
  font-size: 15px;
  padding: 0;
  position: absolute;
  bottom: 0;
  line-height: 4px;
  right: 20px;
  color: #2c3e50;
  font-weight: bolder;
  text-shadow: none;
}

#likeButton:active {
  color: firebrick;
  box-shadow: 0 1px #D8D8D8;
  transform: translateY(1px);
}


#threadPage {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 800px;
  color: #FFFFFF;
  font-size: 20px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  min-height: calc(100vh - 100px - 80px - 40px);
}

#iconPlaceholder {
  background-color: #e6f7ff;
  position: absolute;
  border-radius: 5px 0 0 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 15%;
}

#icon {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #2B2D42;
  display: inline-block;
  line-height: 60px;
  margin-top: 15%;
}

#forumTitle {
  font-size: 20px;
  font-weight: bolder;
  word-wrap: anywhere;
  width: 100%;
}

#forumDetailsPlaceHolder {
  width: 100%;
  background-color: #e6f7ff;
  height: auto;
  min-height: 200px;
  position: absolute;
  display: block;
  top: 100%;
}

#forumDetailsText {
  padding: 40px;
  text-align: left;
  font-size: 16px;
}

#buttonsPlaceholder {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 15%;
}

#forumAuthorAndDate {
  font-weight: bold;
  font-size: 14px;
}

#userIcon {
  font-size: 34px;
  color: whitesmoke;
  z-index: 2;
  padding-top: 12px;
}

.text-display {
  color: #2c3e50;
  text-shadow: none;
}
</style>