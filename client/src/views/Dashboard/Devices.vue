<template>
  <div class="devices-container">
    <div class="devices-box">
      <div class="head">
        <div class="title"><q-icon name="router" />Devices</div>
        <div class="filter">
            <span class="add-btn"><q-btn round color="accent" size="md" icon="add" @click="newNode" >
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
import { ref, watch, onMounted } from 'vue'
import Table from '@/components/Dashboard/Table'
import store from '@/store';
import { computed } from '@vue/runtime-core';
export default {
    name: 'Devices',
    components: {
      Table
    },
    setup(){

      // const store = useStore();

      const columns = [
        { name: 'type', label: 'Type', align: 'left', field: row => row.type, format: val => `${val}`, sortable: true },
        { name: 'name',  label: 'Name', align: 'center', field: 'name', sortable: false },
        { name: 'ip', label: 'IP', field: 'ip', align: 'center', sortable: false },
        { name: 'network', label: 'Network', align: 'center', field: 'network' },
        { name: 'traffic', label: 'Traffic (Kbps)', align: 'center', field: 'traffic', sortable: true },
        { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'delete', label: '', field: 'delete', align: 'center', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]

      console.log(store.getters['UserData/getNodes']);
      const nodes = computed(() => store.getters['UserData/getNodes']).value;
      const rows = ref(computed(() => modifyNodes()))


      onMounted(() => {
        console.log("MOUNNTEEEDD");
        watch(() => store.getters['UserData/getNodes'], (data) => {
          console.log("Watcheeeerrrrrr OUT");
          if(data != null){
            console.log("Watcheeeerrrrrr");
            console.log(data);
          }
        })
      });


     function modifyNodes(){
        let rowsArray = [];
        for(let  i=0; i<nodes.length; i++){
          rowsArray[i] ={
            type: nodes[i].type.value,
            name: nodes[i].name.value,
            ip: '192.168.78.'+ i,
            network: '192.168.78.0/24',
            traffic: 1.5,
            status: true,
            delete: '',
          };
          if(i == nodes.length-1)
            return(rowsArray)
        }
    }

      // const rows = [
      //   {
      //     type: 'router',
      //     name: 'R1',
      //     ip: '192.168.78.1',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: true,
      //     delete: '',
      //   },
      //   {
      //     type: 'router',
      //     name: 'R2',
      //     ip: '192.168.78.222',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 25,
      //     status: false,
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R3',
      //     ip: '192.168.178.111',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: true,
      //     delete: ''
      //   },
      //   {
      //     type: 'switch',
      //     name: 'S1',
      //     ip: '192.168.78.2',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: true,
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R5',
      //     ip: '192.168.78.3',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: true,
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R6',
      //     ip: '192.168.78.4',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: 'Active',
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R7',
      //     ip: '192.168.78.5',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: 'Active',
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R8',
      //     ip: '192.168.78.6',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: 'Active',
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R9',
      //     ip: '192.168.78.7',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: 'Active',
      //     delete: ''
      //   },
      //   {
      //     type: 'router',
      //     name: 'R10',
      //     ip: '192.168.78.8',
      //     network: '192.168.78.0',
      //     mask: 255,
      //     traffic: 1.5,
      //     status: 'Active',
      //     delete: ''
      //   }
      // ]

      
      return{
        filter: ref(''),
        rows: ref(rows),
        columns,
        nodes: ref(nodes)
      }
    },
    methods:{
      newNode(){
        let nodes = store.getters['UserData/getNodes'];
        nodes.push({
          type: { value: "Router"},
          name: { value: "R13"},
          interfaces: [{mainIf: {value: true}, ip_address: {value: '192.168.778.1'}}, {mainIf: {value: false}, ip_address: {value: '13.13.13.1'}}],
        });
        nodes[0].name.value = "S2"
        nodes[0].type.value = "Switch"
        store.dispatch('UserData/setNodes', nodes);
        console.log(store.getters['UserData/getNodes']);
      },

      findMainIp(node) {
        return new Promise(resolve => {
          node.interfaces.forEach(element => {
            if(element.mainIf.value){
              resolve(element.ip_address.value)
            }
          })
        })
      },
     async initNode(node) {
          let mainIp = ''
          mainIp = await this.findMainIp(node)
          this.rows.push({
            type: node.type.value,
            name: node.name.value,
            ip: mainIp,
            network: '192.168.78.0',
            traffic: 1.5,
            status: true,
            delete: '',
          })
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