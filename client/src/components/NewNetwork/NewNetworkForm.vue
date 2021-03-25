<template>
<div class="new-net-form">
  <div class="title">Network IP Address</div>
  <div class="form">
    <input v-model="network" type="text" class=AddressText placeholder="Network IP">
    <div class="slash">/</div>
    <input v-model="mask" type="text" class="MaskText" placeholder="Mask">
  </div>
  <div class="search-div">
      <button class="search" style="vertical-align:middle" v-on:click="createNode" v-bind:disabled="finishedScan.length > 0 ? true : false"><span class="icon" v-if="finishedScan.length > 0 ? false : true">Search </span><i v-if="finishedScan.length > 0 ? true : false" class="fa fa-refresh fa-spin fa-lg fa-fw"></i></button>  
  </div>
</div>
</template>

<script>
// import { reactive } from 'vue';
export default {
  props: {
    finishedScan: { }
  },
  data(){
    let network =""
    let mask = ""

    return {
      network,
      mask
    }
  },
  methods:{
      createNode(){
      this.$emit('add-node', `${this.network}/${this.mask}`);
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.new-net-form {
  display: flex;
  width: 1fr;
  height: 1fr;
  flex-direction: column;

  .title {
    grid-area: title;
    flex-grow: 1;
    width: 1fr;
    height: 1fr;
    padding-bottom: 0.8em;
    // font-weight: bold;
    font-size: 1.1em;
    text-align: center;
    align-self: center;
    opacity: 1;
    color:midnightblue;
    // background-color: red;
  }

  .form {
    grid-area: form;
    flex-grow: 1;
    width: 1fr;
    height: 1fr;
    display:inline-flex;
    align-self: center;
    text-align: center;
    

    .AddressText {
      height: 1fr;
      width: 9.2em;
      margin: 0px;
      font-size: 1em;       
      padding: 5px; 
      border: 1px solid #ccc;
      border-radius: 4px;
      font-weight: bold;
      color: $accent;
      box-sizing: border-box;
    }

    .slash {
      height: 1fr;
      width: 1em;
      font-size: 1fr;
      padding: 0.2em;
      margin: 0px;
      color:darkslategrey;
    }

    .MaskText {
      height: 1fr;
      width: 2em;
      font-size: 1em;
      font-weight: bold;
      padding: 5px; 
      border: 1px solid #ccc;
      border-radius: 4px;
      font-weight: bold;
      color: darkslategray;
      box-sizing: border-box;
    }
  }

  .search-div {
    grid-area: search;
    width: 12.6em;
    flex-grow: 1;
    align-self: center;
    height: 3em;
    // background-color: green;

    .search {
      width: 12em;
      height: 3em;
      margin-top: 1.3em;
      border-radius: 4px;
      background-color: $accent;
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
        // cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;

        &:after {
          content: '\f0a9';
          font-family: FontAwesome;
          // font-weight:900;
          position: absolute;
          opacity: 0;
          top: 0;
          right: -10em;
          left: 5em;
          transition: 0.7s;
        }
      }

      i {
        padding-right: 0px;
      }

      &:disabled {
        background-color: gray;
        cursor: not-allowed;
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
      color: $primarydark;
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