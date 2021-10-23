<template>
  <div class="devices-container">
    <div class="devices-box">
      <div class="head">
        <div class="title"><q-icon name="router" />Devices</div>
        <div class="filter">
            <span class="add-btn"><q-btn round color="accent" size="md" icon="add" >
                <q-tooltip class="bg-accent text-body1" :offset="[10, 10]">
                    New Device
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
        { name: 'mask', label: 'Mask', align: 'center', field: 'mask' },
        { name: 'traffic', label: 'Traffic (Kbps)', align: 'center', field: 'traffic', sortable: true },
        { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]

      const rows = [
        {
          type: 'router',
          name: 'R1',
          ip: '192.168.78.1',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: true,
          delete: '',
        },
        {
          type: 'router',
          name: 'R2',
          ip: '192.168.78.222',
          network: '192.168.78.0',
          mask: 255,
          traffic: 25,
          status: false,
          delete: ''
        },
        {
          type: 'router',
          name: 'R3',
          ip: '192.168.178.111',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: true,
          delete: ''
        },
        {
          type: 'switch',
          name: 'S1',
          ip: '192.168.78.2',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: true,
          delete: ''
        },
        {
          type: 'router',
          name: 'R5',
          ip: '192.168.78.3',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: true,
          delete: ''
        },
        {
          type: 'router',
          name: 'R6',
          ip: '192.168.78.4',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: 'Active',
          delete: ''
        },
        {
          type: 'router',
          name: 'R7',
          ip: '192.168.78.5',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: 'Active',
          delete: ''
        },
        {
          type: 'router',
          name: 'R8',
          ip: '192.168.78.6',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: 'Active',
          delete: ''
        },
        {
          type: 'router',
          name: 'R9',
          ip: '192.168.78.7',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: 'Active',
          delete: ''
        },
        {
          type: 'router',
          name: 'R10',
          ip: '192.168.78.8',
          network: '192.168.78.0',
          mask: 255,
          traffic: 1.5,
          status: 'Active',
          delete: ''
        }
      ]
      return{
         filter: ref(''),
         columns,
         rows
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