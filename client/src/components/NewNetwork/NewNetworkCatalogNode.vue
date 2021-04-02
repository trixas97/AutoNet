<template>
<!-- <div v-bind:class="{'new-net-catalog-node': isActive, 'vendor-null': hasError}"> -->
<div class="new-net-catalog-node" v-if="!node.delete">
  <div class="info" @click="test">
    <img class="img" src="../../style/router.svg">
    <span class="ip">IP: <span class="value"> {{ node.ip }}</span></span>
    <span class="vendor" v-if="node.vendor!=null">Vendor: <span class="value"> {{ node.vendor }}</span></span>
    <span class="vendor animation" v-if="node.vendor==null">Vendor: <span class="value"> {{ node.vendor }}</span></span>
    <span class="mac" v-if="node.mac!=null">MAC: <span class="value"> {{ node.mac }}</span></span>
    <span class="mac animation" v-if="node.mac==null">MAC: <span class="value"> {{ node.mac }}</span></span>
  </div>
  <span class="check"><Checkbox ref="checkbox"/></span>
</div>
</template>

<script>
import Checkbox from '../checkbox.vue'
// import {  computed } from 'vue'
export default {
  name: 'NewNetworkCatalogNode',
  components: {
    Checkbox
  },
  props: {
    node: { }
  },
  methods:{
    checkAll(value){
      this.$refs.checkbox.changeAll(value);
    },
    test(){
      console.log("opalev");
      this.$emit('testOpa', 'clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.new-net-catalog-node {
//   background-color: $primarydark;
  padding: 1em;
  // padding-top: 0.5em;
  margin-bottom: 0.5em;
//   box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 2px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  border-radius: 5px;
  border: 2px solid #DFE3E8;
  box-sizing: border-box; 
//   cursor: pointer;
  transition: all 0.25s ease;
  // transition: opacity 4000ms;
  opacity: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  display: grid;
  grid-gap: 0px;
  width: 90%;
  height: 1fr;
  align-items: center;
  grid-template-columns: 7fr 1fr;
  animation: createNode 0.4s ease;
  animation-direction: alternate;
  
  @keyframes createNode {
    0% {
      opacity: 0;
      transform: translateY(20px)
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }    
  }


  grid-template-areas: 
    "info check";

  .info {
    display: grid;
    grid-area: info;
    grid-template-columns: 1fr 2fr 2fr 2fr;
    align-items: center;
    grid-gap: 0px;
    grid-template-areas: 
      "img ip vendor mac";
    
    img {
      grid-area: img;
      // background-color: lightsalmon;
      // width: 4.1em;
      display: flex;
      // width: 4.1rem;
      flex-grow: 1;
      // width: 80%;
      // height: 100%;
    }

    .ip {
      grid-area: ip;
      display: flex;
      width: 100%;
      // flex-shrink: 3;
      // background-color: lightblue;
      justify-content: center;
      flex-grow: 1;
      //  width: 1rem;
      // padding: 0px;
    }

    .vendor {
      grid-area: vendor;
      display: flex;
      width: 100%;
      justify-content: center;
      // background-color: lightgreen;
      flex-grow: 1;
    }

    .mac {
      grid-area: mac;
      display: flex;
      justify-content: center;
      width: 100%;
      // background-color: lightcoral;
      flex-grow:1;
    }

    .value {
      color: $accent;
      font-weight: bold;
    }
  }
  





  .check {
    grid-area: check;
    display: flex;
    width: 100%;
    justify-content: center;
    height: 50%;
    // background-color: lightblue;
    flex-grow: 1;
  }



  .animation{
    animation: mymove 0.5s infinite;
    animation-timing-function: ease;
    animation-direction: alternate;
  }

  @keyframes mymove {
    from {opacity: 100%;}
    to {opacity: 0%;}
  }

}

@media screen and (max-width: 1281px) {
    .new-net-catalog-node {
        display: grid;
        margin-right: 0em;
        margin-left: 0em;
        width: 100%;
        height: 1fr;
        font-size: 1rem;
        grid-gap: 0px;
    }
}

@media screen and (max-width: 768px) {

    .new-net-catalog-node {
      padding-top: 0.5em;
      height: 25%;
      display: grid;
      margin-right: 0em;
      margin-left: 0em;
      width: 100%;
      height: 1fr;
      font-size: 1rem;
      grid-gap: 0px;
      grid-template-columns: 5.2fr 1fr;
      grid-template-areas: 
        "info check";

      .info {
        grid-area: info;
        display: grid;
        grid-gap: 0px;
        grid-template-columns: 1fr 0.2fr 2fr 2fr;
        grid-template-areas: 
          "img . ip vendor";

        img {
            grid-area: img;
        }

        .ip {
            grid-area: ip;
            // width:1em;
            // background-color: teal;
        }

        .vendor {
            grid-area: vendor;
        }

        .mac {
            grid-area: mac;
            opacity: 0;
            display: none;
            
        }
        .value {
            font-weight: bold;
        }
      }

    
  }
}

@media screen and (max-height: 650px) {
  .new-net-catalog-node {
    padding-top: 0.5em;
    height: 25%;
  }
}

</style>