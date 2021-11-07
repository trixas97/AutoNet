<template>
    <div class="configComp">
        <div class="head">
            <div class="save"><q-btn push color="green" round size="lg" icon="save">
                <q-tooltip class="bg-green text-body1" :offset="[10, 10]">
                    Save
                </q-tooltip>
            </q-btn></div>
            <span class="title">{{title}} Configuration</span>
            <div class="close"><q-btn push color="secondary" icon="save_alt" round size="lg">
                <q-tooltip class="bg-secondary text-body1" :offset="[10, 10]">
                    Download
                </q-tooltip>
            </q-btn></div>
        </div>
        <q-scroll-area
            class="scrollArea"
        >
            <prism language="editorconfig">{{ dataConfig }}</prism>
        </q-scroll-area>
    </div>
</template>

<script>
import"prismjs/prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-editorconfig"
import Prism from "vue-prism-component";
import { ref, watch } from 'vue'
import store from '@/store';
import _ from "lodash";

export default {
    props:{
        title: String,
        node: {type: Object, required: true}
    },
    components:{
        Prism
    },
    setup(props){
        console.log();
        let dataConfig;
        let nodesFromWatch = ref(store.getters['UserData/getNodes'])
        if(props.title.includes('Running'))
            dataConfig = ref(nodesFromWatch).value.data[0].runConf
        else
            dataConfig = ref(nodesFromWatch).value.data[0].startConf
        watch(() => _.cloneDeep(props.node), () => { 
            if(props.title.includes('Running'))
                dataConfig = props.node.runConf
            else
                dataConfig = props.node.startConf
        })



        
        return {dataConfig};
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
    .configComp{
        display: grid;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        grid-template-areas: 
        "head"
        "."
        "scrollArea";

        .head {
            grid-area: head;
            display: grid;
            grid-auto-columns: 1fr 1fr 3fr 1fr 1fr;
            margin-bottom: 1em;
            grid-template-areas: "save . title . close";
            align-items: center;
            .save{
                grid-area: save;
                justify-self: left;
            }

            .title {
                grid-area: title;
                text-align: center;
                justify-self: center;
                color: $indigo-9;
                font: {
                size: 2em;
                family: Roboto;
                weight: bold
                }
                
            }

            .close {
                grid-area: close;
                justify-self: right;
            }
        }
        .scrollArea{
            grid-area: scrollArea;
            min-height: 65vh; 
            max-width: 100%;
        }
        
    }
</style>