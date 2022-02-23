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

            <q-btn size="md" v-if="col.name == 'edit'" color="positive" round dense @click="editItem(props)" icon="edit" />
            <q-btn size="md" v-if="col.name == 'delete'" color="negative" round dense @click="deleteItem(props)" icon="delete_forever" />
          </q-td>
          
        </q-tr>
      </template>
    </q-table>
  </div>
</template>


<script>
import { ref } from 'vue'


export default {
  props:{
    filter: String,
    columns: Array,
    rows: Array
  },
  setup () {

    return {
        pagination: ref({
          rowsPerPage: 0
        }),
    }
  },
  methods: {
    deleteItem(props){
      switch(props.row.type){
        case 'topology':
          this.$emit('delete', props.row.id)
          break
        case 'network':
          this.$emit('delete', props.row.network)
          break
        default:
          this.$emit('delete', props.row.ip)
          break
      }
      
    },
    editItem(props){
      switch(props.row.type){
        case 'topology':
          this.$emit('edit', props.row.name)
          break
      }
    },
    showItem(key, props) {
      if(key != 'delete' && key != 'edit'){
        switch(props.row.type){
          case 'topology':
            this.$router.push('topology?name='+props.row.name);
            break;
          case 'network':
            this.$emit('networkInfo', props.row.network);
            break;
          default:
            this.$router.push('device?ip='+ props.row.ip);
            break;
        }
      }
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
