<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$route.name != 'Login'" elevated class="glossy">
      <NavBar/>
    </q-header>

    <q-page-container>
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
