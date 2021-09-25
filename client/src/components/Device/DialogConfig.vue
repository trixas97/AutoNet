<template>
  <q-dialog persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="indigo-9"
          indicator-color="indigo-9"
          align="justify"
        >
          <q-tab name="mails" no-caps >Running</q-tab>
          <q-tab name="alarms" no-caps>Startup</q-tab>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-white text-black">
          <q-tab-panel name="mails">
            <div class="head">
              <div class="save"><q-btn push color="green" round size="lg" @click="openConsole" icon="save">
                  <!-- <img src="@/assets/console.svg" class="filter-green"> -->
                  <q-tooltip class="bg-green text-body1" :offset="[10, 10]">
                      Save
                  </q-tooltip>
              </q-btn></div>
              <span class="title">Running Configuration</span>
              <div class="close"><q-btn push color="secondary" icon="description" round size="lg" @click="openConfig">
                  <q-tooltip class="bg-secondary text-body1" :offset="[10, 10]">
                      Close
                  </q-tooltip>
              </q-btn></div>
            </div>
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 65vh; max-width: 100vw;"
            >
            <prism language="editorconfig">

              {{ test }}
              
            </prism>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
</template>

<script>

import { ref } from 'vue'
import"prismjs/prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-editorconfig"

import Prism from "vue-prism-component";

export default {
  components:{
    Prism
  },
  setup () {
    let test = "no ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\n no ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17"

    return {
      tab: ref('mails'),
      test
      
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
    .q-card{
        min-width: 40%;
        min-height: 90%;

        .q-tabs {
          min-height: 5em;
          
          .q-tab {
            font: {
              size: 2em;
              family: arial;
              weight: bold
            }
          }
        }
        .head {
          display: grid;
          grid-auto-columns: 1fr 1fr 3fr 1fr 1fr;
          grid-template-areas: "save . title . close";
          align-items: center;
          .save{
            grid-area: save;
          }

          .title {
            grid-area: title;
            font: {
              size: 2em;
              family: arial;
              weight: bold
            }
            
          }

          .close {
            grid-area: close;
          }
        }
    }

</style>