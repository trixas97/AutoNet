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
            <Table class="newTopoTable" :rows="rows"/>  
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
import store from '@/store'
import { ref, watch } from 'vue'
import { computed } from '@vue/runtime-core';
import _ from "lodash";
export default {
    components: {
        Table
    },
    setup(){

      let nodesFromWatch = ref(store.getters['UserData/getNodes'])
      let nodes = computed(() => ref(nodesFromWatch));
      watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (dataNodes) => {
        if(dataNodes != null){
            nodesFromWatch.value = dataNodes
            nodes = ref(nodesFromWatch)
        }
      })

      return{
          name: '',
          nodes: ref(nodes)
      }
    },
    methods: {
      mainIp(node){
        try{
          for(let k=0; k < node.interfaces.length; k++){
            if(node.interfaces[k].mainIf.value){
              if(node.interfaces[k].ip_address.value.includes('/'))
                return node.interfaces[k].ip_address.value.split('/')[0]
              else
                return node.interfaces[k].ip_address.value
            }
          }
        }catch(error){
          return ''
        }
        return ''
      },
      network(node){
        try{
          let mainip = this.mainIp(node)
          for(let k=0; k < node.route_table.length; k++){
            if(node.route_table[k].network.value == mainip){
              return `${node.route_table[k-1].network.value}/${node.route_table[k-1].mask.value}`
            }
          }
        }catch(error){
          return ''
        }
        return ''
      }
    },
    computed: {
      rows(){
        let rowsArray = [];
        let nodesArray = this.nodes.value.data;
        for(let  i=0; i< nodesArray.length; i++){
          rowsArray[i] ={
            name: nodesArray[i].name.value,
            ip: this.mainIp(nodesArray[i]),
            network: this.network(nodesArray[i]),
            traffic: 1542
          };
          if(i == nodesArray.length-1)
            return(rowsArray)
        }
        return rowsArray
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