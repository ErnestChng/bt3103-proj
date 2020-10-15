<template>
  <div :style="{backgroundImage: `url(${image})`}">
    <div class="divider"></div>
    <h1>ONE-STOP SOLUTION FOR COVID-19</h1>

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
div {
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