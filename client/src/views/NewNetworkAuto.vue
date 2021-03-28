<template>
  <div class="new-network-auto">
    <NewNetwork v-bind:auto="true"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewNetwork from '@/components/NewNetwork.vue'

export default {
  name: 'NewNetworkAuto',
  components: {
    NewNetwork
  }
}
</script>