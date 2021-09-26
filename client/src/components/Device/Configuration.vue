<template>
    <div class="configComp">
        <div class="head">
            <div class="save"><q-btn push color="green" round size="lg" @click="openConsole" icon="save">
                <q-tooltip class="bg-green text-body1" :offset="[10, 10]">
                    Save
                </q-tooltip>
            </q-btn></div>
            <span class="title">{{title}} Configuration</span>
            <div class="close"><q-btn push color="secondary" icon="save_alt" round size="lg" @click="openConfig">
                <q-tooltip class="bg-secondary text-body1" :offset="[10, 10]">
                    Download
                </q-tooltip>
            </q-btn></div>
        </div>
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="scrollArea"
           
        >
            <prism language="editorconfig">{{ test }}</prism>
        </q-scroll-area>
    </div>
</template>

<script>
import"prismjs/prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-editorconfig"
import Prism from "vue-prism-component";

export default {
    props:{
        title: String
    },
    components:{
        Prism
    },
    setup(){
        let test = "no ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\n no ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17"
        return {test};
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