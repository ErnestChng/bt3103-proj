<template>
  <div id="placeholder">
    <div id="replyHeader">
      <span id="timestamp">{{getTimestampDisplay()}}</span>
      <span id="user">From: {{sender}}</span>
    </div>
    <div id="replyContent">
      <p>{{body}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reply.vue",
  data() {
    return {
      exampleText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
          "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
          "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
          "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
          "mollit anim id est laborum."
    }
  },
  props: {
    sender: String,
    date: String,
    body: String
  },
  methods: {
    getTimestampDisplay: function() {
      const timeOfPost = new Date(this.date);
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
        var date = new Date(timeOfPost);
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10){dd='0'+dd}
        if(mm<10){mm='0'+mm}
        return dd+'/'+mm+'/'+yyyy
      }
    }
  }
}
</script>

<style scoped>
#placeholder {
  width: 100%;
  height: auto;
  margin-bottom: 4px;
}

#replyContent {
  height: auto;
  padding: 8px 20px 8px 20px;
  background-color: whitesmoke;
}

#replyContent p {
  height: auto;
  width: 100%;
  color: black;
  text-align: left;
  text-shadow: none;
  font-family: Helvetica;
  font-size: 16px;
  overflow: auto;
  max-height: 250px;
}

#replyHeader {
  background-color: #99c2ff;
  height: auto;
}

#replyHeader #timestamp {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  float: left;
  padding-left: 16px;
}

#replyHeader #user {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
  font-size: 14px;
  font-weight: bold;
  float: right;
  padding-right: 16px;
}
</style>