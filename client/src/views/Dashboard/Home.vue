<template>
  <div class="dashboard-container">
    <div class="dashboard-box dashboard-server">
      <div class="head">
        <div class="title"><q-icon name="dns" />Server</div>
      </div>
      <div class="serverbody">
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Ip:</span><span class="value">{{server.value.address ? server.value.address.ip : ''}}</span></div>
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Port:</span><span class="value">{{server.value.address ? server.value.address.frontPort : ''}}</span></div>
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Number of Users:</span><span class="value">{{server.value.users}}</span></div>
        <div class="element"><span class="label"><q-icon class="text-secondary" name="label"/> Alive Time:</span><span class="value">{{aliveTime}}</span></div>
        <div class="element currentUser"><span class="label"><q-icon class="text-darkblue" name="person"/> Loged as</span><span class="value text-primary">{{user.value}}</span></div>
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
          <span class="circular-value">{{ networks.value.length }}</span>
        </q-circular-progress>
        <span class="info-value"><q-icon class="text-positive" name="circle"/><b> {{biggestNet.network}}</b> is the biggest network ({{biggestNet.nodes == 1 ? `${biggestNet.nodes} device` : `${biggestNet.nodes} devices`}})</span>
        <span class="info-value"><q-icon class="text-negative" name="circle"/><b> {{smallestNet.network}}</b> is the smallest network ({{smallestNet.nodes == 1 ? `${smallestNet.nodes} device` : `${smallestNet.nodes} devices`}})</span>
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
        <span class="circular-value">{{ nodes.value.data.length }}</span>
        </q-circular-progress>
      <span class="info-value"><q-icon class="text-positive" name="north"/> {{upNodes == 1 ? `${upNodes} device is` : `${upNodes} devices are`}} <span class="text-positive">Up</span></span>
      <span class="info-value"><q-icon class="text-negative" name="south"/> {{downNodes == 1 ? `${downNodes} device is` : `${downNodes} devices are`}} <span class="text-negative">Down</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto';
import store from '@/store';
import _ from "lodash";
import { computed } from '@vue/runtime-core';
export default {
  name: 'Home',
  setup(){
    let server = computed(() => ref(store.getters['UserData/getServer']))
    let user = computed(() => ref(store.getters['User/getUsername']))

    let networksFromWatch = ref(store.getters['UserData/getNetworks'])
    let networks = computed(() => ref(networksFromWatch));
    watch(() => _.cloneDeep(store.getters['UserData/getNetworks']), (dataNetworks) => {
      if(dataNetworks != null){
          networksFromWatch.value = dataNetworks
          networks = ref(networksFromWatch)
      }
    })

    let nodesFromWatch = ref(store.getters['UserData/getNodes'])
    let nodes = computed(() => ref(nodesFromWatch));
    watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (dataNodes) => {
      if(dataNodes != null){
          nodesFromWatch.value = dataNodes
          nodes = ref(nodesFromWatch)
      }
    })

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
      server,
      user,
      networks,
      nodes
    }
  },
  methods:{
    openDevices(){
      this.$router.push('devices');
    },
    openNetworks(){
      this.$router.push('networks');
    },
    years(seconds){
      return `${parseInt(seconds/31536000)} Years`
    },
    days(seconds){
      return `${parseInt((seconds%31536000)/86400)} Days`
    },  
    hours(seconds){
      return `${parseInt((seconds%86400)/3600)} Hours`
    },
    minutes(seconds){
      return `${parseInt((seconds%3600)/60)} Minutes`
    },
    netNodes(ipnet){
      let count = 0
      this.nodes.value.data.map(node =>{
        node.interfaces.map(inter => {
          if(inter.network.value == ipnet)
           count++
        })
      })
      return count
    },
  },
  computed:{
    aliveTime(){
      let timestamp = Date.now() - this.server.value.timestamp
      let seconds = timestamp/1000
      if(seconds >= 31536000){
        return `${this.years(seconds)}, ${this.days(seconds)}, ${this.hours(seconds)}`
      }else if(seconds >= 86400){
        return `${this.days(seconds)}, ${this.hours(seconds)}`
      }else if(seconds >= 3600){
        return `${this.hours(seconds)}, ${this.minutes(seconds)}`
      }else{
        return this.minutes(seconds)
      }
    },
    upNodes(){
      let nodes = this.nodes.value.data
      let count = 0
      nodes.map(node => node.status.value ? count++ : null)
      return count
    },
    downNodes(){
      let nodes = this.nodes.value.data
      let count = 0
      nodes.map(node => !node.status.value ? count++ : null)
      return count
    },
    biggestNet(){
      let networks = this.networks.value
      let net = {network: '', nodes: -1}
      networks.map(network => {
        if(this.netNodes(network.ipNetwork.value) > net.nodes || net.nodes == -1)
          net = {network: network.ipNetwork.value, nodes: this.netNodes(network.ipNetwork.value)}
      })
      return net
    },
    smallestNet(){
      let networks = this.networks.value
      let net = {network: '', nodes: -1}
      networks.map(network => {
        if(this.netNodes(network.ipNetwork.value) < net.nodes || net.nodes == -1)
          net = {network: network.ipNetwork.value, nodes: this.netNodes(network.ipNetwork.value)}
      })
      return net
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
