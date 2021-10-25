<template>
    <q-dialog transition-show="scale" transition-hide="scale">
      <q-card>
          <q-toolbar>
            <q-space/>
            <label class="info">{{ipnet}}</label>  
            <q-space/>
            <q-btn flat v-close-popup round dense icon="close" size="lg" />          
          </q-toolbar>

          <div class="infoContent">
            <!-- <div class="element1">
              <span>Operating System: </span><span class="value value-stable">Value1</span>
            </div> -->
            <!-- <q-field standout label="Operating System" stack-label :dense="dense">
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">IOS v 15.4</div>
              </template>
            </q-field> -->
            <div class="element1">
              <q-card>
                <span class="title">First IP</span>
                <span class="value">192.168.78.1</span>
              </q-card>
            </div>
            <div class="element2">
              <q-card>
                <span class="title">Devices</span>
                <span class="value">15</span>
              </q-card>
            </div>
            <div class="element3">
              <q-card>
                <span class="title">Default Gateway</span>
                <span class="value">192.168.78.254</span>
              </q-card>
            </div>
            <div class="element4">
              <q-card>
                <span class="title">Broadcast</span>
                <span class="value">192.168.78.255</span>
              </q-card>
            </div>
            <div class="tableComp">
              <TableInfo />
            </div>
          </div>
      </q-card>
    </q-dialog>
</template>

<script>
import TableInfo from "@/components/Dashboard/Table.vue";
import { ref } from 'vue'
export default {
  components:{
    TableInfo
  },
  props:{
      ipnet: String
  },
  setup(){
    let privilege = ref("");
    let privilegeStore = "";
    let configure = ref("");
    let configureStore = "";
    return{
      privilege,
      privilegeStore,
      configure,
      configureStore,
    }
  },
  methods:{
    focusPr(){
      this.privilege = this.privilegeStore;
    },
    blurPr(){
      this.privilegeStore = this.privilege;
      this.privilege = "";
    },
    focusCo(){
      this.configure = this.configureStore;
    },
    blurCo(){
      this.configureStore = this.configure;
      this.configure = "";
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .q-card{
    min-width: 60%;
    min-height: 90%;
    display: grid;
    grid-template-rows: 1fr 0.5fr 8.5fr;
    grid-template-areas: 
    "bar"
    "."
    "infoContent";

    .q-toolbar {
      grid-area: bar;
      background-color: $darkblue;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      color: white;
      label {
        text-align: center;
        align-self: center;
        font: {
          family: arial;
          size: 3em;
          weight: bold;
        }
        
      }
    }

    .infoContent{
      grid-area: infoContent;
      display: grid;
      text-align: center;
      grid-template-rows: 1.5fr 1.5fr 6fr;
      grid-template-columns: 4.5fr 0.5fr 4.5fr;
      grid-template-areas: 
      "element1 . element2"
      "element3 . element4"
      "tableComp tableComp tableComp";
      font: {
          size:1.5em;
          family: arial
      } 
      .value {
          font-weight: bold;
          color: $accent;
      }

      .value-stable {
          color: $primary-2;
      }


      .q-card{
        margin: auto;
        max-height: 3em;
        max-width: 1em;
        color: white;
        background-color: $consoleBlack;

        .title {
          font: {
            size: 0.7em;
            family: Roboto;
          }
        }
      }

      .element1 {
        grid-area: element1;
        align-self: center;
      }

      .element2 {
        grid-area: element2;
        align-self: center;
      }

      .element3 {
        grid-area: element3;
        align-self: center;
        // background-color: yellowgreen;
      }

      .element4 {
        grid-area: element4;
        align-self: center;
        // background-color: blue;
      }

      .tableComp {
        grid-area: tableComp;
        height: 22em;
        // background-color: #eeef;
      }
    }
  }
</style>