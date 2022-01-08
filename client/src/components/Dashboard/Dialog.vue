<template>
    <q-dialog transition-show="scale" transition-hide="scale">
      <q-card>
          <q-toolbar>
            <q-space/>
            <label class="info">{{ipnet}}</label>  
            <q-space/>
            <q-btn flat v-close-popup round dense icon="close" size="lg" />          
          </q-toolbar>

          <div class="infoContent">
            <!-- <div class="element1">
              <span>Operating System: </span><span class="value value-stable">Value1</span>
            </div> -->
            <!-- <q-field standout label="Operating System" stack-label :dense="dense">
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">IOS v 15.4</div>
              </template>
            </q-field> -->
            <div class="element1">
              <q-card>
                <span class="title">First IP</span>
                <span class="value">{{firstIp}}</span>
              </q-card>
            </div>
            <div class="element2">
              <q-card>
                <span class="title">Last Ip</span>
                <span class="value">{{lastIp}}</span>
              </q-card>
            </div>
            <div class="element3">
              <q-card>
                <span class="title">Devices</span>
                <span class="value">{{devicesCount}}</span>
              </q-card>
            </div>
            <div class="element4">
              <q-card>
                <span class="title">Broadcast</span>
                <span class="value">{{broadIp}}</span>
              </q-card>
            </div>
            <div class="tableComp">
              <TableInfo :rows="devices" :columns="columns" />
            </div>
          </div>
      </q-card>
    </q-dialog>
</template>

<script>
import TableInfo from "@/components/Dashboard/Table.vue";
import store from '@/store'
import { ref, watch } from 'vue'
import { computed } from '@vue/runtime-core';
import _ from "lodash";
export default {
  components:{
    TableInfo
  },
  props:{
      ipnet: String
  },
  setup(props){

    let nodesFromWatch = ref(store.getters['UserData/getNodes'])
    let nodes = computed(() => ref(nodesFromWatch));
    watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (dataNodes) => {
      if(dataNodes != null){
          nodesFromWatch.value = dataNodes
          nodes = ref(nodesFromWatch)
      }
    })

    let netFromWatch = ref(store.getters['UserData/getNetworkByIp'](props.ipnet))
    let net = computed(() => ref(netFromWatch));
    watch(() => _.cloneDeep(store.getters['UserData/getNetworkByIp'](props.ipnet)), (dataNet) => {
      if(dataNet != null){
          netFromWatch.value = dataNet
          net = ref(netFromWatch)
      }
    })

    const columns = [
      { name: 'type', label: 'Type', align: 'left', field: row => row.type, format: val => `${val}`, sortable: true },
      { name: 'name',  label: 'Name', align: 'center', field: 'name', sortable: false },
      { name: 'ip', label: 'IP', field: 'thisNetIp', align: 'center', sortable: false },
      // { name: 'network', label: 'Network', align: 'center', field: 'network' },
      // { name: 'traffic', label: 'Traffic (Kbps)', align: 'center', field: 'traffic', sortable: true },
      { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      // { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]

    return{
      nodes,
      net,
      columns
    }
  },
  methods:{
      mainIp(node){
        try{
          for(let k=0; k < node.interfaces.length; k++){
            if(node.interfaces[k].mainIf.value){
              if(node.interfaces[k].ip_address.value.includes('/'))
                return node.interfaces[k].ip_address.value.split('/')[0]
              else
                return node.interfaces[k].ip_address.value
            }
          }
        }catch(error){
          return ''
        }
        return ''
      },
      network(node){
        try{
          let mainip = this.mainIp(node)
          for(let k=0; k < node.route_table.length; k++){
            if(node.route_table[k].network.value == mainip){
              return `${node.route_table[k-1].network.value}/${node.route_table[k-1].mask.value}`
            }
          }
        }catch(error){
          return ''
        }
        return ''
      }
  },
  computed:{
    firstIp(){
        return this.net.value.firstAddress.value
    },
    lastIp(){
        return this.net.value.lastAddress.value
    },
    broadIp(){
        return this.net.value.broadcastAddress.value
    },
    devicesCount(){
      let count = 0
      this.nodes.value.data.map(node =>{
        node.interfaces.map(inter => {
          if(inter.network.value == this.ipnet)
            count++
        })
      })
      return count
    },
    devices(){
      let nodes = []
      this.nodes.value.data.map(node =>{
        node.interfaces.map(inter => {
          if(inter.network.value == this.ipnet){
            nodes.push({
              type: node.type.value,
              name: node.name.value,
              ip: this.mainIp(node),
              thisNetIp: inter.ip_address.value,
              network: this.network(node),
              // traffic: 1.5,
              status:  node.status.value,
              // delete: '',
            })
          }
        })
      })
      return nodes
    }

  }

}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .q-card{
    min-width: 60%;
    min-height: 90%;
    display: grid;
    grid-template-rows: 1fr 0.5fr 8.5fr;
    grid-template-areas: 
    "bar"
    "."
    "infoContent";

    .q-toolbar {
      grid-area: bar;
      background-color: $darkblue;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      color: white;
      label {
        text-align: center;
        align-self: center;
        font: {
          family: arial;
          size: 3em;
          weight: bold;
        }
        
      }
    }

    .infoContent{
      grid-area: infoContent;
      display: grid;
      text-align: center;
      grid-template-rows: 1.5fr 1.5fr 6fr;
      grid-template-columns: 4.5fr 0.5fr 4.5fr;
      grid-template-areas: 
      "element1 . element2"
      "element3 . element4"
      "tableComp tableComp tableComp";
      font: {
          size:1.5em;
          family: arial
      } 
      .value {
          font-weight: bold;
          color: $accent;
      }

      .value-stable {
          color: $primary-2;
      }


      .q-card{
        margin: auto;
        max-height: 3em;
        max-width: 1em;
        color: white;
        background-color: $consoleBlack;

        .title {
          font: {
            size: 0.7em;
            family: Roboto;
          }
        }
      }

      .element1 {
        grid-area: element1;
        align-self: center;
      }

      .element2 {
        grid-area: element2;
        align-self: center;
      }

      .element3 {
        grid-area: element3;
        align-self: center;
        // background-color: yellowgreen;
      }

      .element4 {
        grid-area: element4;
        align-self: center;
        // background-color: blue;
      }

      .tableComp {
        grid-area: tableComp;
        height: 22em;
        // background-color: #eeef;
      }
    }
  }
</style>