<template>
  <div class="q-pa-md tableComp">
     <q-table
      class="tableInfo"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      hide-pagination 
      :pagination="pagination"
    >
    
    <template v-slot:top>
        <label>Tables</label>
        <q-space />
        <q-select standout v-model="model" :options="options"  label-color="white" color="teal"  bg-color="blue"/>
      </template>
     
    </q-table>
  </div>
</template>
<script>
import {  ref, watch } from 'vue'
import _ from "lodash";

export default {
  props:{
    node: {type: Object, required:true}
  },
  setup (props) {
    let rows = ref([])
    let options= ['Route', 'ARP', 'ACL']
    let model =  ref(options[0]);
    
    let columns = ref([{name: 'name', field:'name'}])
    setTable()
    watch(() => model.value, () => {
      setTable()
    })

    watch(() => _.cloneDeep(props.node), () => { 
        setTable();
    })
    async function setTable(){
      switch(model.value){
        case options[0]:
          await getColumns('route_table')
          await getRows('route_table')
          break;
        case options[1]:
          await getColumns('arp_table')
          await getRows('arp_table')
          break;
        case options[2]:
          await getColumns('acl')
          await getRows('acl')
          break;

      }
    }

    function getRows(type) {
      return new Promise(resolve => {
        rows.value = []
        for(let i=0; i < props.node[type].length; i++){
          let row = {};
          let keys = Object.keys(props.node[type][i]);
          for(let key=0; key < keys.length; key++){
            row[keys[key]] = props.node[type][i][keys[key]].value
          }

          rows.value.push(row)
        }
        resolve(rows)
      })
    }

    function getColumns(type) {
      return new Promise(resolve => {
        columns.value = []
        let keys = Object.keys(props.node[type][0]);
        for(let key=0; key < keys.length; key++){
          columns.value.push({name: keys[key], required: false, label: props.node[type][0][keys[key]].name, align: 'center', field: keys[key] })
        }
        resolve(columns)
      })
    }

    return {
      columns: ref(columns),
      rows: ref(rows),
      pagination: ref({
          rowsPerPage: 0
      }),      
      options,
      model
    }
  }
}
</script>


<style lang="sass">
@import @/styles/quasar.variables.scss
.tableInfo
  height: 100%
  width: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: $darkblue
    color: white

  label
    font-size: 1.5em
    font-weight: bold
  thead tr th
    font-weight: bold
    font-family: "Roboto"
    font-size: 1em
    position: sticky
    z-index: 1
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2)
  thead tr:first-child th
    top: 0

  tr:nth-child(even)
    background-color: #f2f2f2


  span
    color: white
  &.q-table--loading thead tr:last-child th
    // top: 48px
</style>


