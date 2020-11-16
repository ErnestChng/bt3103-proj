<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <form>
      <input type="text" placeholder="Search..." name="search" v-model="keyword">
      <router-link :to="'/forum/' + keyword"><button type="submit"><i class="fa fa-search"></i></button></router-link>

    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBar.vue",
  data() {
    return {
      keyword : ""
    }
  }
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

form {
  padding-top: 30px;
}

/* Style the search field */
form input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

/* Style the submit button */
form button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #9bb0ca;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}

form button:hover {
  background: #6d8cb2;
}

/* Clear floats */
form::after {
  content: "";
  clear: both;
  display: table;
}
</style>