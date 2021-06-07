<template>
  <div class="save-devices">
    <!-- <NewNetwork v-bind:auto="false"/> -->
    <div class="titlesubmit">
      <div class="title">Devices</div>
      <div class="submit">
        <input type="button" value="Save" @click="saveDevices" v-bind:disabled="nodes.length == 0 ? true : false"  >
      </div>
    </div>

    <div class=nodes>
      <NewNetworkCatalogNode 
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :userPass="true"
        @userpass="userpassform_open"
        ref="nodesRef"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NewNetworkCatalogNode from '@/components/NewNetwork/NewNetworkCatalogNode.vue'

import axios from 'axios'
export default {
  
  name: 'SaveDevices',
  components:{
    NewNetworkCatalogNode
  },
  data(){
    // const route = useRoute();
    const nodes = this.$route.params.nodes;
    let socket = this.$route.params.socket;

    socket.on('save-nodes',(data) => {
      console.log(data, + "[OK]");
    });


    // const apiLinks = {
    //   server: "http://192.168.1.5:5000",
    //   autoScan: {
    //     path: `http://192.168.1.5:5000/api/devices?`,
    //     p1: "ip=",
    //     p2: "&id="
    //   }
    // }


    return {
      nodes
    }
  },
  methods:{
    saveDevices(){
      console.log("eeeeee");
      axios.post("http://192.168.1.5:5000/api/nodesSave?ip1=192.168.78.131&ip2=192.168.78.133&id="+  this.$route.params.socket.id +"&ip3=192.168.78.132&ip4=192.168.78.134&ip1userpass=trixas trixas&ip2userpass=trixas trixas&ip3userpass=trixas trixas&ip4userpass=trixas trixas").then(response => {
        console.log(response.data);
      })

      this.$refs.nodesRef.forEach(element => {
        element.changeProgress(true);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .save-devices {
    // background-color: blue;
    display: grid;
    width: 100%;
    height: 100%;
    grid-row-gap: 1.5em;
    grid-template-areas: 
    "head head head"
    ". nodes .";

    .titlesubmit{
      grid-area: head;
      // background-color: green;
      width: 100%;
      color:midnightblue;
      display: grid;
      grid-auto-columns: 1fr 2fr 1fr;
      grid-template-areas: 
      ". title btn";

      .title{
        grid-area: title;
        font-size: 1.5em;
      }

      .submit{
        grid-area:btn;
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
    

    .nodes{
      // background-color: green;
      grid-area: nodes;
      width: 100%;
      display: grid;
      justify-items: center;

    }
  }
</style>