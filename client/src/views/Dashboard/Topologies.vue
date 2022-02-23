<template>
  <div class="topologies-container">
    <div class="topologies-box">
      <div class="head">
        <div class="title"><q-icon name="share" />Topologies</div>
        <div class="filter">
            <span class="add-btn"><q-btn round color="accent" size="md" icon="add" @click="newTopology" >
                <q-tooltip class="bg-accent text-body1" :offset="[10, 10]">
                    New Topology
                </q-tooltip>
            </q-btn></span>
            <q-input standout="bg-teal text-white" v-model="filter" placeholder="Search">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
      </div>
      <NewTopology v-model="dialogFlag" :selected="selected" :name="name"/>
      <Table :filter="filter" :rows="rows" :columns="columns" @delete="deleteTopo" @edit="editTopo"/>
    </div>
  </div>
</template>

<script>
import NewTopology from '@/components/Dashboard/NewTopology'
import { useStore } from 'vuex';
import { ref, watch } from 'vue'
import Table from '@/components/Dashboard/Table'

import { computed } from '@vue/runtime-core';
import _ from "lodash";

export default {
    name: 'Topologies',
    components: {
      Table,
      NewTopology
    },
    setup(){
      const store = useStore();
      const columns = [
        { name: 'type', align: 'center', field: 'type', sortable: true },
        { name: 'name',  label: 'Name', align: 'center', field: 'name', sortable: true },
        // { name: 'network', label: 'IP Network', align: 'center', field: 'network' },
        { name: 'netlength', label: 'Networks', align: 'center', field: 'netlength', sortable: true },
        { name: 'devices', label: 'Devices', align: 'center', field: 'devices', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'edit', label: '', field: 'edit', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]

      let toposFromWatch = ref(store.getters['UserData/getTopologies'])
      let topologies = computed(() => ref(toposFromWatch));
      watch(() => _.cloneDeep(store.getters['UserData/getTopologies']), (dataTopos) => {
        if(dataTopos != null){
            toposFromWatch.value = dataTopos
            topologies = ref(toposFromWatch)
        }
      })
      return {
        selected: ref([]),
        name: ref(''),
        filter: ref(''),
        ipNetOpen: ref(''),
        dialogFlag: ref(false),
        columns,
        topologies: ref(topologies),
        store
      }
    },
    methods:{
      newTopology(){
        this.dialogFlag = true
      },
      deleteTopo(id){
        this.store.dispatch('UserData/deleteTopology', id);
      },
      editTopo(name){
        let topo = this.store.getters['UserData/getTopology'](name);
        this.selected = topo.nodes
        this.name = topo.name
        this.dialogFlag = true
      }
    },
    computed:{
      rows(){
        let rowsArray = [];
        let toposArray = this.topologies.value;
        for(let  i=0; i< toposArray.length; i++){
          rowsArray[i] ={
            type: 'topology',
            id: toposArray[i]._id,
            name: toposArray[i].name,
            // network: '192.168.78.0 / 24',
            netlength: 1,
            devices: toposArray[i].nodes.length,
            delete: '',
          };
          if(i == toposArray.length-1)
            return(rowsArray)
        }
        return rowsArray
      } 
    } 
}
</script>

<style lang="scss" scoped>
.topologies-container{
    width: 100%;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    display: block;
    padding-top: 2em;

    .topologies-box {
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