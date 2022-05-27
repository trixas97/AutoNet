<template>
    <q-dialog transition-show="scale" transition-hide="scale">
      <q-card>
          <q-toolbar>
            <q-space/>
            <label class="info">Informations</label>  
            <q-space/>
            <q-btn flat v-close-popup round dense icon="close" size="lg" />          
          </q-toolbar>

          <div class="infoContent">
            <div class="element1">
              <q-card>
                <span class="title">Operating System</span>
                <span class="value">{{node.os.name}}</span>
              </q-card>
            </div>
            <div class="element2">
              <q-card>
                <span class="title">Version</span>
                <span class="value">{{node.os.version}}</span>
              </q-card>
            </div>
            <div class="tableComp">
              <TableInfo :node="node"/>
            </div>
          </div>
      </q-card>
    </q-dialog>
</template>

<script>
import TableInfo from "@/components/Device/TableInfo.vue";
import { ref } from 'vue'
export default {
  props: {
    node: {type: Object, required: true }
  },
  components:{
    TableInfo
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
      background-color: $primary;
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
      grid-template-rows: 1.5fr 8.5fr;
      grid-template-columns: 4.5fr 0.5fr 4.5fr;
      grid-template-areas: 
      "element1 . element2"
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

      .q-input {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        width: 60%;
        margin: auto;
        font: {
          family: Roboto;
          weight: bold;
          size: 0.8em;
        }
      }

      .element1 {
        grid-area: element1;
        align-self: center;
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
      }

      .element2 {
        grid-area: element2;
        align-self: center;
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
        height: 28em;
        // background-color: #eeef;
      }
    }
  }
</style>