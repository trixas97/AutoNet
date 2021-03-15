<template>
<div class="new-net-catalog">
  <div class="info">
      <span class="network">192.168.2.1/24</span>
      <span class="ips">10/254</span>
      <span class="all"><span class="text">All</span><Checkbox class="checkbox"/></span>
  </div>
  <div class="nodes">
      <NewNetworkCatalogNode/>
      <NewNetworkCatalogNode/>
      <NewNetworkCatalogNode/>
  </div>
</div>
</template>

<script>
import NewNetworkCatalogNode from './NewNetworkCatalogNode.vue'
import Checkbox from '../checkbox.vue'
export default {
  name: 'NewNetwork',
  components: {
    NewNetworkCatalogNode,
    Checkbox
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.new-net-catalog {
//   background-color: $primarydark;
  width: 1fr;
  height: 1fr;
  display: grid;
  font-weight: bold;
  grid-gap: 10px;
  grid-template-areas: 
    "info"
    "nodes";

  .info {
    display: grid;
    flex-direction: row;
    color: $primary;
    width: 90%;
    // background-color: lightblue;
    // grid-gap: 10px;
    font-size: 1.3rem;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: 
      "ips network all";

    .network {
      grid-area: network;
      // background-color: lightskyblue;
      // width: 10%;
      // flex-grow: 1;
    }
    .ips {
      grid-area: ips;
      width: 1fr;
      // background-color: lightsalmon;
      // flex-grow: 3;
    }
    .all {
      grid-area: all;
      justify-content: end; 
      width: 100%;
      // background-color: lightcoral;
      grid-template-columns: 0.8fr 2fr 2fr;
      grid-template-areas: 
      ". checktext checkbox";
      grid-gap: 0px;
      // flex-grow: 0.9;
      // justify-self: flex-end;
      display: grid;
      .text {
        grid-area: checktext;
        margin: 0;
        padding: 0;
        // background-color: lightgreen;
        // width: 100%;
      }
      .checkbox {
        grid-area: checkbox;
        // background-color: lightgray;
        // width: 100%;
        margin: 0;
        padding: 0;
        height: 100%;
      }
    }

  }
  .nodes {
    width: 1fr;
    height: 1fr;
    // display: grid;
    // padding: 1em;
  }

  @media screen and (max-width: 1281px) {

    .info {
      grid-template-columns: 1fr 3fr 1fr;
      width: 100%;
    }

  }

  @media screen and (max-width: 768px) {

    .info {
      grid-template-columns: 2fr 3fr 2fr;
      width: 100%;
    }

  }

//   .nodes {
//     //   margin-bottom: 1em;
//   }
}

</style>