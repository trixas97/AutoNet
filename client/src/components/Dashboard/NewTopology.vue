<template>
    <q-dialog transition-show="scale" transition-hide="scale">
      <q-card>
          <q-toolbar>
            <q-space/>
            <label class="info">New Topology</label>  
            <q-space/>
            <q-btn flat v-close-popup round dense icon="close" size="lg" />          
          </q-toolbar>
          <div class="infoContent">
              <q-input outlined v-model="name" label="Name" />
                        <!-- <div > -->
            <Table class="newTopoTable"/>  
            <div class="btn"> 
                <q-btn
                    size="22px"
                    class="q-px-xl q-py-xs"
                    color="positive"
                    label="Save"
                />
            </div>
          </div>

      </q-card>
    </q-dialog>
</template>

<script>
import Table from "@/components/Dashboard/NewTopologyTable.vue";
// import store from '@/store'
// import { ref, watch } from 'vue'
// import { computed } from '@vue/runtime-core';
// import _ from "lodash";
export default {
    components: {
        Table
    },
    setup(){
        return{
            name: ''
        }
    }

}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .q-card{
    min-width: 60%;
    min-height: 90%;
    display: grid;
    grid-template-rows: 1fr 0.5fr 8.5fr;
    grid-template-areas: 
    "bar"
    "."
    "infoContent";

    .q-toolbar {
      grid-area: bar;
      background-color: $darkblue;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      color: white;
      label {
        text-align: center;
        align-self: center;
        font: {
          family: arial;
          size: 3em;
          weight: bold;
        }
        
      }
    }

    .infoContent{
      grid-area: infoContent;
      display: grid;
      grid-template-areas: 
      ". nameField ."
      "topoTable topoTable topoTable"
      ". btn ."
      ;
      text-align: center;
      font: {
        //   size:1.5em;
          family: arial
      }

      .q-input {
          grid-area: nameField;
          font: {
              size: 1.5em;
              family: arial
          }
      }
      

      .newTopoTable {
          grid-area: topoTable;
        //   background-color: blueviolet;
      }

      .btn {
          grid-area: btn;
      }
    }
  }
</style>