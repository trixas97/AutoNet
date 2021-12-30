<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="Devices"
      class="newTopoTable"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected="selected"
      @selection="onSelection"
      hide-pagination
      :pagination="pagination"
      bordered
    >
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'center', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'ip', align: 'center', label: 'Ip', field: 'ip'},
  { name: 'network', label: 'Network', field: 'network', align: 'center'},
  { name: 'traffic', label: 'Traffic (kbps)', field: 'traffic',  align: 'center'},
]

// const rows = [
//   {
//     name: 'R1',
//     ip: '192.168.78.1 /24',
//     network: '192.168.78.0 /24',
//     traffic: 1500,
//   },
//   {
//     name: 'S1',
//     ip: '13.13.13.1 /24',
//     network: '13.13.13.0 /24',
//     traffic: 1.5,
//   },
// ]

export default {
  props:{
    rows: Array
  },
  setup (props) {
    const selected = ref([])
    const lastIndex = ref(null)
    const tableRef = ref(null)

    return {
      selected,
      lastIndex,
      tableRef,
      columns,
        pagination: ref({
          rowsPerPage: 0
        }),

      getSelectedString () {
        return selected.value.length === 0 ? '' : `${selected.value.length} device${selected.value.length > 1 ? 's' : ''} selected of ${props.rows.length}`
      },

      onSelection ({ rows, added }) {
          rows.map(row => {
              if(added){
                  selected.value.push(row)
              }else{
                  selected.value.splice(selected.value.indexOf(row),1)
              }
          })
      }
    }
  },
  methods:{
    showItem(key, props) {
        console.log(key);
        console.log(props);
    },
  }
}
</script>

<style lang="scss" >
@import "@/styles/quasar.variables.scss";
    .newTopoTable{
        max-height: 30em;

        .q-table__top, .q-table__bottom, thead tr:first-child th {  
            background-color: teal;
            color: white;
            font: {
                size: 1em;
                weight: bold;
                family: Roboto;
            }
        }
        

        thead tr th {
            position: sticky;
            z-index: 1;
            height: 2em;
            

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