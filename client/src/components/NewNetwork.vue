<template>
  <div>
    <div id="newnetwork" class="newnetwork">
      <div class="titlesubmit row q-mt-xl">
        <div class="col"></div>
        <div class="title col">New Network</div>
        <div class="col column items-center">
          <q-btn
            size="1.2em"
            class="q-px-xl q-py-xs q-mt-xs"
            :class="`shadow-8`"
            color="positive"
            label="Next"
            :ripple="{ color: 'black' }"
            push
            unelevated 
            no-caps
          />
        </div>
      </div>
      <div class="formcatalog q-mt-xl row">
        <div class="form col column items-center"><NewNetworkForm ref="formTest" @add-node="addNode" :finishedScan="finishedScan"/></div>
        <div class="catalog col">  
          <NewNetworkCatalog v:bind :nodes="nodes" :finishedScan="finishedScan" :networks="networks" @userpass="userpassform"/>
        </div>
      </div>
      <div class="userpass-area" v-if="userpassvalue.state == 1">
        <div class="userpass-form">
          <span class="device-ip"><label class="device-ip-txt" for="device-ip"> {{userpassvalue.ip}}</label></span>
          <span class="username"><label for="username">Username: </label><input v-model="userpassvalue.username" class="textForm" type="text"></span>
          <span class="password"><label for="password">Password: </label><input v-model="userpassvalue.password" class="textForm" type="text"></span>
          <div class="save-device">
            <input type="button" @click="saveUserDevice" value="Save">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewNetworkForm from './NewNetwork/NewNetworkForm.vue'
import NewNetworkCatalog from './NewNetwork/NewNetworkCatalog.vue'
// import { mount } from '@vue/test-utils'
import { useStore } from 'vuex';
import io from 'socket.io-client'
import axios from 'axios'
import { computed } from '@vue/runtime-core';
export default {

  name: 'NewNetwork',
  components: {
    NewNetworkForm,
    NewNetworkCatalog
  },
  props: {
    auto: {}
  },
  setup() {
    let self = this;
    const store = useStore();
    // const nodes = [
    //   // { id: 1, ip: "192.168.15.1", vendor: "Cisco", mac: "AA:AA:AA:AA:AA:AA" }
    // ];

    const storeState = 'NewNetwork/';
    const storeActions = {
      nodes: `${storeState}getNodes`,
      networks: `${storeState}getNetworks`,
      addNode: `${storeState}addNode`,
      deleteNode: `${storeState}deleteNode`,
      addNetwork: `${storeState}addNetwork`,
      deleteNetwork: `${storeState}deleteNetwork`,
      finishedScan: `${storeState}setFinishedScan`
    }
    const finishedScan = computed(() => store.state.NewNetwork.finishedScan);
    const nodes = computed(() => store.getters[storeActions.nodes]).value;
    const networks = computed(() => store.getters[storeActions.networks]).value;

    
    const apiLinks = {
      server: "http://192.168.1.7:5000",
      autoScan: {
        path: `http://192.168.1.7:5000/api/devices?`,
        p1: "ip=",
        p2: "&id="
      }
    }

    
    const userpassvalue = { state: 0, ip: '', username: '', password: ''};
    let lengthNodes = 0;
    let socket = io(apiLinks.server);

    async function addNode(network){
      console.log('WEE');
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
        // console.log("Removed");

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
      finishedScan
    }
  },
  methods: {
    async userpassform(value){
      // console.log(value);
      this.userpassvalue.state = 1;
      this.userpassvalue.ip = value.ip;
      await this.nodes.forEach(element => {
        if(element.ip == this.userpassvalue.ip){
          this.userpassvalue.username = element.username;
          this.userpassvalue.password = element.password;
        }
      })
      this.userpassvalue.username
    },
    async saveUserDevice(){
      this.userpassvalue.state = 0;
      await this.nodes.forEach(element => {
        if(element.ip == this.userpassvalue.ip){
          element.username = this.userpassvalue.username;
          element.password = this.userpassvalue.password;
        }
      });
      // this.userpassvalue.username = '';
      // this.userpassvalue.password = '';
    }
  },
  computed:{
    testSg(){
      return this.finishedScan;
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
      width: 27%;    
      font: {
        size: 10px;
        family: "arial";
        weight: bold;
      }  
    }
  }

  // .formcatalog {
  //   display: flex;
  //   flex-direction: row;
  //   // background-color: turquoise;

  //   .form {
  //     flex-grow: 1;
  //     width: 1em; 
  //     background-color: red;
  //     // padding-right: 2em;
  //     // padding-left: 5em;
  //     // background-color: red; 
  //     // align-self: flex-end;
  //   }


  //   .catalog {
  //     flex-grow: 1;
  //   background-color: indigo;
  //     width: 1em;
  //     // margin-left: 5em;
  //     // margin-right: 5em;
  //     // background-color: blue;
  //   }
  // }
  .userpass-area {
    // background-color: blue;
    position:absolute;
    width: 100%;
    height: 50%;
    display: grid;
    align-items: center;
    grid-gap: 0;
    // grid-template-rows: 5% 70% 5%;
    // background-color: blue;
    grid-template-areas: 
      ". . . . . . ." 
      ". . . userpass-form . . ."
      ". . . . . . .";
    
    .userpass-form {
      grid-area: userpass-form;
      background-color: white;
      color: teal;
      display: grid;
      height: 100%;
      border-radius: 4px;
      font-weight: bold;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      // grid-template-rows: 1fr 2fr 2fr 2fr;
      grid-template-areas: 
      "device-ip"
      "."
      "username"
      "password"
      "save-device";
      
      .device-ip {
        grid-area: device-ip;
        align-items: center;
        font-weight: bold;
        color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: teal;
        display: flex;
        justify-content: center;

      }
      .username {
        grid-area: username;
      }

      .password {
        grid-area: password;
      }

      .textForm {
        height: 1fr;
        width: 9.2em;
        margin: 0px;
        font-size: 1em;       
        padding: 5px; 
        border: 1px solid #ccc;
        border-radius: 4px;
        // font-weight: bold;
        color: $accent;
        box-sizing: border-box;
      }


      .save-device {
        grid-area: save-device;
        // background-color: lightgreen;
        display: grid;
        // grid-template-columns: 1fr 1fr;
        grid-template-areas: 
        "input";
        
        input {
          // justify-self: end;
          justify-self: center;
          grid-area: input;
          width: 12em;
          height: 3em;
          // margin-top: 1.3em;
          border-radius: 4px;
          background-color: $accent;
          border: none;
          color: #FFFFFF;
          transition: all 0.5s;
          cursor: pointer;
          padding: 5px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          text: {
            align: center;
          }
          font: {
            size: 0.6em;
            weight: bold;
            family: Roboto;
          }
          span {
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
          }
          &:disabled {
            background-color: gray;
            cursor: not-allowed;
            &:hover {
              background-color: gray;
            }
          }
          &:hover {
            background-color: #ab154c;
          }
        }
      }

      
      

        // .device-ip-txt {

        // }
      
    }


    
    // align-self: center;
  }

  // background-color: green;
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

    .userpass-area {
      display: none;
    }

  }

}

</style>