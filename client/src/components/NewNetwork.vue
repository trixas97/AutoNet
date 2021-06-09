<template>
    <div id="newnetwork" class="newnetwork">
      <div class="titlesubmit">
        <div class="title">New Network</div>
        <div class="submit">
          <router-link :to="{name: 'SaveDevices', params: {nodes: nodes, socket: socket}}"><input type="button" value="Next" v-bind:disabled="nodes.length == 0 ? true : false"  ></router-link>
        </div>
      </div>
      <div class="formcatalog">
        <div class="form"><NewNetworkForm @add-node="addNode" v-bind:finishedScan="finishedScan"/></div>
        <div class="catalog">  
          <NewNetworkCatalog v:bind :nodes="nodes" :networks="networks" v-bind:finishedScan="finishedScan" @userpass="userpassform"/>
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
</template>

<script>
import NewNetworkForm from './NewNetwork/NewNetworkForm.vue'
import NewNetworkCatalog from './NewNetwork/NewNetworkCatalog.vue'
// import {reactive} from 'vue'
import io from 'socket.io-client'
import axios from 'axios'
export default {

  name: 'NewNetwork',
  components: {
    NewNetworkForm,
    NewNetworkCatalog
  },
  props: {
    auto: {}
  },
  data() {
    const nodes = [
      // { id: 1, ip: "192.168.15.1", vendor: "Cisco", mac: "AA:AA:AA:AA:AA:AA" }
    ];
    const networks = [];
    const apiLinks = {
      server: "http://192.168.1.5:5000",
      autoScan: {
        path: `http://192.168.1.5:5000/api/devices?`,
        p1: "ip=",
        p2: "&id="
      }
    }
    const finishedScan = [];
    const userpassvalue = { state: 0, ip: '', username: '', password: ''};
    let lengthNodes = 0;
    let socket = io(apiLinks.server);

    async function addNode(network){
      finishedScan.push(false);
      socket.on('net-length',(data) => {
        // console.log("size networks " + networks.length);
        let netExistFlag = false;
        if(networks.length == 0){
          // console.log("first");
          networks.push({ip: network, size: data});
        }else {
          // console.log("second+");
          networks.forEach(element => { element.ip == network ? netExistFlag = true : null});
          netExistFlag == false ? networks.push({ip: network, size: data}) : null;
        }
        // networks[networks.length-1].size = data
        // console.log(data);
      });

      socket.on('net-scan',(data) => {
        // console.log(data);
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
            nodes.push({id: lengthNodes + 1, ip: data.ip, vendor: data.vendor, mac: data.mac, ipnet: networks[networks.length - 1].ip, delete: false, checked: true});
          }
        }else{
          if( data.vendor == null && flagExist == false){
            lengthNodes++;
            nodes.push({id: lengthNodes + 1, ip: data.ip, vendor: data.vendor, mac: data.mac, ipnet: networks[networks.length - 1].ip, delete: false, checked: true});
            
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
              nodes.splice(index, 1);
            }
          }
        })
        // console.log("Removed");

        if(flagNetExist == false){
          // console.log("pao");
          networks.pop();
          // console.log(networks.length);
          // networks.length > 0 ? console.log(networks[0].ip) : null;
        }
        nodes.forEach((element) => { 
          console.log(element);
        })
        finishedScan.pop();
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
  // background-color: teal;
  padding-top: 2vh;
  // grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-template-areas: 
    "titlesubmit" 
    "formcatalog";

  .titlesubmit {
    grid-area: titlesubmit;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 
    ". title submit";

    .title {
      grid-area: title;
      width: 100%;
      color:midnightblue;
      // background-color: thistle;
      font-size: 1.5em;
      padding-bottom: 1.5em;
    }

    .submit {
      grid-area: submit;
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
        background-color: #00b336;
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
          background-color: #3e8e41;
        }
      }
    }
  }

  .formcatalog {
    display: flex;
    flex-direction: row;
    grid-area: formcatalog;
    // background-color: turquoise;

    .form {
      grid-area: form;
      flex-grow: 1;
      width: 1em; 
      // padding-right: 2em;
      // padding-left: 5em;
      // background-color: red; 
      // align-self: flex-end;
    }


    .catalog {
      grid-area: catalog;
      flex-grow: 1;
    // background-color: indigo;
      width: 1em;
      // margin-left: 5em;
      // margin-right: 5em;
      // background-color: blue;
    }
  }
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