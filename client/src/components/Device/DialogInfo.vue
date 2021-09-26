<template>
    <q-dialog transition-show="scale" transition-hide="scale">
      <q-card>
          <q-toolbar>
            <q-space/>
            <label class="info">Informations</label>  
            <q-space/>
            <q-btn flat v-close-popup round dense icon="close" size="lg" />          
          </q-toolbar>
      </q-card>
    </q-dialog>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .q-card{
    min-width: 60%;
    min-height: 90%;

    .q-toolbar {
      background-color: $primary;
      min-height: 6em;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      color: white;
      label {
        font: {
          family: arial;
          size: 3em;
          weight: bold;
        }
        
      }
    }
  }
</style>