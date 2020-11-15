<template>
  <div id="threadPage" :style="{backgroundImage: `url(${image})`}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div id="thread">
      <div id="iconPlaceholder">
        <span id="icon">HR</span>
      </div>

      <div id="forumHeader">
        <h3 id="forumTitle" class="text-display">{{subject}}</h3>
        <p id="forumAuthorAndDate" class="text-display">by {{user}} in {{category}} - {{getDateDisplay()}} at {{getTimeDisplay()}}</p>
      </div>

      <div id="buttonsPlaceholder">
        <i id="likeButton" class="fa fa-thumbs-up"></i>
        <p id="likeCounter">12</p>
        <i id="replyButton" class="fa fa-mail-reply" v-on:click="openModal"></i>
        <p id="replyCounter">5</p>
      </div>
    </div>

    <div id="forumDetailsPlaceHolder">
      <p id="forumDetailsText" class="text-display">{{exampleText}}</p>
    </div>

    <div id="repliesDiv">
      <Reply></Reply>
      <Reply></Reply>
      <Reply></Reply>
      <Reply></Reply>
      <Reply></Reply>
      <p id="noReplyMessage">There are no replies yet..</p>
    </div>

    <div id="modalWindow" class="modal">

      <div class="modal-content">
        <span class="close" v-on:click="closeModal()">&times;</span>

        <div id="replyForm">
          <Reply></Reply>
        </div>

        <textarea id="textArea" rows="10" cols="100" v-model="replyBody"></textarea>

        <div id="buttonPlaceholder">
          <button class="button" v-on:click="submit"><span>Submit</span></button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import home from "@/assets/home2.jpg";
import Reply from "@/components/pages/forum/Reply";
import database from "@/firebase";

export default {
  name: "ForumThread.vue",
  components: {
    Reply
  },
  data() {
    return {
      image: home,
      exampleText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
          "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
          "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
          "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
          "mollit anim id est laborum.",
      replyBody: "",
      isValid: false,
      user: String,
      subject: String,
      body: String,
      timestamp: String,
      category: String,
      likes: Number,
      replies: [{
        count: Number,
        responses: [{
          sender: String,
          date: String,
          body: String
        }]
      }]
    }
  },
  props: {
    id: String
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
        // insert code stub
      } else {
        alert("Field cannot be empty");
      }
    },
    getDateDisplay: function () {
      const timeOfPost = new Date(this.timestamp);
      const timeStampNow = new Date();
      const diffTime = Math.abs(timeStampNow - timeOfPost);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        var pluralSuffixDay = "s";
        if (diffDays == 1) {
          pluralSuffixDay = "";
        }
        return diffDays.toString() + " day" + pluralSuffixDay + " ago";
      } else if (diffDays <= 31) {
        var pluralSuffixWeek = "s";
        if (diffDays == 1) {
          pluralSuffixWeek = "";
        }
        return Math.ceil(diffDays / 7) + " week" + pluralSuffixWeek + " ago";
      } else {
        return new Date(this.timestamp).toLocaleString().split(',')[0];
        /*const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(timeOfPost);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(timeOfPost);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(timeOfPost);
        return (`${da}-${mo}-${ye}`);*/
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
      var post = database.collection("forumposts").doc(this.id).get();
      this.user = post.user;
      this.subject = post.subject;
      this.body = post.body;
      this.timestamp = post.timestamp;
      this.category = post.category;
      this.likes = post.likes;
      this.replies = post.replies;
      console.log(post);
      alert("Thread updated!");
    },
  },
  watch: {
    replyBody: function () {
      if (this.replyBody === "") {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    }
  },
  created() {
    this.fetchPost();
  }
}
</script>

<style scoped>

#buttonPlaceholder {
  height: auto;
  position: relative;
  bottom: 40%;
}

button {
  background-color: #466386;
  border: none;
  outline: none;
  border-radius: 5px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
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
  font-family: Helvetica;
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
  opacity: 1  ;
  right: 0;
}

textarea {
  position: relative;
  padding: 8px;
  margin-top: 20px;
  bottom: 45%;
  height: auto;
}

#replyForm {
  width: 100%;
  height: 500px;
  position: relative;
  top: 6%;
}


/* The Close Button */
.close {
  color: #aaa;
  float: right;
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  overflow-x: hidden;
}

/* Modal Content/Box */
.modal-content {
  background-color: #dee5ed;
  margin: 15% auto; /* 15% from the top and centered */
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
  top: 0;
  width: 70%;
  height: auto;
  max-height: 150px;
}

#thread {
  width: 60%;
  background-color: #e6f7ff;
  height: auto;
  min-height: 14%;
  position: relative;
  bottom: 300px;
  border-radius: 5px 5px 0 0;
  /*background-color: seagreen;*/
}

#repliesDiv {
  position: absolute;
  top: 300px;
  width: 60%;
  min-height: 100px;
  height: 60%;
  background-color: #ffffff;
  display: inline-block;
  overflow: scroll;
  overflow-x: hidden;

}

#noReplyMessage {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
  font-weight: bolder;
  font-size: 14px;
  margin-top: 4%;
  display: none;
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
  font-family: Helvetica;
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
  font-family: Helvetica;
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
  align-items: center;
  justify-content: center;
  height: 800px;
  color: #FFFFFF;
  font-size: 20px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
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
  line-height: 18px;
  word-wrap: anywhere;
  width: 100%
}

#forumDetailsPlaceHolder {
  width: 60%;
  background-color: #ccefff;
  height: auto;
  min-height: 14%;
  position: absolute;
  top: 155px;
  /*background-color: seagreen;*/
}

#forumDetailsText {
  padding: 12px;
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
  font-family: Helvetica;
  font-weight: bold;
  font-size: 14px;
}

.text-display {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
}

</style>