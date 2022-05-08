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

import NetNode from '@/objects/netnode.js'
import Link from '@/objects/link.js'
import store from '@/store'
import { ref, watch } from 'vue'
import { computed } from '@vue/runtime-core';
import _ from "lodash";
import { useRoute } from 'vue-router';

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
            linksData
        }
    },
    methods:{

        setItemRef(el) {        
            if(el){ el.src ? this.imgRefs.push(el) : this.labelRefs.push(el); }
        },

        findLinks(){
            console.log(this.nodesData.value[1]);
            this.nodesData.value.map(node => {
                node.cdp.map(cdpEntry => {
                    this.isValidCdpEntry(node,cdpEntry)
                })
            })
        },

        isValidCdpEntry(nodeStart, cdpEntry){
            let nodeEnd = this.nodesData.value.find(node => node.interfaces.find(inter => inter.ip_address.value.includes(`${cdpEntry.management_ip.value}/`)))
            if(nodeEnd){
                // If link is not exist then add it
                if(!this.links.find(link => (link.ifstart.id == nodeEnd._id && nodeEnd.interfaces.find(inter => inter.interface_short.value == link.ifstart.name)) || (link.ifend.id == nodeEnd._id && nodeEnd.interfaces.find(inter => inter.interface_short.value == link.ifend.name)))){
                    this.addLink(nodeStart,nodeEnd,cdpEntry)
                }
            }
        },

        addLink(nodeStart, nodeEnd, cdpEntry){
            let start = {};
            let end = {};
            let nodeInterface = nodeStart.interfaces.find(inter => inter.interface.value == cdpEntry.local_port.value)

            start.id = nodeStart._id; 
            start.name = nodeInterface.interface_short.value
            start.state = (nodeInterface.protocol_status.value.includes('up') && nodeInterface.link_status.value.includes('up')) ? true : false
            
            end.id = nodeEnd._id; 
            end.name = nodeInterface.interface_short.value
            end.state = (nodeInterface.protocol_status.value.includes('up') && nodeInterface.link_status.value.includes('up')) ? true : false

            let link = new Link(this.nodes[start.id].node, this.nodes[end.id].node,{id: start.id, name: start.name, state: start.state},{id: end.id, name: end.name, state: end.state}); 
            this.links.push(link)
            this.nodes[start.id].links.push(link);
            this.nodes[end.id].links.push(link);
            this.nodes[start.id].dragLink();
            this.nodes[end.id].dragLink();
            
        },

        initNodes() {
            let nodesData = this.nodesData.value
            for(let i=0; i < nodesData.length; i++){
                let topoNode = this.topo.value.nodes.find(node => node.id == nodesData[i]._id)
                // this.nodes.push(new NetNode(this.imgRefs[i], {name: this.labelRefs[i], x: this.nodesData[i].topologyInfo.label.x, y:this.nodesData[i].topologyInfo.label.y}, [], this.nodesData[i].interfaces));
                this.nodes[nodesData[i]._id] = new NetNode(nodesData[i]._id,this.topo.value._id,this.imgRefs[i],{name: this.labelRefs[i], x: topoNode.label.x, y:topoNode.label.y}, [], nodesData[i].interfaces);
                this.nodes[nodesData[i]._id].dragnode.left = topoNode.x;
                this.nodes[nodesData[i]._id].dragnode.top = topoNode.y;
                this.nodes[nodesData[i]._id].labelPosition(); 
            }

            this.findLinks()
        },

        updateNodes(){
            this.topo.value.nodes.map(node => {
                if(this.nodes[node.id] === undefined){
                    this.initNodes()
                }else{
                    this.nodes[node.id].updateAllPositions(node.x, node.y)
                }
            })
        }
    },
    updated() { 
        this.updateNodes()
    },
    mounted(){
        this.initNodes() 
    },
    unmounted(){
        for(let i=0; i < this.links.length; i++){
            this.links[i].link.remove()
            delete this.links[i]
        }
    }
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