<template>
  <div class="devices-container">
    <div class="devices-box">
      <div class="head">
        <div class="title"><q-icon name="router" />Devices</div>
        <div class="filter">
            <!-- <span class="add-btn"><q-btn round color="accent" size="md" icon="add" @click="newNode" >
                <q-tooltip class="bg-accent text-body1" :offset="[10, 10]">
                    New Device
                </q-tooltip>
            </q-btn></span> -->
            <q-input standout="bg-teal text-white" v-model="filter" placeholder="Search">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
      </div>
      <Table :filter="filter" :rows="rows" :columns="columns"/>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Table from '@/components/Dashboard/Table'
import store from '@/store';
import { computed } from '@vue/runtime-core';
import _ from "lodash";
export default {
    name: 'Devices',
    components: {
      Table
    },
    setup(){

      const columns = [
        { name: 'type', label: 'Type', align: 'left', field: row => row.type, format: val => `${val}`, sortable: true },
        { name: 'name',  label: 'Name', align: 'center', field: 'name', sortable: false },
        { name: 'ip', label: 'IP', field: 'ip', align: 'center', sortable: false },
        { name: 'network', label: 'Network', align: 'center', field: 'network' },
        { name: 'traffic', label: 'Traffic (Mbps)', align: 'center', field: 'traffic', sortable: true },
        { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
      let nodesFromWatch = ref(store.getters['UserData/getNodes'])
      let nodes = computed(() => ref(nodesFromWatch));
      watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (dataNodes) => {
        if(dataNodes != null){
            nodesFromWatch.value = dataNodes
            nodes = ref(nodesFromWatch)
        }
      })
      
      return{
        filter: ref(''),
        columns,
        nodes: ref(nodes)
      }
    },
    methods:{
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
      },
      traffic(node){
        let avg = 0
        console.log(node.interfaces.length);
        node.interfaces.map(inter => {
          let trInter = 0
          console.log(inter.traffic.value.length);
          inter.traffic.value.map(traffic =>{
            console.log(traffic.bytes.in);
              trInter += parseInt(traffic.bytes.in) + parseInt(traffic.bytes.out)   
              console.log(trInter);     
          })
          avg += trInter / inter.traffic.value.length
        })
        return parseFloat(avg / 1000000).toFixed(2)
      }
    },
    computed:{
      rows(){
        let rowsArray = [];
        let nodesArray = this.nodes.value.data;
        for(let  i=0; i< nodesArray.length; i++){
          rowsArray[i] ={
            type: nodesArray[i].type.value,
            name: nodesArray[i].name.value,
            ip: this.mainIp(nodesArray[i]),
            network: this.network(nodesArray[i]),
            traffic: this.traffic(nodesArray[i]),
            status:  nodesArray[i].status.value,
            delete: '',
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
.devices-container{
    width: 100%;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    display: block;
    padding-top: 2em;

    .devices-box {
      box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
      border-radius: 5px;
      background-color: white;
      width: 92%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 5%;
      display: block;


        .head {
          display: flex;
          align-items: center;
          padding-left: 1%;
          padding-top: 1%;
          justify-content: space-between;
          
          .title{
            display: flex;
            align-items: center;
              font: {
                size: 2.8em;
                family: Roboto;
                weight: bold;
            }
            .q-icon {
              padding-right: 5%;
            }
          }
          .filter{
              display: flex;
              padding-right: 1.2%;
              column-gap: 10px;

              .add-btn{
                align-self: center;
              }

              .q-input {
                  width: 15em;
                  margin-left: 1%;
              }
          }
        }


    }
}

</style>