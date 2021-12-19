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
    <!-- <template v-slot:body="props">
        <q-tr :props="props" >

          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            @click="showItem(col.name, props)"
          >
            <q-icon v-if="col.name == 'status'" :class="col.value ? 'status-true' : 'status-false'" name="circle"/>
            {{ col.name != 'type' && col.name != 'status' ? col.value : null }}
            <span v-if="col.name == 'status'" :class="col.value ? 'status-true' : 'status-false'"> 
              {{ col.name == 'status' && col.value ? 'Active' : 'Inactive' }}
            </span>
          
            <q-img v-if="col.name == 'type' && col.value == 'Router'" src="@/assets/elements/router.svg" />
            <q-img v-if="col.name == 'type' && col.value == 'Switch'" src="@/assets/elements/switch.svg" />
            <q-img v-if="col.name == 'type' && col.value == 'topology'" src="@/assets/elements/topology.svg" />      
            <q-img v-if="col.name == 'type' && col.value == 'network'" src="@/assets/elements/network.svg" />
          </q-td>
          
        </q-tr>
      </template> -->
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Name',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'ip', align: 'center', label: 'Ip', field: 'calories'},
  { name: 'network', label: 'Network', field: 'fat', align: 'center'},
  { name: 'traffic', label: 'Traffic (kbps)', field: 'carbs',  align: 'center'},
]

const rows = [
  {
    name: 'R1',
    calories: '192.168.78.1 /24',
    fat: '192.168.78.0 /24',
    carbs: 1500,
    protein: 4.0,
    sodium: 250,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'S1',
    calories: '13.13.13.1 /24',
    fat: '13.13.13.0 /24',
    carbs: 1.5,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },

]

export default {
  setup () {
    const selected = ref([])
    const lastIndex = ref(null)
    const tableRef = ref(null)

    return {
      selected,
      lastIndex,
      tableRef,
      columns,
      rows,
        pagination: ref({
          rowsPerPage: 0
        }),

      getSelectedString () {
        return selected.value.length === 0 ? '' : `${selected.value.length} device${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
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