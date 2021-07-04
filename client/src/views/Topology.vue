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
    <input @click="newNodes" type="button">
  </div>
</template>

<script>
// @ is an alias to /src
// let plainDraggable = require('plain-draggable').default;
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
        let nodesSize = 3;


        return {
            nodeRefs: [],
            imgRefs: [],
            labelRefs: [],
            nodes,
            links,
            nodesSize
        }
    },
    methods:{

        setItemRef(el) {
            if(el){
                console.log('el');

                el.src ? this.imgRefs.push(el) : this.labelRefs.push(el);
                this.nodeRefs.push(el)
                // console.log(this.nodeRefs[this.nodeRefs.length-1]);
            }
            console.log(this.imgRefs);
            console.log(this.labelRefs);

        },
        elementsInit(){
            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    console.log("ok");
                }
            }
        },
        newLink(){
            let start = 0;
            let end = 1;
            console.log(this.nodes[start].node);
            console.log(this.nodes[end]);
            this.links.push(new Link(this.nodes[start].node, this.nodes[end].node,"G0/1","G0/1"));

            this.nodes[start].links.push(this.links[this.links.length - 1]);
            this.nodes[end].links.push(this.links[this.links.length - 1]);

            this.nodes[start].dragLink(this.nodes[start].links);
            this.nodes[end].dragLink(this.nodes[end].links);
        },
        newNodes(){
            this.nodesSize++;
            let nodeifs= [{
                interface: ['G0/0', 'G0/1', 'G0/2'], 
                status: ['down','down', 'down']
            }];
            nodeifs[1] = {
                interface: ['G0/3', 'G0/4', 'G0/5'], 
                status: ['up','up', 'up']
            };
            // console.log('els' + this.imgRefs[0]);
            // for(let i=0; i < 10; i++){
                this.nodes.push(new NetNode(this.imgRefs[0], this.labelRefs[0], [], nodeifs));
                this.nodes[0].labelPosition();
            // }
        },
        async getNodes(){
            const data = {
                token: this.$store.state.User.token,
                // nodes: ['60c66b2975aa7347c8f47b3f', '60c66b2975aa7347c8f47b3f', '60c66b2975aa7347c8f47b3f']
                id: '60e20a22008d4e0dfc38934f'
            }

            const res = await getTopologyRequest(data);
            // newNodes();
            console.log(res);
        }
    },
    beforeUpdate() {
        this.imgRefs = []
        this.labelRefs = []
        this.nodeRefs = []
    },
    updated() {
        // console.log(this.itemRefs)
    },
    mounted(){
        this.elementsInit();
        this.getNodes();
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