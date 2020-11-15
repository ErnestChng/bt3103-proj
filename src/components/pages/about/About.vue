<template>
  <div id="container" :style="{backgroundImage: `url(${image})`}">
    <div class="divider"></div>
    <h1>ABOUT US</h1>
    <div class="divider"></div>
  </div>
</template>

<script>
import home from "@/assets/home2.jpg";

export default {
  data() {
    return {
      image: home
    };
  }
};
</script>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px - 80px - 40px);
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