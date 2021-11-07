<template>
  <q-dialog transition-show="scale" transition-hide="scale">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="indigo-9"
          indicator-color="indigo-9"
          align="justify"
        >
          <q-tab name="running" no-caps >Running</q-tab>
          <q-tab name="startup" no-caps>Startup</q-tab>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-white text-black">
          <q-tab-panel name="running">
            <Configuration title="Running" :node="node"/>
          </q-tab-panel>

          <q-tab-panel name="startup">
            <Configuration title="Startup" :node="node"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
</template>

<script>

import { ref } from 'vue'
import Configuration from "@/components/Device/Configuration.vue";
export default {
  props:{
    node: {type: Object, required: true}
  },
  components:{
    Configuration
  },
  setup () {
    return {
      tab: ref('running')     
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .q-card{
    min-width: 40%;
    min-height: 90%;


    .q-tabs {
      min-height: 5em;
      
      .q-tab {
        font: {
          size: 2em;
          family: arial;
          weight: bold
        }
      }
    }
  }

</style>