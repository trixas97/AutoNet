<template>
<div class="new-net-catalog-node">
    <img class="img" src="../../style/router.svg">
    <span class="ip">IP: <span class="value">192.168.2.1</span></span>
    <span class="vendor">Vendor: <span class="value">Cisco</span></span>
    <span class="mac">MAC: <span class="value">FF:FF:FF:FF:FF:FF</span></span>
    <span class="check"><Checkbox/></span>
</div>
</template>

<script>
import Checkbox from '../checkbox.vue'
export default {
  name: 'NewNetworkCatalogNode',
  components: {
    Checkbox
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.new-net-catalog-node {
//   background-color: $primarydark;
  padding: 1em;
  margin-bottom: 0.5em;
//   box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 2px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  border-radius: 5px;
  border: 2px solid #DFE3E8;
  box-sizing: border-box; 
//   cursor: pointer;
  transition: all 0.25s ease;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  display: grid;
  grid-gap: 0px;
  width: 1fr;
  margin-right: 3em;
  margin-left: 3em;
  grid-template-areas: 
    "img . . . ."
    "img ip vendor mac check"
    "img . . . .";
  
  img {
    grid-area: img;
  }

  .ip {
    grid-area: ip;
    padding: 0px;
  }

  .vendor {
    grid-area: vendor;
  }

  .check {
    grid-area: check;
    /* Hide the browser's default checkbox */
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
  }

  .mac {
    grid-area: mac;
    opacity: 1;
  }

  .value {
    color: $accent;
    font-weight: bold;
  }

}

@media screen and (max-width: 768px) {

    .new-net-catalog-node {
        display: grid;
        width: 1fr;
        height: 1fr;
        font-size: 1rem;
        grid-gap: 0px;
        grid-template-areas: 
          "img ip ip check"
          "img vendor check";

    img {
        grid-area: img;
    }

    .ip {
        grid-area: ip;
        width:1fr;
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
        color: teal;
        font-weight: bold;
    }
  }
}

</style>