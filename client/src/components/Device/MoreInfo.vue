<template>
<div class="container">
    <q-table
      class="protocols"
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
        <label>Protocols</label>

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
    const rows = ref([])
    const columns = ref([{name: 'name', field:'name'}])
    let options= ['EIGRP', 'OSPF']
    let model =  ref(options[0]);
    setTable()
    watch(() => model.value, () => {
      setTable()
    })

    watch(() => _.cloneDeep(props.node), () => {
        console.log("NODE: ", props.node) 
        setTable();
    })



    async function setTable(){
      switch(model.value){
        case options[0]:
          await getColumns('eigrp')
          await getRows('eigrp')
          break;
        case options[1]:
          await getColumns('ospf')
          await getRows('ospf')
          break;
      }
    }

    function getRows(type) {
      return new Promise(resolve => {
        rows.value = []
        for(let i=0; i < props.node[type].length; i++){
          console.log('GETROWS ', props.node[type].length)
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
          if(props.node[type][0][keys[key]].visible)
            columns.value.push({name: keys[key], required: false, label: props.node[type][0][keys[key]].name, align: 'center', field: keys[key] })
        }
        resolve(columns)
      })
    }

    return {
      columns,
      rows,
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
.protocols
  height: 100%
  width: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #e76f51
    color: white

  label
    font-size: 2.2em
    font-weight: bold
  thead tr th
    font-weight: bold
    font-family: "Roboto"
    font-size: 1.2em
    position: sticky
    z-index: 1
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2)
  thead tr:first-child th
    top: 0


  span
    color: white
  &.q-table--loading thead tr:last-child th
    // top: 48px
</style>