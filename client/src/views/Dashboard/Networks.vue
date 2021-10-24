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
      <Table :filter="filter" :rows="rows" :columns="columns" @networkInfo="openDialog" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
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
        { name: 'gateway', label: 'Default Gateway', align: 'center', field: 'gateway', sortable: false },
        { name: 'devices', label: 'Devices', align: 'center', field: 'devices', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]

      const rows = [
        {
          type: 'network',
          network: '192.168.78.0 / 24',
          mask: '255.255.255.0',
          gateway: '192.168.78.1',
          devices: 3,
          delete: '',
        },
        {
          type: 'network',
          network: '10.10.10.0 / 24',
          mask: '255.255.255.0',
          gateway: '10.10.10.1',
          devices: 13,
          delete: '',
        },
        {
          type: 'network',
          network: '13.13.13.0 / 24',
          mask: '255.255.255.0',
          gateway: '13.13.13.1',
          devices:55,
          delete: '',
        },
        // {
        //   type: 'network',
        //   network: '45.46.47.0 / 23',
        //   mask: '255.255.254.0',
        //   gateway: '45.46.47.1',
        //   devices: 78,
        //   delete: '',
        // },   
      ]
      return{
         filter: ref(''),
         ipNetOpen: ref(''),
         dialogFlag: ref(false),
         columns,
         rows
      }
    },
    methods: {
      openDialog(value){
        this.ipNetOpen = value;
        this.dialogFlag = true
      },
      newNetwork(){
        this.$router.push('autoScan');
      }
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