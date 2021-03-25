<template>
    <div id="newnetwork" class="newnetwork">
        <div class="titlesubmit">
          <div class="title">New Network</div>
          <div class="submit">
            <input type="button" value="Save" v-bind:disabled="nodes.length == 0 ? true : false" >
          </div>
        </div>
        <div class="formcatalog">
          <div class="form"><NewNetworkForm @add-node="addNode" v-bind:searchbtn="searchbtn"/></div>
          <div class="catalog">  

      <NewNetworkCatalog v:bind :nodes="nodes" :networks="networks"/></div>
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
  data() {
    const nodes = [
      // { id: 1, ip: "192.168.15.1", vendor: "Cisco", mac: "AA:AA:AA:AA:AA:AA" }
    ];
    const networks = [];
    const apiLinks = {
      server: "http://192.168.2.14:5000",
      autoScan: {
        path: "http://192.168.2.14:5000/api/devices?",
        p1: "ip=",
        p2: "&id="
      }
    }
    const searchbtn = [];
    let lengthNodes = 0;
    let socket = io(apiLinks.server);

    async function addNode(network){
      networks.push(network);
      searchbtn.push(true);
      socket.on('net-scan',(data) => {
        let flagExist = false;
        nodes.forEach(element => {
          if(element.ip == data.ip){
            element.mac = data.mac;
            element.vendor = data.vendor;
            flagExist = true;
          }
        });
        if(data.vendor == "Cisco"){
          
          if(flagExist == false){
            lengthNodes++;
            nodes.push({id: lengthNodes + 1, ip: data.ip, vendor: data.vendor, mac: data.mac, delete: false});
          }
        }else{
          if( data.vendor == null && flagExist == false){
            lengthNodes++;
            nodes.push({id: lengthNodes + 1, ip: data.ip, vendor: data.vendor, mac: data.mac, delete: false});
            
          }
        }
      });

      axios.get(`${apiLinks.autoScan.path}${apiLinks.autoScan.p1}${network}${apiLinks.autoScan.p2}${socket.id}`).then(response => {
        console.log(response.data);
        nodes.forEach((element) => { if(element.vendor == null) { element.delete = true } })
        if(nodes.length == 0){
          networks.pop();
        }
        searchbtn.pop();
      })

    }


    return {
      nodes,
      networks,
      apiLinks,
      lengthNodes,
      addNode,
      socket,
      searchbtn
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
          &:after {
            content: '\00bb';
            position: absolute;
            opacity: 0;
            top: 0;
            right: -4em;
            transition: 0.5s;
          }
        }
        &:disabled {
          background-color: gray;
          cursor: not-allowed;
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