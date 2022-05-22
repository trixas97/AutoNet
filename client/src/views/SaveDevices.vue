<template>
  <page>
    <div class="save-devices">
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
import { useStore } from 'vuex';
import { ref, watch } from 'vue'
import _ from "lodash";

export default {
  
  name: 'SaveDevices',
  components:{
    NewNetworkCatalogNode
  },
  data(){
    // const route = useRoute();
    const store = useStore();    
    const nodes = ref(store.getters['NewNetwork/getNodes']);
    
    console.log(nodes);

    watch(() => _.cloneDeep(store.getters['NewNetwork/getNodes']), (dataNodes) => {
      if(dataNodes != null){
          nodes.value = dataNodes
      }
    })

    return {
      nodes,
      store
    }
  },
  methods:{
    saveDevices(){
      this.nodes = this.nodes.map(node => {return {...node, finished:0}})
      this.store.dispatch('NewNetwork/saveDevices', {flag: false, nodes: this.nodes})
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