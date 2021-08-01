<template>
<q-header :class="`shadow-15`" elevated>
  <q-toolbar>
    <q-space />
      <img class="logo q-pt-sm q-pb-sm" src="@/assets/logo.svg" alt="">
    <q-space />
  </q-toolbar>
</q-header>
</template>

<script>
export default {
    name:'NavBar'
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
