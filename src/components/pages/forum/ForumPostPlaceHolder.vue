<template>
  <div id="placeholder">

    <div id="iconPlaceholder">
      <span id="icon">HR</span>
    </div>

    <div id="forumHeader">
      <h3 id="forumTitle" class="text-display"><router-link tag="li" to="/thread" exact
                                                            v-bind:id="id"
      >{{getShortenedTitle(subject)}}</router-link></h3>
      <p id="forumAuthorAndDate" class="text-display">by {{user}} in {{category}}  -  {{getTimestampDisplay()}}</p>
    </div>

    <div id="forumDetailsPlaceHolder">
      <p id="forumDetailsText" class="text-display">{{getShortenedBody()}}</p>
    </div>

  </div>
</template>

<script>

export default {
  name: "ForumPostPlaceHolder.vue",
  data() {
    return {
      exampleDateDisplay: "1 day ago at 11:45pm"
    }
  },
  props: {
    id: String,
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
      }],
    }]
  },
  methods: {
    getShortenedTitle: function(string) {
      if (string.length > 150) {
        return string.substr(0, 144) + "...";
      } else {
        return string;
      }
    },
    getTimestampDisplay: function() {
      const timeOfPost = new Date(this.timestamp);
      const timeStampNow = new Date();
      const diffTime = Math.abs(timeStampNow - timeOfPost);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        var pluralSuffix = "s";
        if (diffDays == 1) {
          pluralSuffix = "";
        }
        return diffDays.toString() + " day" + pluralSuffix + " ago";
      } else if (diffDays <= 31) {
        return Math.ceil(diffDays / 7) + " weeks ago";
      } else {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(timeOfPost);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(timeOfPost);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(timeOfPost);
        return(`${da}-${mo}-${ye}`);
      }
    },
    getShortenedBody: function() {
      if (this.body.length < 630) {
        return this.body;
      } else {
        var lastWhiteSpace = this.body.lastIndexOf(" ")
        if (lastWhiteSpace < 0 || lastWhiteSpace > 630) {
          lastWhiteSpace = 630;
        }
        return this.body.substr(0, lastWhiteSpace - 1) + "...";
      }
    }
  }
}
</script>

<style scoped>

li {
  text-decoration: none;
  list-style-type: none;
  cursor: pointer;
}

#forumDetailsText {
  text-align: left;
  font-size: 17px;
  padding: 0px 14px 12px 0;
  line-height: 20px;
  height: 100%;
  margin-top: 10px;
}

#forumDetailsPlaceHolder {
  position: absolute;
  width: 85%;
  height: 70%;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

#forumAuthorAndDate  {
  line-height: 20px;
  position: absolute;
  width: 97%;
  text-align: right;
  bottom: 0;
  font-size: 14px;
  padding-right: 10%;
  margin-bottom: 0;

}

#forumTitle {
  height: 80%;
  position: absolute;
  top: 8px;
  margin-top: 0;
  width: 97%;
  font-size: 18px;
  text-align: left;
  padding: 4px;
  overflow: auto;
}

#forumHeader {
  position: absolute;
  width: 85%;
  height: 30%;
  top: 0;
  right: 0;
  overflow: hidden;
}

#icon {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #2B2D42;
  display: inline-block;
  line-height: 60px;
}

#iconPlaceholder {
  position: absolute;
  top: 0;
  left: 0;
  height: 130px;
  width: 15%;
  padding-top: 20px;
}

#placeholder {
  position: relative;
  background-color: #e6f7ff;
  /*background-color: #ffffe4;*/
  height: 200px;
  width: 85%;
  alignment: center;
  border-radius: 10px;
  box-shadow: none;
  padding: 10px 10px 20px 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.text-display {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
}
</style>