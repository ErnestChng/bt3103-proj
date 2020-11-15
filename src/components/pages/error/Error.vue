<template>
  <div id="container">
    <img v-bind:src="image" alt="404 Forbidden">
    <div>
      The following page cannot be found...
      <router-link to="/">Click here to return to home</router-link>
    </div>
  </div>
</template>

<script>
import error from "@/assets/404-error.png";

export default {
  data() {
    return {
      image: error
    };
  }
};
</script>

<style scoped>
#container {
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}


img {
  height: 200px;
  padding: 20px;
}
</style>