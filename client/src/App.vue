<template>
  <div id="app" class="app">
    <div class="container">
      <NavBar/>
      <NewNetwork/>
    </div>

    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import NewNetwork from './components/NewNetwork.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    NewNetwork
  }
}
</script>

<style lang="scss" scoped>
@import "./style/variables";

* {
  margin: 0;
  padding: 0;


  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    

    .container {
      display: grid;
      grid-gap: 10px;
      grid-template-areas: 
        "navbar"
        "newnetwork";

      .navbar {
        grid-area: navbar;
        height: 1fr;
        background-color: $primary;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }

      .newnetwork {
        grid-area: newnetwork;
        margin-top: 1.5em;
        height: 1fr;
      }
    }

    .container > div {
      text-align: center;
      font-size: 25px;
      color: white;
    }
  }
}
</style>
