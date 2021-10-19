<template>
  <q-layout view="lHh Lpr lFf" class="layout">

    <NavBar v-if="$route.name != 'Login' && !visibleComponent($route) "/>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="250" v-if="visibleComponent($route)" elevated class="bg-navbar">
      <Drawer />
    </q-drawer>

    <q-page-container class="layout" >
      <router-view/>
    </q-page-container>


  </q-layout>
</template>

<script>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Drawer from '@/components/Drawer.vue'
import { sockets } from '@/services/sockets.js';
import store from '@/store';
import routes from '@/router/routes.js'

export default {
  name: 'LayoutDefault',

  components: {
    NavBar,
    Drawer
  },

  setup () {
    if (store.state.User.token != null)
      sockets();
    return {
      leftDrawerOpen: ref(false)
    }
  },

  methods: {
    visibleComponent(route){
      let flag;
      try{
        flag = routes.find(element => element.name == route.name).devname.includes('home') ? true : false
      }catch{
        flag = false
      }
      return flag;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .layout {
    height: 100%;
  }
</style>
