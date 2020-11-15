<template>
  <div class="wrapper">
    <div id="description">
      <h1>ABOUT US</h1>
      <div class="divider"></div>
      <section>
        <h4>We are a one-stop portal for COVID-19 related utilities catered to the average Singaporean.
          By gathering data and highlighting what is important, we hope to be an informative platform for users.
          We hope that this portal can contribute towards the prevention of the spread of COVID-19.
          <br><br>
          <b>Let us pull through this crisis together</b></h4>
      </section>
    </div>
    <video id="video" autoplay muted loop>
      <source :src="image" type="video/mp4">
    </video>
  </div>
</template>

<script>
import aboutvid from "@/assets/aboutvid2.mp4";

export default {
  data() {
    return {
      image: aboutvid
    };
  }
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 100px - 80px - 40px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

#description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  color: #FFFFFF;
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 15px;
  padding: 20px;
}

.divider {
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 20px;
  height: 5px;
  width: 80%;
}
</style>