<template>
    <div class="containerChart container">
        <q-toolbar class="text-white bar">
            <q-toolbar-title>
                Charts
            </q-toolbar-title>
            
                <!-- <q-select filled v-model="model" :options="options"  bg-color="blue" /> -->
                <q-select standout v-model="model" :options="options" input-style="color: white;" label-color="white" color="teal-10" bg-color="blue"/>
        </q-toolbar>
        <div class="chartContainer">
            <canvas ref="chart" class="chart"></canvas>
        </div>
    </div>
</template>

<script>
// import * as Chart from 'chart.js'
// const Chart = require('chart.js');
import { ref, onMounted, watch } from 'vue'
import { computed } from '@vue/runtime-core';
import store from '@/store';
import _ from "lodash";
import Chart from 'chart.js/auto';
export default {
    setup(){
        const chart = ref(null);
        const labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
        ];
        const dataChart = {
            labels: labels,
            datasets: [
                {
                    label: 'F0/0',
                    backgroundColor: 'rgb(46, 64, 83)',
                    borderColor: 'rgb(46, 64, 83)',
                    data: [],
                },
                {
                    label: 'F0/1',
                    backgroundColor: 'rgb(40, 180, 99)',
                    borderColor: 'rgb(40, 180, 99)',
                    data: [0, 23, 15, 2, 50, 25],
                }
            ]
        };
        const config = {
            type: 'line',
            data: dataChart,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        let options= [
            'CPU', 'TRAFFIC'
        ]
        let myChart = ref()
        onMounted(() => {
            myChart = new Chart(
                chart.value,
                config
            );
        })

        let nodesFromWatch = ref(store.getters['UserData/getNodes'])
        let nodes = computed(() => ref(nodesFromWatch));

        watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (dataNodes) => { 
            if(dataNodes != null){
                nodesFromWatch.value = dataNodes
                nodes = ref(nodesFromWatch)
                // console.log(chart);
                addData(35, 'Jule')
            }
        })

        function addData(data,label) {
            // myChart.data.labels.push(label);
            console.log(data + ' ' + label);
            // for(let i=nodes.value.data[0].interfaces[0].traffic.value.length - 5 < nodes.value.data[0].interfaces[0].traffic.value.length; i++){

            // }
            let traffic = nodes.value.data[0].interfaces[0].traffic.value
            let traffic2 = nodes.value.data[0].interfaces[16].traffic.value
            console.log(nodes.value.data[0].interfaces[0].interface.value);
            console.log(nodes.value.data[0].interfaces[16].interface.value);
            myChart.data.datasets[0].data = [traffic[traffic.length - 5].bytes.out, traffic[traffic.length - 4].bytes.out, traffic[traffic.length - 3].bytes.out, traffic[traffic.length - 2].bytes.out, traffic[traffic.length - 1].bytes.out]
            myChart.data.datasets[1].data = [traffic2[traffic2.length - 5].bytes.out, traffic2[traffic2.length - 4].bytes.out, traffic2[traffic2.length - 3].bytes.out, traffic2[traffic2.length - 2].bytes.out, traffic2[traffic2.length - 1].bytes.out]
            // myChart.data.datasets.forEach((dataset) => {
            //     dataset.data.push(data);
            // });
        
            console.log(myChart.data.datasets[0].data );
            myChart.update();
        }

        // function getTraffic(traffic){
            
        // }
        
        return{
            config,
            chart,
            options,
            model: ref(options[0]),
            nodes: ref(nodes),
            myChart: ref(myChart)
        }
    }
}
</script>

<style lang="scss" >
@import "@/styles/quasar.variables";
.containerChart {
    margin-top: 1em;
    display: grid;
    grid-template-rows: 0.3fr 1fr;
    grid-template-areas: 
    "bar"
    "charts";
    .bar {
        grid-area: bar;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        background-color: #ffb703;
        .q-toolbar__title{
            font: {
                weight: bold;
                size: 2em;
                family: 'Roboto';
            }
            
        }
        .q-select {
            font-size: 2.2em;
            font-weight: bold;
            
            span {
                color: white;
            }
        }
    }
    .chartContainer{
        grid-area: charts;
        max-height: 100%;
        min-height: 100%;
        max-width: 95%;
        margin-left: 3%;
        margin-top: 1%;
        .chart{
            min-width: 95%;
            min-height: 70%;
            max-height: 97%;
        }
    }
}
</style>