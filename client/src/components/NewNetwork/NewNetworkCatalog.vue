<template>
<div class="new-net-catalog ">
  <div class="info row">
      <span class="ips col column items-left justify-center"><span class="q-pl-xl">{{ infoHostsNumber() }} <i v-if="!finishedScan" class="fa fa-cog fa-spin fa-lg fa-fw"></i></span></span>
      <span class="network col column items-center justify-center">{{ infoNet() }}</span>
      <span class="col column items-right" ><q-checkbox :modelValue="checkedAll" @click="checkAllChange" left-label color="teal" class="q-pr-lg" keep-color size="lg"><label>All</label></q-checkbox></span>
  </div>
  <div class="nodes ">
      <NewNetworkCatalogNode
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :checked="true"
        @userpass="userpassform"
        :ref="setItemRef"

      />
  </div>
</div>
</template>

<script>
import NewNetworkCatalogNode from './NewNetworkCatalogNode.vue'
export default {
  name: 'NewNetwork',
  components: {
    NewNetworkCatalogNode,
  },
  props: {
    networks: {
      type: Array
    },
    nodes: {
      type: Array
    },
    finishedScan: {
      type: Boolean
    }
  },
  data(){
    return{
      nodesRefs: [],
    }
  },
  methods: {
    setItemRef(el) {
      if(el){ this.nodesRefs.push(el) }
    },
    checkAllChange(){
      let value;
      this.checkedAll == true || this.checkedAll == false  ? value = !this.checkedAll : value = true;
      this.nodes.forEach(element => {
        element.checked = value;
      });
    },

    infoNet(){
      if(this.networks.length < 1){
        return "Network IP";
      } else {
        if(this.networks.length == 1){
          return this.networks[0].ip;
        } else {
          return "Multiple Networks"
        }
      }
    },
    
    infoHostsNumber(){
      let count = 0;
      this.nodes.forEach((element) => { element.delete == false ? count++ : null});
      if(this.networks.length < 1){
        return "Hosts";
      }else{
        if(this.networks.length == 1){
          return `${count}/${this.networks[0].size}`
        }else {
          return `Hosts: ${count}`
        }
      }
    },
    userpassform(value){
      this.$emit("userpass", value)
    }
  },
  computed: {
    checkedAll() {
      let count = 0;
      this.nodes.forEach(element => {
        if(element.checked) count++;
      });
      if(count == this.nodes.length)
        return true
      else
        if(count == 0)
          return false
        else
          return null
    }
  },
  beforeUpdate() {
    this.nodesRefs = []
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.new-net-catalog {
  width: 1fr;
  height: 1fr;
  font: {
    family: "arial";
    weight: bold;
  }

  .info {
    color: $primary;
    width: 90%;
    font-size: 1.3rem;

    .all {
      justify-content: end; 
      width: 100%;
      grid-template-columns: 0.8fr 2fr 2fr;
      grid-template-areas: 
      ". checktext checkbox";
      grid-gap: 0px;
      display: grid;
      .text {
        grid-area: checktext;
        margin: 0;
        padding: 0;
      }
      .checkbox {
        grid-area: checkbox;
        margin: 0;
        padding: 0;
        height: 100%;
      }
    }

  }
  .nodes {
    width: 1fr;
    height: 10em;
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

    label {
      display: none;
    }
  }
}

</style>