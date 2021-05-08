<template>
  <div class="save-devices">
    <!-- <NewNetwork v-bind:auto="false"/> -->
    <div class="titlesubmit">
      <div class="title">Devices</div>
      <div class="submit">
        <input type="button" value="Save" @click="saveDevices" v-bind:disabled="nodes.length == 0 ? true : false"  >
      </div>
    </div>

    <div class=nodes>
      <NewNetworkCatalogNode 
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :userPass="true"
        @userpass="userpassform_open"
        ref="nodesRef"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NewNetworkCatalogNode from '@/components/NewNetwork/NewNetworkCatalogNode.vue'
export default {
  
  name: 'SaveDevices',
  components:{
    NewNetworkCatalogNode
  },
  data(){
    // const route = useRoute();
    const nodes = this.$route.params.nodes;

    return {
      nodes
    }
  },
  methods:{
    saveDevices(){
      console.log("eeeeee");
      this.$refs.nodesRef.forEach(element => {
        element.changeProgress(true);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .save-devices {
    // background-color: blue;
    display: grid;
    width: 100%;
    height: 100%;
    grid-row-gap: 1.5em;
    grid-template-areas: 
    "head head head"
    ". nodes .";

    .titlesubmit{
      grid-area: head;
      // background-color: green;
      width: 100%;
      color:midnightblue;
      display: grid;
      grid-auto-columns: 1fr 2fr 1fr;
      grid-template-areas: 
      ". title btn";

      .title{
        grid-area: title;
        font-size: 1.5em;
      }

      .submit{
        grid-area:btn;
         display: grid;
      // grid-template-columns: 1fr 1fr;
          grid-template-areas: 
          "input";
          
          input {
            // justify-self: end;
            justify-self: center;
            grid-area: input;
            width: 12em;
            height: 3em;
            // margin-top: 1.3em;
            border-radius: 4px;
            background-color: #00b336;
            border: none;
            color: #FFFFFF;
            transition: all 0.5s;
            cursor: pointer;
            padding: 5px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            text: {
              align: center;
            }
            font: {
              size: 0.6em;
              weight: bold;
              family: Roboto;
            }
            span {
              cursor: pointer;
              display: inline-block;
              position: relative;
              transition: 0.5s;
            }
            &:disabled {
              background-color: gray;
              cursor: not-allowed;
              &:hover {
                background-color: gray;
              }
            }
            &:hover {
              background-color: #3e8e41;
            }
          }
        }
      }
    

    .nodes{
      // background-color: green;
      grid-area: nodes;
      width: 100%;
      display: grid;
      justify-items: center;

    }
  }
</style>