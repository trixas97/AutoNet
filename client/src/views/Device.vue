<template>
  <div class="deviceInfo">
      <div class="info"><Info/></div>
      <Charts class="chartPanel"/>
      <Interfaces class="interfaces"/>
      <MoreInfo class="moreInfo"/>
  </div>
</template>

<script>
import Info from '@/components/Device/Info.vue'
import Charts from '@/components/Device/Charts.vue'
import Interfaces from '@/components/Device/Interfaces.vue'
import MoreInfo from '@/components/Device/MoreInfo.vue'

export default {
  components: {
    Info,
    Charts,
    Interfaces,
    MoreInfo
  }
}
</script>

<style lang="scss" scoped>
  .deviceInfo {
    // background: greenyellow;
    height: 100%;
    display: grid;
    padding-top: 1.5em;
    padding-bottom: 1em;
    grid-template-columns: 0.05fr 1fr 0.05fr 1fr 0.05fr;
    grid-template-rows: 1.3fr 1fr 2fr;
    grid-template-areas: 
    ". info . chartPanel ."
    ". . . chartPanel ."
    ". interfaces . moreInfo .";

    .container {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        background-color: white;
        height: 90%;
    }

    .info {
      grid-area: info;
      // background: palevioletred;
    }

    .chartPanel {
      grid-area: chartPanel;
      // background: red;
    }

    .interfaces {
      grid-area: interfaces;
      background: blue;
    }

    .moreInfo {
      grid-area: moreInfo;
      background: burlywood;
    }
  }
</style>