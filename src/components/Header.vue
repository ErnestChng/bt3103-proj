<template>
  <header>
    <nav id="main">
      <div id="main-left">
        <router-link id="header-title" to="/home" exact>
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
      <router-link to="/" exact>Home</router-link>
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
  padding: 10px 30px;
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
  padding: 10px 20px;
  text-align: left;
}


#sub a {
  padding: 10px;
  font-weight: bold;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #FFFFFF;
}

#sub a:hover {
  background: #3b4149;
  text-decoration: none;
}
</style>