<template>
<div>
  <div class="row">
    <div class="title column col">Network IP Address</div>
  </div>
    <div class="form q-mt-lg">

      <div class="row" >

        <div class="col-8 column items-start">
          <input v-model="network" type="text" class=AddressText placeholder="Network IP">
        </div>

        <div class="col slash q-ml-lg column items-center" >/</div>
      
        <div class="col-3 column items-end">
          <input v-model="mask" type="text" class="MaskText" placeholder="Mask">
        </div>

      </div>
    </div>

    <div class="row search-div q-mt-md" >
      <div class="col column items-center">
        <q-btn 
          v-bind:disabled="!finishedScan"
          @click="createNode"
          size="1.1em"
          class="q-px-xl q-py-xs search"
          color="accent"
          :ripple="{ color: 'black' }"
          unelevated 
          no-caps
        >
          <span class="icon" v-if="finishedScan">Search </span><i v-if="!finishedScan" class="fa fa-refresh fa-spin fa-lg fa-fw"></i>
        </q-btn>
      </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  props:{
    finishedScan:{
      Type: Boolean
    }
  },
  setup(props,ctx){
    let network = ref("");
    let mask = ref("");
    const store = useStore();   

    function createNode(){
      ctx.emit('add-node', `${network.value}/${mask.value}`);
    }

    return {
      network,
      mask,
      createNode,
      store
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables";

  .title {
      color:$txtHead;
      font-size: 2em;
      text-align: center;
      font-family: "arial";
  }

  .form {

    font: {
      family: "helvetica";
      weight: bold;
      size: 2em;
    }

    .AddressText {
      width: 8em;
      padding-left: 5px; 
      border: 1px solid #ccc;
      border-radius: 4px;
      color: $accent;
      box-sizing: border-box;
      font-family: "helvetica";
    }

    .slash {
      width: 1em;
      color: $txtDark;
    }

    .MaskText {
      width: 2em;
      text-align: center; 
      border: 1px solid #ccc;
      border-radius: 4px;
      font-weight: bold;
      color: $txtDark;
      box-sizing: border-box;
    }
  }

    .search {
      width: 12em;
      height: 3em;
      border-radius: 4px;
      background-color: $accent;
      border: none;
      color: #FFFFFF;
      transition: all 0.5s;
      padding: 5px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      font: {
        size: 0.6em;
        weight: bold;
        family: Roboto;
      }
      span {
        display: inline-block;
        position: relative;
        transition: 0.5s;

        &:after {
          content: '\f0a9';
          font-family: FontAwesome;
          position: absolute;
          opacity: 0;
          top: 0;
          right: -10em;
          left: 5em;
          transition: 0.7s;
        }
      }

      &:disabled {
        background-color: black;
        transition: all 0s;
        &:hover {
          padding: 0px;
        }
      }

      &:hover {
        padding-right: 1.5em;
        span {
          &:after {
            opacity: 1;
            right: -1.5em;
          }
        }
      }
  }

//768
@media screen and (max-width: 1281px) {
  .new-net-form {
    // display: grid;
    width: 1fr;
    height: 1fr;
    grid-gap: 0px;
    // grid-template-areas:
    //   ". form ."
    //   ". . search .";

    .title {
      grid-area: title;
      width: 1fr;
      height: 1fr;
      padding-bottom: 0.5em;
      font-weight: bold;
      font-size: 1.1em;
      text-align: center;
      opacity: 0;
      color: $txtHead;
    }
  }

}


::-webkit-input-placeholder{
    font-size: 0.6em;
}

::-moz-placeholder { /* Firefox 19+ */
  font-size: 0.6em;
}
:-ms-input-placeholder { /* IE 10+ */
  font-size: 0.6em;
}
:-moz-placeholder { /* Firefox 18- */
  font-size: 06em;
}

/* .new-net-form > input {
    font-size: 1em;
    font-weight: bold;
} */

</style>