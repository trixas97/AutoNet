<template>
  <div id="app" class="app">
    <div v-bind:class="{'container': $route.name != 'Login'}">
      <NavBar v-if="$route.name != 'Login'" />
      <router-view class="view"/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
@import "./style/variables";
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
* {
  margin: 0;
  padding: 0;
  height: 100%;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    
    height: 100%;
    
    .container {
      height: 100%;
      display: grid;
      grid-gap: 10px;
      grid-template-rows: 0.06fr 0.4fr 10fr;
      grid-template-areas: 
        "navbar"
        "."
        "view";
      .navbar {
        grid-area: navbar;
        height: 1fr;
        background-color: $primary;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .view {
        grid-area: view;
        // margin-top: 1.5em;
        height: 100%;
      }
    }
    .container > div {
      text-align: center;
      font-size: 25px;
      height: 100%;
      color: white;
    }
  }
}
</style>