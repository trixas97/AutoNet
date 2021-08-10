<template>
  <q-layout view="lHh Lpr lFf" class="layout">

    <NavBar v-if="$route.name != 'Login'"/>

    <q-page-container class="layout" >
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { sockets } from '@/services/sockets.js';
import store from '@/store';

export default {
  name: 'LayoutDefault',

  components: {
    NavBar
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
  .layout {
    height: 100%;
  }
</style>
