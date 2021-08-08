<template>
  <page class="test">
    <div class="save-devices test">
      <!-- <NewNetwork v-bind:auto="false"/> -->
      <div class="titlesubmit">
        <div class="title">Devices</div>
        <div class="submit">
          <q-btn
          v-bind:disabled="nodes.length == 0 ? true : false"
            size="1.2em"
            class="q-px-xl q-py-xs q-mt-xs"
            color="positive"
            label="Save"
            @click="saveDevices"
            :ripple="{ color: 'black' }"
            push
            unelevated 
            no-caps
          />
        </div>
      </div>

      <div class=nodes>
        <!-- @userpass="userpassform_open" -->
        <NewNetworkCatalogNode 
          v-for="node in nodes"
          :checked="node.checked"
          :key="node.id"
          :node="node"
          :userPass="true"
          ref="nodesRef"
          class="node"
        />
      </div>
    </div>
  </page>
</template>

<script>
// @ is an alias to /src
import NewNetworkCatalogNode from '@/components/NewNetwork/NewNetworkCatalogNode.vue'
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import io from 'socket.io-client'
import axios from 'axios'
export default {
  
  name: 'SaveDevices',
  components:{
    NewNetworkCatalogNode
  },
  data(){
    // const route = useRoute();
    const store = useStore();
    const storeState = 'NewNetwork/';
    const storeActions = {
      nodes: `${storeState}getNodes`,
    }
    
    const nodes = computed(() => store.getters[storeActions.nodes]).value;
    let socket = io('http://192.168.2.14:5000');
    
    console.log(nodes);
    let url = 'http://192.168.2.14:5000/api/nodesSave';
     
    socket.on('save-nodes',(data) => {
      this.$refs.nodesRef.forEach(element => {
        if(element.node.ip == data.ip)
          element.changeFinished(data.messageState);
      });
      console.log('[OK]');
    });

    return {
      nodes,
      socket,
      url
    }
  },
  methods:{
    saveDevices(){
      let params = {}

      for(let i=0; i < this.nodes.length; i++){
        let param = `node${i}`;
        params[param] = `${this.nodes[i].ip} ${this.nodes[i].username} ${this.nodes[i].password}`;
      }

      params.id = this.$route.params.socket.id;

      axios.post(this.url, params).then(response => {
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
    display: grid;
    width: 100%;
    height: 100%;
    grid-row-gap: 1.5em;
    grid-auto-rows: 1fr 5fr;
    grid-template-areas: 
    "head head head"
    ". nodes .";

    .titlesubmit{
      grid-area: head;
      width: 100%;
      color:midnightblue;
      display: grid;
      grid-auto-columns: 1fr 2fr 1fr;
      grid-template-areas: 
      ". title btn";

      .title{
        grid-area: title;
        font: {
          size: 3em;
          family: 'arial';
        }
        margin: auto;
      }

      .submit{
        grid-area:btn;
        display: grid;
        justify-items: center;
            .q-btn {
              margin: auto;
              width: 11em;
              height: 2.8em;
              border-radius: 4px;
              border: none;
              color: #FFFFFF;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
              font: {
                size: 10px;
                family: "arial";
                weight: bold;
              }  
            }
      }
    }
    

    .nodes{
      grid-area: nodes;
      width: 100%;
      height: 100%;
      display: block;

      .node {
        height: 5em;
        margin-left: auto;
        margin-right: auto;
      }

    }
  }
</style>