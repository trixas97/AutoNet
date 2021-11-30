<template>
    <div class="topology">
        <img 
            v-for="node in nodesData.value.length"
            :key="node"
            :ref="setItemRef"
            :src="nodesData.value[node-1].type.value == 'Router' ? require('@/assets/elements/router.svg') : require('@/assets/elements/switch.svg')"
            :style="nodesData.value[node-1].type.value == 'Router' ? {width:'4.6em', height:'3.2em', opacity: nodesData.value[node-1].status.value ? 1 : 0.4 } : {width:'4.7em', height:'2.7em', opacity: nodesData.value[node-1].status.value ? 1 : 0.4}"
            :id="node"
            alt="">
        <label        
            v-for="node in nodesData.value.length"
            :key="'NodeLabel' + node"
            :ref="setItemRef"
            :style="nodesData.value[node-1].status.value ? {opacity: 1} : {opacity: 0.4}"
            alt="">{{nodesData.value[node-1].name.value}}
        </label>
  </div>
</template>

<script>
// @ is an alias to /src
import NetNode from '@/objects/netnode.js'
// import Link from '@/objects/link.js'
// import io from 'socket.io-client'
import store from '@/store'
import { ref, watch } from 'vue'
import { computed } from '@vue/runtime-core';
import _ from "lodash";
import { useRoute } from 'vue-router';
// const { serverUrl, getTopologyRequest } = require('@/services/api');

export default {
    name: 'Topology',
    components: {

    },
    setup(){
        const route = useRoute();
        let initData= ref(false)
        let nodes = [];
        let links = [];
        let topo = computed(() => ref(store.getters['UserData/getTopology'](route.query.name)));
        // let nodesData = [];
        let linksData = [];

        let nodesFromWatch = ref(store.getters['UserData/getTopologyNodes'](route.query.name))
        let nodesData = computed(() => ref(nodesFromWatch));

        watch(() => _.cloneDeep(store.getters['UserData/getTopology'](route.query.name)), (dataTopo) => { 
            if(dataTopo != null){
                topo = ref(dataTopo)
            }
        })

        watch(() => _.cloneDeep(store.getters['UserData/getTopologyNodes'](route.query.name)), (nodesTopo) => { 
            if(nodesTopo != null){
                nodesFromWatch.value = nodesTopo
                nodesData = ref(nodesFromWatch)
            }
        })



        return {
            nodeRefs: [],
            imgRefs: [],
            labelRefs: [],
            initData,
            topo,
            nodes,
            links,
            nodesData,
            linksData,
            // socket,
        }
    },
    methods:{

        setItemRef(el) {        
            if(el){ el.src ? this.imgRefs.push(el) : this.labelRefs.push(el); }
        }

    //     newLink(start,end){
    //         this.links.push(new Link(this.nodes[start.id].node, this.nodes[end.id].node,{id: start.id, name: start.name, state: start.state},{id: end.id, name: end.name, state: end.state}));

            
    //         this.nodes[start.id].links.push(this.links[this.links.length - 1]);
    //         this.nodes[end.id].links.push(this.links[this.links.length - 1]);

    //         this.nodes[start.id].dragLink(this.nodes[start.id].links);
    //         this.nodes[end.id].dragLink(this.nodes[end.id].links);
    //     },
    //     async getTopoInfo(){
    //         const data = {
    //             token: this.$store.state.User.token,
    //             id: this.topoId
    //         }
            
    //         const res = await getTopologyRequest(data);
    //         console.log(res.data);
    //         return res.data;
    //     },

    //     socketListener(){
    //         this.socket.on(this.topoId,(data) => {               
    //             // data.adminStatus ? this.links[0].setUp(this.links[0].start) : this.links[0].setDown(this.links[0].start);
    //             this.nodes[data.id].setLinkState(data);
    //         });
    //     }
    //     // async saveNode(){
    //     //     const data = {
    //     //         token: this.$store.state.User.token,
    //     //         nodes: [{ node: '60c66b2975aa7347c8f47b3e', x:250, y:250, labelx:100, labely:100 }, { node: '60c66b2975aa7347c8f47b3f', x:250, y:250, labelx:100, labely:100 }, { node: '60c66b2975aa7347c8f47b40', x:250, y:250, labelx:100, labely:100 }]
    //     //     }
    //     //     const res = await saveTopologyRequest(data);
    //     // }
    },
    // beforeUpdate() {
    //     this.imgRefs = []
    //     this.labelRefs = []
    //     this.nodeRefs = []
    // },
    updated() {    
        let nodesData = this.nodesData.value
        for(let i=0; i < nodesData.length; i++){
            let topoNode = this.topo.value.nodes.find(node => node.id == nodesData[i]._id)
            // this.nodes.push(new NetNode(this.imgRefs[i], {name: this.labelRefs[i], x: this.nodesData[i].topologyInfo.label.x, y:this.nodesData[i].topologyInfo.label.y}, [], this.nodesData[i].interfaces));
            this.nodes[nodesData[i]._id] = new NetNode(nodesData[i]._id,this.imgRefs[i], {name: this.labelRefs[i], x: topoNode.label.x, y:topoNode.label.y}, [], nodesData[i].interfaces);
            this.nodes[nodesData[i]._id].dragnode.left = topoNode.x;
            this.nodes[nodesData[i]._id].dragnode.top = topoNode.y;
            this.nodes[nodesData[i]._id].labelPosition(); 
        }

        // for(let i=0; i < this.linksData.length; i++){
        //     let start = {};
        //     let end = {};
        //     for(let j=0; j < this.nodesData.length; j++){
        //         if(this.linksData[i].nodeStart == this.nodesData[j]._id) { start.id = this.nodesData[j]._id; start.name = this.linksData[i].ifStart.name; start.state = this.linksData[i].ifStart.state; }
        //         if(this.linksData[i].nodeEnd == this.nodesData[j]._id) { end.id = this.nodesData[j]._id; end.name = this.linksData[i].ifEnd.name; end.state = this.linksData[i].ifEnd.state; }
        //     }
        //     this.newLink(start,end);
        // }
    },
    // async mounted(){
    //     this.topo = await this.getTopoInfo();
    //     this.socketListener();
    //     // this.nodesData = this.topo.nodes;
    //     this.linksData = this.topo.links;   
    // },
    // async unmounted(){
    //     this.nodes = []
    //     await this.links.forEach(async element => {
    //        await element.link.remove()
    //     });
    //     this.links = [];       
    // }
}
</script>
<style lang="scss" scoped>
    .topology {
        height: 100%; 
        width: 100%;
        label{
            color: black;
            font: {
                family: 'Arial';
                size: 25px;
            }
            width: 1px;
            height: 1px;
        }
    }
</style>