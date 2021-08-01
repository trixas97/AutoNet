<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      @click="leftDrawerOpen = !leftDrawerOpen"
      aria-label="Menu"
      icon="menu"
    />

    <q-toolbar-title>
      Quasar App
    </q-toolbar-title>

    <div>Quasar v{{ $q.version }}</div>
  </q-toolbar>
</template>

<script>
export default {
    name:'NavBar'
}
</script>