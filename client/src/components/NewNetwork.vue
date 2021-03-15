<template>
    <div class="newnetwork">
        <div class="title">New Network</div>
        <div class="formcatalog">
          <div class="form"><NewNetworkForm/></div>
          <div class="catalog"><NewNetworkCatalog/></div>
        </div>

    </div>
</template>

<script>
import NewNetworkForm from './NewNetwork/NewNetworkForm.vue'
import NewNetworkCatalog from './NewNetwork/NewNetworkCatalog.vue'
export default {
  name: 'NewNetwork',
  components: {
    NewNetworkForm,
    NewNetworkCatalog
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variables";

.newnetwork {
  display: grid;
  grid-gap: 15px;
  // background-color: teal;
  padding-top: 2vh;
  // grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-template-areas: 
    "title" 
    "formcatalog";


  .title {
    grid-area: title;
    width: 1fr;
    color:midnightblue;
    // background-color: thistle;
    font-size: 1.5em;
    padding-bottom: 1.5em;
  }

  .formcatalog {
    display: flex;
    flex-direction: row;
    grid-area: formcatalog;
    // background-color: turquoise;

    .form {
      grid-area: form;
      flex-grow: 1;
      width: 1em; 
      // padding-right: 2em;
      // padding-left: 5em;
      // background-color: red; 
      // align-self: flex-end;
    }

    .catalog {
      grid-area: catalog;
      flex-grow: 1;
    // background-color: indigo;
      width: 1em;
      // margin-left: 5em;
      // margin-right: 5em;
      // background-color: blue;
    }
  }


}

@media screen and (max-width: 768px) {
  
  .newnetwork {
    grid-gap: 5px;
    padding-top: 0;

    .title {
      padding-bottom: 0;
    }

    .formcatalog {
      flex-direction: column;
      

      .form {
        width: 1fr;
        padding-right: 0em;
        flex-grow: 1;
        // background-color:teal;
      }

      .catalog {
        grid-area: catalog;
        // background-color: indigo;
        width: 1fr;
        flex-grow: 1;
        margin-top: 1em;
      }
    }

  }

}

</style>