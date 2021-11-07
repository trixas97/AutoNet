<template>
  <div class="deviceInfo">
      <Info class="info" @console="openConsole" @config="openConfig" @info="openInfo" :node="node"/>
      <Charts class="chartPanel" :node="node"/>
      <Interfaces class="interfaces" :node="node"/>
      <MoreInfo class="moreInfo" :node="node"/>
      <DialogConsole v-model="consoleFlag" :node="node" :mainIp="mainIp"/>
      <DialogConfig v-model="configFlag" :node="node"/>
      <DialogInfo v-model="infoFlag" :node="node"/>
  </div>
</template>

<script>
import Info from '@/components/Device/Info.vue'
import Charts from '@/components/Device/Charts.vue'
import Interfaces from '@/components/Device/Interfaces.vue'
import MoreInfo from '@/components/Device/MoreInfo.vue'
import DialogConsole from '@/components/Device/DialogConsole'
import DialogConfig from '@/components/Device/DialogConfig'
import DialogInfo from '@/components/Device/DialogInfo'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { computed } from '@vue/runtime-core';
import { ref, watch } from 'vue'
import store from '@/store';
import _ from "lodash";
export default {
  components: {
    Info,
    Charts,
    Interfaces,
    MoreInfo,
    DialogConsole,
    DialogConfig,
    DialogInfo
  },
  setup(){
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
      consoleFlag: ref(false),
      configFlag: ref(false),
      infoFlag: ref(false),
      mainIp,
      nodes: ref(nodes)
    }
  },
  methods:{
    openConsole(value){
      this.consoleFlag = value;
    },
    openConfig(value){
      this.configFlag = value;
    },
    openInfo(value){
      this.infoFlag = value;
    }
  },
  computed:{
   node(){
      let nodes = this.nodes.value.data;
      for(let j=0; j < nodes.length; j++){
          for(let k=0; k < nodes[j].interfaces.length; k++){
              if(nodes[j].interfaces[k].ip_address.value.includes(this.mainIp))
                  return  nodes[j]
          }
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .deviceInfo {
    // background: greenyellow;
    height: 100%;
    display: grid;
    padding-top: 1.5em;
    padding-bottom: 0.1em;
    grid-template-columns: 0.05fr 1fr 0.05fr 1fr 0.05fr;
    grid-template-rows: 2fr 2fr;
    grid-template-areas: 
    ". info . chartPanel ."
    // ". . . chartPanel ."
    ". interfaces . moreInfo .";

    .container {
        // box-shadow: 0 4px 8px 0 rgba(150, 79, 79, 0.2);
        box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
        border-radius: 5px;
        background-color: white;
        height: 90%;
        
    }

    .info {
      grid-area: info;
      min-height: 18em;
      // background: palevioletred;
    }

    .chartPanel {
      grid-area: chartPanel;
      min-height: 18em;
      // background: red;
    }

    .interfaces {
      grid-area: interfaces;
      // background: blue;
      min-height: 18em;
    }

    .moreInfo {
      grid-area: moreInfo;
      // background: burlywood;
      min-height: 18em;
    }
  }
</style>