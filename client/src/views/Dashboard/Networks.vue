<template>
  <div class="networks-container">
    <div class="networks-box">
      <div class="head">
        <div class="title"><q-icon name="account_tree" />Networks</div>
        <div class="filter">
            <span class="add-btn"><q-btn round color="accent" size="md" icon="add" @click="newNetwork" >
                <q-tooltip class="bg-accent text-body1" :offset="[10, 10]">
                    New Network
                </q-tooltip>
            </q-btn></span>
            <q-input standout="bg-teal text-white" v-model="filter" placeholder="Search">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
      </div>
      <Dialog v-model="dialogFlag" :ipnet="ipNetOpen"/>
      <Table :filter="filter" :rows="rows" :columns="columns" @networkInfo="openDialog" @delete="deleteNet"/>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import store from '@/store';
import { computed } from '@vue/runtime-core';
import _ from "lodash";
import Table from '@/components/Dashboard/Table'
import Dialog from '@/components/Dashboard/Dialog'
export default {
    name: 'Topologies',
    components: {
      Table,
      Dialog
    },
    setup(){

      const columns = [
        { name: 'type', align: 'center', field: 'type', sortable: false },
        { name: 'network', label: 'IP Network', align: 'center', field: 'network', sortable: false },
        { name: 'mask', label: 'Mask', align: 'center', field: 'mask', sortable: false },
        { name: 'maxDevices', label: 'Max Devices', align: 'center', field: 'maxDevices', sortable: false },
        { name: 'devices', label: 'Current Devices', align: 'center', field: 'devices', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]

      let networksFromWatch = ref(store.getters['UserData/getNetworks'])
      let networks = computed(() => ref(networksFromWatch));
      watch(() => _.cloneDeep(store.getters['UserData/getNetworks']), (dataNetworks) => {
        if(dataNetworks != null){
            networksFromWatch.value = dataNetworks
            networks = ref(networksFromWatch)
        }
      })

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
         ipNetOpen: ref(''),
         dialogFlag: ref(false),
        //  nodes: ref(nodes),
         networks: ref(networks),
         columns,
         nodes
      }
    },
    methods: {
      openDialog(value){
        this.ipNetOpen = value;
        this.dialogFlag = true
      },
      newNetwork(){
        this.$router.push('autoScan');
      },
      netNodes(ipnet){
        let count = 0
        this.nodes.value.data.map(node =>{
          node.interfaces.map(inter => {
            if(inter.network.value == ipnet)
            count++
          })
        })
        return count
      },
      deleteNet(network){
        store.dispatch('UserData/deleteNetwork', network);
      }
    },
    computed: {
      rows(){
        let rowsArray = [];
        let networksArray = this.networks.value;
        networksArray.map(network => {
          rowsArray.push({
            type: 'network',
            network: network.ipNetwork.value,
            mask: network.subnetMask.value,
            maxDevices: network.numHosts.value,
            devices: this.netNodes(network.ipNetwork.value),
            delete: ''
          })
        })
        return rowsArray
      },
      
      // devices(ipNet){
      //   let nodesArray = this.nodes.value.data
      //   let counter = 0
      //   nodesArray.map(node => {
      //     node.interfaces.map 
      //   })
      // }
    } 
}
</script>

<style lang="scss" scoped>
.networks-container{
    width: 100%;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    display: block;
    padding-top: 2em;

    .networks-box {
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