<template>
  <div class="topology">
    <img 
        v-for="node in nodesSize"
        :key="node"
        :ref="setItemRef"
        src="@/style/_router.svg" 
        alt="">
    <label        
        v-for="node in nodesSize"
        :key="'NodeLabel' + node"
        :ref="setItemRef"
        alt="">R{{node}}</label>
  </div>
</template>

<script>
// @ is an alias to /src
// let plainDraggable = require('plain-draggable').default;
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
                id: '60e20a22008d4e0dfc38934f'
            }
            const res = await getTopologyRequest(data);
            return res.data.nodes;
        },
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