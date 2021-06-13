<template>
  <div class="topology">
    <img 
        v-for="node in 10"
        :key="node"
        ref="nodeImg"
        src="@/style/_router.svg" 
        alt="">
    <label        
        v-for="node in 10"
        :key="'NodeLabel' + node"
        ref="nodeLabel"
        alt="">R{{node}}</label>
    <input @click="newLink" type="button">
  </div>
</template>

<script>
// @ is an alias to /src
// let plainDraggable = require('plain-draggable').default;
import NetNode from '@/objects/netnode.js'
import Link from '@/objects/link.js'

export default {
    name: 'Topology',
    components: {

    },
    data(){
        let nodes = [];
        let links = [];
        return {
            nodes,
            links
        }
    },
    methods:{
        elementsInit(){
            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    console.log('Page completed with image and files!')
                    // fetch to next page or some code
                    let nodeifs= [{
                        interface: ['G0/0', 'G0/1', 'G0/2'], 
                        status: ['down','down', 'down']
                    }];
                    nodeifs[1] = {
                        interface: ['G0/3', 'G0/4', 'G0/5'], 
                        status: ['up','up', 'up']
                    };
                    
                    for(let i=0; i < 10; i++){
                        this.nodes.push(new NetNode(this.$refs.nodeImg[i], this.$refs.nodeLabel[i], [], nodeifs));
                        this.nodes[i].labelPosition();
                    }
                    
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
        }
    },
    mounted(){
        this.elementsInit();
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