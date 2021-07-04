<template>
    <div class="navbar">
        <div class="item-a">Left</div>
        <div class="item-b"><img class="logo" src="@/assets/logo.svg" alt=""></div>
        <div class="item-c">Right</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../style/variables";

.navbar {
  display: grid;
  grid-gap: 10px;
  // grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 
    "left-side . center-side . right-side";

  .item-a {
  grid-area: left-side;
  padding-bottom: 0.5em;
  }

  .item-b  {
    grid-area: center-side;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content:center;
        
    .logo {
      width: 8em;
      text-align: center;
      margin-top: -0.4em;
    }
    
  }

  .item-c {
    grid-area: right-side;


  }
}

.navbar > div {
  padding-top: 0.4em;  
}
</style>