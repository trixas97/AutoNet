<template>
<div class="container">
    <q-table
      class="my-sticky-header-table"
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
          <label>Interfaces</label>
          <q-space />
          <q-select standout v-model="model" :options="options"  label-color="white" color="teal"  bg-color="blue"/>
      </template>
     
    </q-table>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ref, watch } from 'vue'
import store from '@/store';
import { computed } from '@vue/runtime-core';
import _ from "lodash";

// let options= [
//   'G0/0', 'G0/1', 'G0/2', 'G0/3', 'G0/4'
// ]

export default {
  setup () {

    const columns = [
      { name: 'name', required: true, label: 'Option', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
      { name: 'value', align: 'left', label: 'Value', field: 'value', sortable: true },
    ]
    const route = useRoute()
    let mainIp = ''

    let nodesFromWatch = ref(store.getters['UserData/getNodes'])
    let nodes = computed(() => ref(nodesFromWatch));

    watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (dataNodes) => { 
        if(dataNodes != null){
            nodesFromWatch.value = dataNodes
            nodes = ref(nodesFromWatch)
        }
    })

    onMounted(() => {
        mainIp = route.query.ip
    })

    return {
      columns,
      nodes: ref(nodes),
      pagination: ref({ rowsPerPage: 0 }),     
      model: ref([]), 
      mainIp
    }
  },
  methods:{
      initModel(val){
        this.model = val
      }
  },

  computed:{
      rows(){
        let rowsArray = [];
        let node = this.node;
        try{
          for(let k=0; k < node.interfaces.length; k++){
            if(node.interfaces[k].interface_short.value == this.model){
              Object.keys(node.interfaces[k]).forEach(key => {
                if(node.interfaces[k][key].visible)
                  rowsArray.push({name: node.interfaces[k][key].name, value: node.interfaces[k][key].value})
              });
              return rowsArray
            }
          }
        }catch(error){return rowsArray}
        return rowsArray
      },
      options(){
        let optionsArray = [];
        let node = this.node;
        try{
          for(let i=0; i < node.interfaces.length; i++){
            optionsArray.push(node.interfaces[i].interface_short.value)
            if(i == node.interfaces.length - 1){
              this.initModel(optionsArray[0])
              return optionsArray
            }
          }
        }catch(error){ return optionsArray}
        return optionsArray
      },
      node(){
        let nodes = this.nodes.value.data;
        for(let j=0; j < nodes.length; j++){
          for(let k=0; k < nodes[j].interfaces.length; k++){
            if(nodes[j].interfaces[k].ip_address.value.includes(this.mainIp))
              return nodes[j]
          }
        }
        return {}
      }
  }
}
</script>
//e56353 
<style lang="sass">
.my-sticky-header-table
  height: 100%
  width: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #329F5B
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