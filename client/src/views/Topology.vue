<template>
  <div class="topology">
    <img 
        v-for="node in nodesSize"
        :key="node"
        :ref="setItemRef"
        src="@/style/_router.svg" 
        :style="{width:'3.5vw', height:'5vh'}"
        alt="">
    <label        
        v-for="node in nodesSize"
        :key="'NodeLabel' + node"
        :ref="setItemRef"
        alt="">{{node}}</label>
        <!-- <input type="button" v-on:click="saveNode"> -->
  </div>
</template>

<script>
// @ is an alias to /src
import NetNode from '@/objects/netnode.js'
// import Link from '@/objects/link.js'
const { getTopologyRequest } = require('../router/api');

export default {
    name: 'Topology',
    components: {

    },
    data(){
        let nodes = [];
        let links = [];
        let nodesSize = 0;
        let nodesData = [];


        return {
            nodeRefs: [],
            imgRefs: [],
            labelRefs: [],
            nodes,
            links,
            nodesSize,
            nodesData
        }
    },
    methods:{

        setItemRef(el) {
            if(el){ el.src ? this.imgRefs.push(el) : this.labelRefs.push(el); }
        },

        // newLink(){
        //     let start = 0;
        //     let end = 1;
        //     console.log(this.nodes[start].node);
        //     console.log(this.nodes[end]);
        //     this.links.push(new Link(this.nodes[start].node, this.nodes[end].node,"G0/1","G0/1"));

        //     this.nodes[start].links.push(this.links[this.links.length - 1]);
        //     this.nodes[end].links.push(this.links[this.links.length - 1]);

        //     this.nodes[start].dragLink(this.nodes[start].links);
        //     this.nodes[end].dragLink(this.nodes[end].links);
        // },
        async getNodes(){
            const data = {
                token: this.$store.state.User.token,
                id: '60e8a88f5e398110b04d707c'
            }
            const res = await getTopologyRequest(data);
            return res.data.nodes;
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
        let nodeifs= [{
            interface: ['G0/0', 'G0/1', 'G0/2'], 
            status: ['down','down', 'down']
        }];
        nodeifs[1] = {
            interface: ['G0/3', 'G0/4', 'G0/5'], 
            status: ['up','up', 'up']
        };

        for(let i=0; i < this.nodesSize; i++){
            this.nodes.push(new NetNode(this.imgRefs[i], this.labelRefs[i], [], nodeifs));
            this.nodes[i].dragnode.left = this.nodesData[i].topologyInfo.x;
            this.nodes[i].dragnode.top = this.nodesData[i].topologyInfo.y;
            this.nodes[i].labelPosition();
        }
    },
    async mounted(){
        this.nodesData = await this.getNodes();
        this.nodesSize = this.nodesData.length;       
    }     
}
</script>
<style lang="scss" scoped>
    .topology {
        // background-color: yellowgreen;
        label{
            color: black;
        }
    }
</style>