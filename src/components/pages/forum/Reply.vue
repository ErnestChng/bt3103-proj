<template>
  <div id="placeholder">
    <div id="replyHeader">
      <span id="timestamp">10-09-2020, 08:41 PM</span>
      <span id="user">From: John Doe</span>
    </div>
    <div id="replyContent">
      <p>{{exampleText}}</p>
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
  }
}
</script>

<style scoped>
#placeholder {
  width: 100%;
  height: auto;
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
  height: 18px;
  padding: 5px 10px 5px 10px;
}

#replyHeader #timestamp {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  float: left;
}

#replyHeader #user {
  font-family: Helvetica;
  color: #2c3e50;
  text-shadow: none;
  font-size: 14px;
  font-weight: bold;
  float: right;
}
</style>