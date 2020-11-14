<template>
  <div class="container">
    <video id="video" autoplay muted loop>
      <source :src="image" type="video/mp4">
    </video>
    <div class="overlay" style="margin-top:20px">
      <div class="divider"></div>
      <h1>ABOUT US</h1>
      <div class="divider"></div>
    </div>
    <section class="overlay" style="margin-top:80px">
      <h4>We are a one-stop portal for COVID-19 related utilities catered to the average Singaporean.
        By gathering data and highlighting what is important, we hope to be an informative platform for users.
        We hope that this portal can contribute towards the prevention of the spread of COVID-19.
        <br><br>
        <b>Let us pull through this crisis together</b></h4>
    </section>
  </div>
</template>

<script>
import background from "@/assets/aboutvid.mp4";

export default {
  data() {
    return {
      image: background
    };
  }
};
</script>

<style scoped>
div {
  justify-content: center;
  display: flex;
  align-items: center;
}
.container {
  position:relative;
  align-items: center;
  justify-content: center;
}
.container video {
  position:relative;
  z-index:0;
}
.overlay {
  margin-top: 220px;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  color: #FFFFFF;
}

.divider {
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 20px;
  height: 5px;
  width: 430px;
}
</style>