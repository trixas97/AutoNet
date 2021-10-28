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
      <Table :filter="filter" :rows="rows" :columns="columns"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Table from '@/components/Dashboard/Table'
import { useStore } from 'vuex';
export default {
    name: 'Topologies',
    components: {
      Table
    },
    setup(){
      const store = useStore();
      const columns = [
        { name: 'type', align: 'center', field: 'type', sortable: true },
        { name: 'name',  label: 'Name', align: 'center', field: 'name', sortable: true },
        { name: 'network', label: 'IP Network', align: 'center', field: 'network' },
        { name: 'netlength', label: 'Networks', align: 'center', field: 'netlength', sortable: true },
        { name: 'devices', label: 'Devices', align: 'center', field: 'devices', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]

      const rows = [
        {
          type: 'topology',
          name: 'MyTopology 1',
          network: '192.168.78.0 / 24',
          netlength: 1,
          devices: 3,
          delete: '',
        },
        {
          type: 'topology',
          name: 'MyTopology 2',
          network: 'Multiple Networks',
          netlength: 3,
          devices: 13,
          delete: '',
        },
        {
          type: 'topology',
          name: 'MyTopology 3',
          network: 'Multiple Networks',
          netlength: 4,
          devices: 33,
          delete: '',
        },
        {
          type: 'topology',
          name: 'Test Topology',
          network: '13.13.13.0 / 24',
          netlength: 1,
          devices: 2,
          delete: '',
        }        
      ]
      return{
         filter: ref(''),
         columns,
         rows,
         store
      }
    },
    methods:{
      newTopology(){
        
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