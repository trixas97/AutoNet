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
    display: flex;
    flex-direction: row;
    color: $primary;
    // grid-gap: 10px;
    font-size: 1.3rem;
    // grid-template-areas: 
    //   "ips network all";

    .network {
      grid-area: network;
      width: 1fr;
      flex-grow: 1;
    }
    .ips {
      grid-area: ips;
      width: 1fr;
      flex-grow: 1;
    }
    .all {
      grid-area: all;
      width: 1fr;
      flex-grow: 1;
      display: flex;
      .text{
        grid-area: checktext;
        margin: 0;
      }
      .checkbox {
        grid-area: checkbox;
      }
    }

  }
  .nodes {
    width: 1fr;
    height: 1fr;
    // display: grid;
    // padding: 1em;
  }

//   .nodes {
//     //   margin-bottom: 1em;
//   }
}

</style>