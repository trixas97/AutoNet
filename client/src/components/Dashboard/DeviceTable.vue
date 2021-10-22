<template>
    <div class="q-pa-md">
    <q-table 
      class="dashboard-table"
      :rows="rows"
      :columns="columns"
      row-key="ip"
      flat
      hide-pagination
      :filter="filter"
      :pagination="pagination"
      bordered
    >

      <template v-slot:body="props">
        <q-tr :props="props" >

          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            @click="showItem(col.name, props.key)"
          >
            <q-icon v-if="col.name == 'status'" :class="col.value ? 'status-true' : 'status-false'" name="circle"/>
            
            {{ col.name != 'type' && col.name != 'status' ? col.value : null }}
            <span v-if="col.name == 'status'" :class="col.value ? 'status-true' : 'status-false'"> 
              {{ col.name == 'status' && col.value ? 'Active' : 'Inactive' }}
            </span>
            

            <q-img v-if="col.name == 'type' && col.value == 'router'" src="@/assets/nodes/router.svg" />
            <q-img v-if="col.name == 'type' && col.value != 'router'" src="@/assets/nodes/switch.svg" />
            <q-btn size="md" v-if="col.name == 'delete'" color="negative" round dense @click="deleteItem" icon="delete_forever" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>


<script>
import { ref } from 'vue'
const columns = [
  {
    name: 'type',
    label: 'Type',
    align: 'left',
    field: row => row.type,
    format: val => `${val}`,
    sortable: true
  },
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

export default {
  props:{
    filter: String
  },
  setup () {
    return {
      columns,
      rows,
        pagination: ref({
        rowsPerPage: 0
      })
    }
  },
  methods: {
    deleteItem(){
      console.log("Delete");
    },
    showItem(name, ip) {
      console.log(name + " " + ip);
      if(name != 'delete')
        this.$router.push('device?ip='+ip);
    },
  }
}
</script>

<style lang="scss" >
@import "@/styles/quasar.variables.scss";
    .dashboard-table{
        max-height: 50em;

        .q-table__top, .q-table__bottom, thead tr:first-child th {  
            background-color: teal;
            color: white;
            font: {
                size: 1.2em;
                weight: bold;
                family: Roboto;
            }
        }

        thead tr th {
            position: sticky;
            z-index: 1;
            height: 4em;
            // text-align: center;
        }
        thead tr:first-child th {
            top: 0;
        }

        .q-td {
          font: {
            size: 1.1em;
          }
          cursor: default;
        }

        &.q-table--loading thead tr:last-child th {    
            top: 48px;
        }   

        .q-img {
          width: 3.5rem;
        }

        .status-true{
          font-weight: bold;
          color: $positive
        }
        
        .status-false {
          font-weight: bold;
          color: $negative
        }

    }

</style>
