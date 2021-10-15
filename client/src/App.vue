<template>
  <q-layout view="lHh Lpr lFf" class="layout">

    <NavBar v-if="$route.name != 'Login' && $route.name != 'Dashboard'"/>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left"  v-if="$route.name == 'Dashboard'" elevated class="bg-navbar">
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
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .layout {
    height: 100%;
  }
</style>
