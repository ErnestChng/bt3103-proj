<template>
  <header>
    <div id="main">
      <h1>COVID-19 Portal</h1>
    </div>
    <div id="sub">
      <nav>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/about" exact>About</router-link>
        <router-link to="/news" exact>News</router-link>
        <router-link to="/map" exact>Map</router-link>
        <router-link to="/forum" exact>Forum</router-link>
        <router-link to="/contact" exact>Contact Us</router-link>
      </nav>
    </div>
  </header>
</template>

<script>

</script>

<style scoped>
header {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

#main {
  background: #2D3F55;
  color: #FFFFFF;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  text-align: left;
  padding: 10px 30px;
}

#sub {
  background: #4E5661;
  padding: 10px 20px;
  text-align: left;
}


#sub nav a {
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #FFFFFF;
}

#sub a:hover {
  background: #3b4149;
}
</style>