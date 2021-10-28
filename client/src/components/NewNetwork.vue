<template>
  <div>
    <div id="newnetwork" class="newnetwork">
      <div class="titlesubmit row q-mt-xl">
        <div class="col"></div>
        <div class="title col">New Network</div>
        <div class="col column items-center">
          <router-link :to="{name: 'SaveDevices', params: {nodes: ['nodes'], socket: 'socket'}}">
          <q-btn
            size="1.2em"
            class="q-px-xl q-py-xs q-mt-xs"
            @click="userpassform"
            color="positive"
            label="Next"
            :ripple="{ color: 'black' }"
            push
            unelevated 
            no-caps
          />
          </router-link>
        </div>
      </div>
      <div class="formcatalog q-mt-xl row">
        <div class="form col column items-center"><NewNetworkForm @add-node="addNode" :finishedScan="finishedScan"/></div>
        <div class="catalog col"><NewNetworkCatalog v:bind :nodes="nodes" :finishedScan="finishedScan" :networks="networks" @userpass="userpassform"/></div>
      </div>
      <Dialog v-model="dialog" v-bind:node="nodeDialog"/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import NewNetworkForm from './NewNetwork/NewNetworkForm.vue'
import NewNetworkCatalog from './NewNetwork/NewNetworkCatalog.vue'
import Dialog from './NewNetwork/Dialog.vue'
import { useStore } from 'vuex';
import io from 'socket.io-client'
import axios from 'axios'
import { computed } from '@vue/runtime-core';
export default {

  name: 'NewNetwork',
  components: {
    NewNetworkForm,
    NewNetworkCatalog,
    Dialog
  },
  props: {
    auto: {}
  },
  setup() {
    let self = this;
    const store = useStore();

    const storeState = 'NewNetwork/';
    const storeActions = {
      nodes: `${storeState}getNodes`,
      networks: `${storeState}getNetworks`,
      addNode: `${storeState}addNode`,
      deleteNode: `${storeState}deleteNode`,
      addNetwork: `${storeState}addNetwork`,
      deleteNetwork: `${storeState}deleteNetwork`,
      finishedScan: `${storeState}setFinishedScan`,
      
    }
    const finishedScan = computed(() => store.state.NewNetwork.finishedScan);
    let nodeDialog = null;
    const nodes = computed(() => store.getters[storeActions.nodes]).value;
    const networks = computed(() => store.getters[storeActions.networks]).value;
    const apiLinks = {
      server: `${location.protocol}//${location.hostname}:5000`,
      autoScan: {
        path: `${location.protocol}//${location.hostname}:5000/api/devices?`,
        p1: "ip=",
        p2: "&id="
      }
    }

    
    const userpassvalue = { state: 0, ip: '', username: '', password: ''};
    let lengthNodes = 0;
    let socket = io(apiLinks.server);

    async function addNode(network){
      store.dispatch(storeActions.finishedScan, false);
      socket.on('net-length',(data) => {
        let netExistFlag = false;
        if(networks.length == 0){
          store.dispatch(storeActions.addNetwork, {ip: network, size: data});
        }else {
          networks.forEach(element => { element.ip == network ? netExistFlag = true : null});

          netExistFlag == false ? store.dispatch(storeActions.addNetwork,{ip: network, size: data}) : null;
        }
      });

      socket.on('net-scan',(data) => {
        let flagExist = false;
        nodes.forEach(element => {
          if(element.ip == data.ip){
            element.mac == null ? element.mac = data.mac : null;
            element.vendor == null ? element.vendor = data.vendor : null;
            flagExist = true;
          }
        });
        if(data.vendor == "Cisco"){
          
          if(flagExist == false){
            lengthNodes++;
            store.dispatch(storeActions.addNode, {id: lengthNodes + 1, ip: data.ip, vendor: data.vendor, mac: data.mac, ipnet: networks[networks.length - 1].ip, delete: false, checked: true});
          }
        }else{
          if( data.vendor == null && flagExist == false){
            lengthNodes++;
            store.dispatch(storeActions.addNode, {id: lengthNodes + 1, ip: data.ip, vendor: data.vendor, mac: data.mac, ipnet: networks[networks.length - 1].ip, delete: false, checked: true});
            
          }
        }
      });

      axios.get(`${apiLinks.autoScan.path}${apiLinks.autoScan.p1}${network}${apiLinks.autoScan.p2}${socket.id}`).then(response => {
        console.log(response.data);
        let flagNetExist = false;
        nodes.forEach((element) => { 
          // console.log(element);

          element.vendor != 'Cisco' ||  element.vendor == null? element.delete = true : null 
          element.ipnet == networks[networks.length - 1].ip && element.delete == false ? flagNetExist = true : null

          if(element.delete == true){
            const index = nodes.indexOf(element);
            if (index > -1) {
              store.dispatch(storeActions.deleteNode, index);
            }
          }
        })

        if(flagNetExist == false){         
          store.dispatch(storeActions.deleteNetwork); 
        }
        store.dispatch(storeActions.finishedScan, true);
      })

    }


    return {
      nodes,
      networks,
      apiLinks,
      lengthNodes,
      addNode,
      socket,
      userpassvalue,
      self,
      store,
      storeActions,
      finishedScan,
      dialog: ref(false),
      nodeDialog
    }
  },
  methods: {
    userpassform(value){
      this.nodeDialog = value
      this.dialog = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variables";

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

.newnetwork {
  display: grid;
  grid-gap: 15px;
  padding-top: 2vh;
  grid-template-areas: 
    "titlesubmit" 
    "formcatalog";

  .titlesubmit {
    grid-area: titlesubmit;

    .title {
      color:midnightblue;
      font-size: 2.7em;
      text-align: center;
      font-family: "arial";
    }

    .q-btn {
      width: 11em;
      height: 2.8em;
      border-radius: 4px;
      background-color: $accent;
      border: none;
      color: #FFFFFF;
      transition: all 0.5s;
      padding: 5px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
      font: {
        size: 10px;
        family: "arial";
        weight: bold;
      }  
    }
  }
}



@media screen and (max-width: 1281px) {
  
  .newnetwork {
    grid-gap: 5px;
    padding-top: 0;


    .titlesubmit {
      display: flex;
      flex-direction: column;

      .title {
        padding-bottom: 0;
        width: 100%;
        //  flex-shrink: 3;
      }

      .submit {
        padding-bottom: 0;
        padding-top: 1em;
        width: 100%;
        //  flex-shrink: 3;
      }
    }

    .formcatalog {
      flex-direction: column;
      

      .form {
        width: 1fr;
        padding-right: 0em;
        flex-grow: 1;
        width: 100%;
        // background-color:teal;
      }

      .catalog {
        grid-area: catalog;
        // background-color: indigo;
        width: 100%;
        height: 1fr;
        flex-grow: 1;
        margin-top: 1em;
      }
    }
  }

}

</style>