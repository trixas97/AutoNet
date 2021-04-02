<template>
  <div class="new-network-manual">
    <NewNetwork v-bind:auto="false"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewNetwork from '@/components/NewNetwork.vue'

export default {
  name: 'NewNetworkManual',
  components: {
    NewNetwork
  }
}
</script>