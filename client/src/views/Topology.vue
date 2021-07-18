<template>
  <div class="topology">
    <img 
        v-for="node in nodesData.length"
        :key="node"
        :ref="setItemRef"
        src="@/style/_router.svg" 
        :style="{width:'2.5em', height:'1.8em'}"
        alt="">
    <label        
        v-for="node in nodesData.length"
        :key="'NodeLabel' + node"
        :ref="setItemRef"
        alt="">{{nodesData[node-1].name}}</label>
  </div>
</template>

<script>
// @ is an alias to /src
import NetNode from '@/objects/netnode.js'
import Link from '@/objects/link.js'
const { getTopologyRequest } = require('../router/api');

export default {
    name: 'Topology',
    components: {

    },
    data(){
        let nodes = [];
        let links = [];
        let topo = {};
        let nodesData = [];
        let linksData = [];


        return {
            nodeRefs: [],
            imgRefs: [],
            labelRefs: [],
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

        newLink(start,end){
            this.links.push(new Link(this.nodes[start.id].node, this.nodes[end.id].node,{name: start.name, state: start.state},{name: end.name, state: end.state}));

            this.nodes[start.id].links.push(this.links[this.links.length - 1]);
            this.nodes[end.id].links.push(this.links[this.links.length - 1]);

            this.nodes[start.id].dragLink(this.nodes[start.id].links);
            this.nodes[end.id].dragLink(this.nodes[end.id].links);
        },
        async getTopoInfo(){
            const data = {
                token: this.$store.state.User.token,
                id: '60e8a88f5e398110b04d707c'
            }
            
            const res = await getTopologyRequest(data);
            console.log(res.data);
            return res.data;
        },
        // async saveNode(){
        //     const data = {
        //         token: this.$store.state.User.token,
        //         nodes: [{ node: '60c66b2975aa7347c8f47b3e', x:250, y:250, labelx:100, labely:100 }, { node: '60c66b2975aa7347c8f47b3f', x:250, y:250, labelx:100, labely:100 }, { node: '60c66b2975aa7347c8f47b40', x:250, y:250, labelx:100, labely:100 }]
        //     }
        //     const res = await saveTopologyRequest(data);
        // }
    },
    beforeUpdate() {
        this.imgRefs = []
        this.labelRefs = []
        this.nodeRefs = []
    },
    updated() {      

        for(let i=0; i < this.nodesData.length; i++){
            this.nodes.push(new NetNode(this.imgRefs[i], {name: this.labelRefs[i], x: this.nodesData[i].topologyInfo.label.x, y:this.nodesData[i].topologyInfo.label.y}, [], this.nodesData[i].interfaces));
            this.nodes[i].dragnode.left = this.nodesData[i].topologyInfo.x;
            this.nodes[i].dragnode.top = this.nodesData[i].topologyInfo.y;
            this.nodes[i].labelPosition();
        }

        for(let i=0; i < this.linksData.length; i++){
            let start = {};
            let end = {};
            for(let j=0; j < this.nodesData.length; j++){
                if(this.linksData[i].nodeStart == this.nodesData[j]._id) { start.id = j; start.name = this.linksData[i].ifStart.name; start.state = this.linksData[i].ifStart.state; }
                if(this.linksData[i].nodeEnd == this.nodesData[j]._id) { end.id = j; end.name = this.linksData[i].ifEnd.name; end.state = this.linksData[i].ifEnd.state; }
            }
            this.newLink(start,end);
        }
    },
    async mounted(){
        this.topo = await this.getTopoInfo();
        this.nodesData = this.topo.nodes;
        this.linksData = this.topo.links;   
    }     
}
</script>
<style lang="scss" scoped>
    .topology {
        label{
            color: black;
        }
    }
</style>