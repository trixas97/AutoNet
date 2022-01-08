<template>
<q-header :class="`shadow-15`" elevated>
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="openDrawer" />
    <q-space />
      <img class="logo q-pt-sm q-pb-sm" src="@/assets/logo.svg" alt="">
    <q-space />
  </q-toolbar>
</q-header>
</template>

<script>
export default {
    name:'NavBar',
    methods:{
      openDrawer(){
        this.$emit('openDrawer', true)
      }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables";
  .q-header {
    background-color: $navbar;

    .logo {
      width: 15em;
    }
  }
  
</style>
