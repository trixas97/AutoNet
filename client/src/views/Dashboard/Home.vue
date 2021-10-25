<template>
  <div class="dashboard-container">
    <div class="dashboard-box dashboard-server">
      <div class="head">
        <div class="title"><q-icon name="dns" />Server</div>
      </div>
      <div class="serverbody">
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Ip:</span><span class="value">192.168.78.1</span></div>
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Port:</span><span class="value">8080</span></div>
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Number of Users:</span><span class="value">5</span></div>
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Alive Time:</span><span class="value">5 Days, 3 Hours</span></div>
        <div class="element currentUser"><span class="label"><q-icon class="text-darkblue" name="person"/> Loged as</span><span class="value text-primary">trixas97</span></div>
      </div>
    </div>
    <div class="dashboard-box dashboard-traffic">
      <div class="head">
        <div class="title"><q-icon name="timeline" />Traffic</div>
      </div>
      <div class="body">
        <div class="chartContainer">
          <canvas ref="chart" class="chart"></canvas>
        </div>
      </div>
    </div>
    <div class="dashboard-box dashboard-networks" @click="openNetworks">
      <div class="head">
        <div class="title"><q-icon name="account_tree"/>Networks</div>
      </div>
      <div class="body">
        <q-circular-progress
          show-value
          font-size="10px"
          class="q-ma-md"
          value="100"
          size="10vw"
          :thickness="0.25"
          color="primary"
          track-color="grey-3"
        >
          <span class="circular-value">{{ networks }}</span>
        </q-circular-progress>
        <span class="info-value"><q-icon class="text-positive" name="circle"/><b> 192.168.78.0/24</b> is the biggest network (40 devices)</span>
        <span class="info-value"><q-icon class="text-negative" name="circle"/><b> 13.13.13.0/24</b> is the smallest network (2 devices)</span>
      </div>
    </div>
    <div class="dashboard-box dashboard-devices" @click="openDevices">
      <div class="head">
        <div class="title"><q-icon name="router" />Devices</div>
      </div>
      <div class="body">
        <q-circular-progress
          show-value
          font-size="10px"
          class="q-ma-md"
          value="100"
          size="10vw"
          :thickness="0.25"
          color="accent"
          track-color="grey-3"
        >
        <span class="circular-value">{{ devices }}</span>
        </q-circular-progress>
      <span class="info-value"><q-icon class="text-positive" name="north"/> 2 devices are <span class="text-positive">Up</span></span>
      <span class="info-value"><q-icon class="text-negative" name="south"/> 50 devices are <span class="text-negative">Down</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto';
export default {
  name: 'Home',
  setup(){
    const chart = ref(null);
    const labels = [
      '192.168.78.0/24',
      '13.13.13.0/24',
      '10.10.10.0/24',
      '25.25.25.0/24',
      'Others'
    ];
    const colors = ['rgb(46, 64, 83)', 'rgb(40, 180, 99)', 'rgb(203, 68, 53)', 'rgb(241, 196, 15)', 'rgb(115, 198, 182)', 'rgb(52, 152, 219)', 'rgb(125, 60, 152)'];
    const dataChart = {
      labels: labels,
      datasets: [
          {
              label: '192.168.78.0/24',
              backgroundColor: colors,
              data: [60, 20, 15, 3, 2],
          },
      ]
    };

    const config = {
      type: 'pie',
      data: dataChart,
      options: {
        responsive: true
      }
    };

    onMounted(() => {
      let myChart = new Chart(
        chart.value,
        config
      );
      console.log(myChart);
    })
    return{
      config,
      chart,
      networks: 5,
      devices: 52
    }
  },
  methods:{
    openDevices(){
      this.$router.push('devices');
    },
    openNetworks(){
      this.$router.push('networks');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
.dashboard-container{
    width: 100%;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    display: grid;
    grid-template-columns: 0.2fr 4fr 0.1fr 4fr 0.2fr;
    grid-template-rows: 4.9fr 0.2fr 4.9fr;
    grid-template-areas: 
    ". server . traffic ."
    ". . . . ."
    ". networks . devices .";

    padding-bottom: 2em;
    padding-top: 2em;

    .head {
      display: flex;
      align-items: center;
      padding-left: 1%;
      padding-top: 1%;
      justify-content: space-between;
      
      .title{
        display: flex;
        align-items: center;
          font: {
            size: 2.8em;
            family: Roboto;
            weight: bold;
        }
        .q-icon {
          padding-right: 5%;
        }
      }
    }

    .body{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .dashboard-box {
      box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
      border-radius: 5px;
      background-color: white;
      display: flex;
      flex-direction: column;
    }

    .circular-value{
      font: {
        size: 4em;
        weight: bold;
        family: Roboto;
      }
    }

    .info-value{
      font: {
        size: 1.5em;
        family: Roboto;
      }
    }


    .dashboard-server {
      grid-area: server;
      .serverbody{
        font: {
          size: 2em
        }
        width: 100%;
        height: 100%;
        margin-top: 1em;
        .element {
          padding-left: 1em;
          .value{
            font-weight: bold;
            padding-left: 0.5em;
            color: $darkblue;
          }
        }
        .currentUser{
          margin-top: 10%;
        }


      }
    }

    .dashboard-traffic {
      grid-area: traffic;
    }

    .dashboard-networks {
      grid-area: networks;
    }

    .dashboard-devices {
      grid-area: devices;
    }


      .chartContainer{
        min-width: 100%;
        max-width: 100%;
        max-height: 90%;
        min-height: 15em;
        font: {
          size: 1em;
        }
        .chart{
            min-width: 98%;
            max-height: 100%;
        }

     }
}

</style>
