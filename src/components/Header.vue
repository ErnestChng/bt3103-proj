<template>
  <header>
    <nav id="main">
      <div id="main-left">
        <router-link id="header-title" to="/" exact>
          <span>COVID-19 Portal</span>
        </router-link>
      </div>
      <div id="main-right-if" v-if="user.loggedIn">
        <span>{{ user.data.displayName }}</span>
        <a @click.prevent="signOut">Sign out</a>
      </div>
      <div id="main-right-else" v-else>
        <router-link to="login">Login</router-link>
        <router-link to="register">Register</router-link>
      </div>
      <div>
      </div>
    </nav>
    <nav id="sub" v-if="user.loggedIn">
      <router-link to="/" exact style="margin-left: 25px">Home</router-link>
      <router-link to="/about" exact>About</router-link>
      <router-link to="/news" exact>News</router-link>
      <router-link to="/map" exact>Map</router-link>
      <router-link to="/forum" exact>Forum</router-link>
      <router-link to="/contact" exact>Contact Us</router-link>
    </nav>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
import firebase from "firebase";
import mask from "@/assets/mask.png";

export default {
  data() {
    return {
      image: mask
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              path: "/"
            }).catch(() => {
            });
          });
    }
  }
};
</script>

<style scoped>
header {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

#main {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2D3F55;
  color: #FFFFFF;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 100px;
}

#main-left {
  width: fit-content;
  margin-left: 10px;
  margin-right: auto;
}

#main-right-if {
  display: flex;
  list-style-type: none;
  margin-left: auto;
  margin-right: 10px;
}

#main-right-if a {
  padding: 0 20px;
}

#main-right-else {
  display: flex;
  list-style-type: none;
  margin-left: auto;
  margin-right: 10px;
}

#main-right-else a {
  color: white;
  padding: 0 20px;
}

#main-left span {
  font-size: 32px;
  margin-left: 16px;
  font-weight: bold;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #FFFFFF;
}

a {
  text-decoration: none;
  cursor: pointer;
}

#sub {
  background: #4E5661;
  height: 40px;
  display: flex;
  align-items: center;
}


#sub a {
  font-weight: bold;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #FFFFFF;
  padding: 0 15px;
}

#sub a:hover {
  background: #3b4149;
  text-decoration: none;
  height: inherit;
  display: flex;
  align-items: center;
}
</style>