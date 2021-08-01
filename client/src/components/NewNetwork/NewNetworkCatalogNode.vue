<template>
<!-- <div v-bind:class="{'new-net-catalog-node': isActive, 'vendor-null': hasError}"> -->
<div class="new-net-catalog-node" v-if="!node.delete && checked">
  <div class="info" @click="userpassform">
    <img class="img" src="@/assets/vendors/cisco.svg">
    <span class="ip">IP: <span v-if="userPass!=true" class="value"> {{ node.ip }}</span><span v-else class="value" style="color: #05668d"> {{ node.ip }}</span></span>
    <span class="vendor" v-if="node.vendor!=null && userPass!=true">Vendor: <span class="value"> {{ node.vendor }}</span></span>
    <span class="vendor animation" v-if="node.vendor==null">Vendor: <span class="value"> {{ node.vendor }}</span></span>
    <span class="mac" v-if="node.mac!=null && userPass!=true">MAC: <span class="value"> {{ node.mac }}</span></span>
    <span class="mac animation" v-if="node.mac==null">MAC: <span class="value"> {{ node.mac }}</span></span>
    <span class="vendor" v-if="node.vendor!=null && userPass==true"><div class="input-container"><i class="fa fa-user icon"></i><input v-model="node.username" class="textForm" type="text" placeholder="Username"></div></span>
    <span class="mac" v-if="node.mac!=null && userPass==true"><div class="input-container"><i class="fa fa-lock icon"></i><span></span><input v-model="node.password" class="textForm" type="text" placeholder="Password"></div></span>
  </div>
  <span v-if="userPass!=true" class="check"><Checkbox ref="checkbox" @changed="changeCheck"/></span>
  <span v-if="userPass==true" class="check"><span class="icon-status"><i ref="iconStatus" v-bind:class="{'fa fa-check icon': finished==1 && progress, 'fa fa-spinner fa-spin icon': finished==0 && progress, 'fa fa-times icon': finished==2 && progress}"></i></span></span>
</div>
</template>

<script>
import Checkbox from '../checkbox.vue'
export default {
  name: 'NewNetworkCatalogNode',
  components: {
    Checkbox
  },
  props: {
    node: { },
    userPass: {type: Boolean},
    checked: {type: Boolean}
  },
  data(){
    let finished = 0;
    let progress = false;
    return{
      progress,
      finished
    }
  },
  methods:{
    changeCheck(value){
      value == true ? this.node.checked = true : this.node.checked = false;
    },
    checkAll(value){
      value == true ? this.node.checked = true : this.node.checked = false;
      this.$refs.checkbox.changeAll(value);
    },
    userpassform(){
      // console.log(this.$refs.iconStatus);
      // this.finished = true;
      this.$emit('userpass', this.node);

    },
    changeFinished(value){
      this.finished = value;
    },
    changeProgress(value){
      this.progress = value;
    },
    changeStatus(value){
      this.finished = value;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables";
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');


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
    cursor: alias;
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
    .input-container {
      display: -ms-flexbox; /* IE10 */
      display: flex;
      width: 100%;
      // box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);

      .icon {
        padding: 0.5em;
        background: teal;
        color: white;
        min-width: 1em;
        text-align: center;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 4px 0px 0px 4px;
      }

      .textForm {
        height: 1fr;
        width: 9.2em;
        margin: 0px;
        font-size: 1em;       
        padding: 5px; 
        border: 1px solid #ccc;
        font-family: Roboto;
        
        border-radius: 0px 4px 4px 0px;
        // box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-weight: bold;
        color: $accent;
        box-sizing: border-box;
        transition: all 0.25s ease;

        &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: teal;/* Firefox */
          opacity:  0.4;
        }

        &::-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: teal;
          opacity:  0.4;
        }

        &::-ms-input-placeholder { /* Microsoft Edge */
          color: teal;
          opacity:  0.4;
        }
        

        &:focus {
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
      }
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

    .icon-status {
      font-size: 2em;
      .fa-check {
        color: rgb(21, 190, 21);
      }

      .fa-spin {
        color: $primarydark
      }

      .fa-times {
        color: rgb(221, 81, 81);
      }
    }
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