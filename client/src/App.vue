<template>
  <div id="app" class="app">
    <div class="container">
      <NavBar/>
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
        "view";
      .navbar {
        grid-area: navbar;
        height: 1fr;
        background-color: $primary;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .view {
        grid-area: view;
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