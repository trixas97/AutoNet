<template>
    <q-dialog persistent transition-show="fade" transition-hide="fade">
      <q-layout view="hhh lpR fff"  class="bg-white" style="overflow: hidden; min-height: 60em; height: 60em; width: 80em; min-width: 80em;">

        <q-header class="bg-primary" style="width: 100%">
          <q-toolbar>
            <label class="info">{{node.name.value}}</label>  
            <q-btn flat v-close-popup round dense icon="close" />          
          </q-toolbar>
        </q-header>

        <q-page-container class="page">
            <Console class="consoleClass" :node="node"/>
        </q-page-container>

      </q-layout>
    </q-dialog>
</template>

<script>

import Console from '@/components/Console.vue'

export default {
    props:{
        node: {type: Object, required: true},
    },
    components:{
        Console
    },
    setup(){
        
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
    .q-toolbar {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        

        .info {
            display: block;
            margin: auto;
            font: {
                family: 'arial';
                size: 3em;
                weight: bold;
            }
        }
    }
    .q-page-container {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;

        .consoleClass{
            background-color: $consoleBlack;
            width: 100%;
            height: 100%;
            margin: 0px;
            padding: 0px;
        }
    }
</style>