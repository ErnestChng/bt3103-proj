<template>
  <div id="placeholder">
    <div id="firstRow">
      <p id="subjectLabel" class="text-display">Subject</p>
      <input id="forumTitle" type="text" v-on:keypress.enter="submit" v-model="subject">
    </div>
    <div id="secondRow">
      <p id="messageLabel" class="text-display">Message</p>
      <textarea id="forumBody" cols="40" rows="5" v-on:keypress.enter="submit" v-model="body"></textarea>
    </div>
    <div id="categorySelect">
      <p class="text-display">Category</p>
      <form>
        <label class="radio-inline">
          <input type="radio" value="General" v-model="category" checked="checked">General
          <span class="checkmark"></span>
        </label>
        <label class="radio-inline">
          <input type="radio" value="Healthcare" v-model="category">Healthcare
          <span class="checkmark"></span>
        </label>
        <label class="radio-inline">
          <input type="radio" value="Jobs" v-model="category">Jobs
          <span class="checkmark"></span>
        </label>
        <label class="radio-inline">
          <input type="radio" value="Government" v-model="category">Government
          <span class="checkmark"></span>
        </label>
        <label class="radio-inline">
          <input type="radio" value="News" v-model="category">News
          <span class="checkmark"></span>
        </label>
      </form>
    </div>
    <div id="buttonPlaceholder">
      <button class="button" v-on:click="submit()"><span>Submit</span></button>
    </div>
    <div id="subjectCannotBeEmpty">
      <p class="warning">*Subject cannot be empty</p>
    </div>
    <div id="bodyCannotBeEmpty">
      <p class="warning">*Message cannot be empty</p>
    </div>
  </div>

</template>

<script>
import database from "@/firebase";
import {mapGetters} from "vuex";

export default {
  name: "ForumForm.vue",
  data() {
    return {
      postCounter: "",
      subject: "",
      body: "",
      category: "General",
      subjectIsValid: false,
      bodyIsValid: false,
      requireRefresh: false
    };
  },
  props: {
    id: String
  },
  methods: {
    submit() {
      if (!this.subjectIsValid || !this.bodyIsValid) {
        alert("Please fill in the necessary fields");
      } else {
        var updatedCounter = parseInt(this.postCounter, 10) + 1;
        var post = {
          id: updatedCounter + "",
          /*user: "user" + Math.floor((Math.random() * 10000) + 1),*/
          user: this.user.data.displayName,
          subject: this.subject,
          body: this.body,
          timestamp: new Date().toUTCString(),
          category: this.category,
          likes: 0,
          replies: {
            count: 0,
            responses: []
          }
        };
        database.collection("forumposts").doc("" + updatedCounter).set(post);
        database.collection("forumposts").doc("0").update({
          count: updatedCounter
        });
        console.log(this.postCounter + " --> " + updatedCounter);
        this.postCounter = updatedCounter + "";
        console.log("new count: " + this.postCounter);
        alert("Pushing to firestore ");
      }
    },
    loadCounter: function () {
      database.collection("forumposts").get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach(doc => {
          item = doc.data();
          if (item.id === "0") {
            this.postCounter = item.count;
            console.log("item.count = " + item.count);
            console.log("this.postCounter = " + this.postCounter);
          }
        });
      });
    }
  },
  watch: {
    subject: function () {
      if (this.subject === "") {
        document.getElementById("subjectLabel").style["color"] = "firebrick";
        document.getElementById("subjectCannotBeEmpty").style.display = "block";
        this.subjectIsValid = false;
      } else {
        document.getElementById("subjectLabel").style["color"] = "black";
        document.getElementById("subjectCannotBeEmpty").style.display = "none";
        this.subjectIsValid = true;
      }
    },
    body: function () {
      if (this.body === "") {
        document.getElementById("messageLabel").style["color"] = "firebrick";
        document.getElementById("bodyCannotBeEmpty").style.display = "block";
        this.bodyIsValid = false;
      } else {
        document.getElementById("messageLabel").style["color"] = "black";
        document.getElementById("bodyCannotBeEmpty").style.display = "none";
        this.bodyIsValid = true;
      }
    }
  },
  created() {
    this.loadCounter();
    console.log("this.user.data.displayName = " + this.user.data.displayName);
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style scoped>
#placeholder {
  position: relative;
  top: 4%;
}

#firstRow, #secondRow, #categorySelect, #buttonPlaceholder, #subjectCannotBeEmpty, #bodyCannotBeEmpty {
  position: absolute;
  width: 100%;
}

#firstRow {
  top: 0;
  height: 12%;
}

#secondRow {
  top: 15%;
  height: 45%;
}

#categorySelect {
  top: 68%;
  height: 10%;
}

#buttonPlaceholder {
  top: 80%;
  height: 13%;
}

#subjectCannotBeEmpty {
  top: 83%;
  height: 5%;
  display: none;
}

#bodyCannotBeEmpty {
  top: 88%;
  height: 5%;
  display: none;
}

.warning {
  margin-top: 0;
  color: firebrick;
  font-size: 12px;
  font-weight: bolder;
  font-family: Helvetica;
  text-shadow: none;
}

p {
  margin-top: 7px;
  float: left;
  margin-left: 50px;
}

input[type=text], textarea {
  width: 70%;
  float: right;
  margin-right: 40px;
  height: auto;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  z-index: 1;
}

#forumBody {
  height: 200px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

.radio-inline {
  display: inline-block;
  position: relative;
  padding-top: 8px;
  padding-right: 34px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.radio-inline input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 10px;
  height: 20px;
  width: 20px;
  margin-left: 5px;
  background-color: #eee;
  border-radius: 50%;
}

.radio-inline:hover input ~ .checkmark {
  background-color: #ccc;
}

.radio-inline input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radio-inline input:checked ~ .checkmark:after {
  display: block;
}

.radio-inline .checkmark:after {
  top: 7px;
  left: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
}

form {
  float: right;
  margin-right: 8%;
}

.text-display, .radio-inline {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
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
  opacity: 1;
  right: 0;
}

#forumTitle, #forumBody {
  font-size: 14px;
  font-family: Helvetica;
}
</style>