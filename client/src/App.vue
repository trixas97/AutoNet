<template>
  <q-layout view="lHh Lpr lFf">

    <NavBar v-if="$route.name != 'Login'"/>

    <q-page-container >
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'LayoutDefault',

  components: {
    NavBar
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
