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
        let dateFlag = '';
        const labels = [];
        const dataChart = {
            labels: labels,
            datasets: []
        };
        const config = {
            type: 'line',
            data: dataChart,
            options: {
                hoverRadius: 10,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value){
                                if(value >= 1000000000)
                                    return value/1000000000 + ' Gbps'
                                else if(value >= 1000000)
                                    return value/1000000 + ' Mbps'
                                else if(value >= 1000)
                                    return value/1000 + ' Kbps'
                                else
                                    return value + ' bps'
                            }
                        }
                    }
                }
            }
        };

        const colors = ['rgb(46, 64, 83)', 'rgb(40, 180, 99)', 'rgb(203, 68, 53)', 'rgb(241, 196, 15)', 'rgb(115, 198, 182)', 'rgb(52, 152, 219)', 'rgb(125, 60, 152)']
        let colorIndex = 0;
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
                if(labels.length == 0){
                    initData()
                }else{
                    if(updatedTraffic())
                        addData()
                }
                    
            }
        })

        async function addData() {
            let ifs = nodes.value.data[0].interfaces;
            for(let j=0; j < ifs.length; j++){
                let trafficIf = ifs[j].traffic.value;
                if(j == 0){
                    await pushLabelTime(trafficIf[trafficIf.length-1].date);
                }
                await myChart.data.datasets[j].data.push(((parseInt(trafficIf[trafficIf.length-1].bytes.out) + parseInt(trafficIf[trafficIf.length-1].bytes.in)) - (parseInt(trafficIf[trafficIf.length-2].bytes.out) + parseInt(trafficIf[trafficIf.length-2].bytes.in)))/60);  

            }
            if(dateFlag != null){
                myChart.data.labels[myChart.data.labels.length-1] = await myChart.data.labels[myChart.data.labels.length-1].split(' ')[1];
            }
            myChart.update();
        }

        async function initData(){
            let ifs = nodes.value.data[0].interfaces
            
            for(let j=0; j < ifs.length; j++){
                await myChart.data.datasets.push({
                    label: ifs[j].interface_short.value,
                    backgroundColor: colors[colorIndex],
                    borderColor: colors[colorIndex],
                    data: [],
                })
                let trafficIf = ifs[j].traffic.value

                if(trafficIf.length >= 5){
                    for(let i=trafficIf.length-5; i < trafficIf.length; i++){
                        if(j == 0){
                            await pushLabelTime(trafficIf[i].date);
                        }
                        await myChart.data.datasets[j].data.push(((parseInt(trafficIf[i].bytes.out) + parseInt(trafficIf[i].bytes.in)) - (parseInt(trafficIf[i-1].bytes.out) + parseInt(trafficIf[i-1].bytes.in)))/60);
                    } 
                }else{
                    for(let i=0; i < trafficIf.length; i++){
                        if(j == 0){
                            await pushLabelTime(trafficIf[i].date);
                        }
                        
                        if(i == 0){
                            await myChart.data.datasets[j].data.push((parseInt(trafficIf[i].bytes.out) + parseInt(trafficIf[i].bytes.in))/60);
                        }else{
                            await myChart.data.datasets[j].data.push(((parseInt(trafficIf[i].bytes.out) + parseInt(trafficIf[i].bytes.in)) - (parseInt(trafficIf[i-1].bytes.out) + parseInt(trafficIf[i-1].bytes.in)))/60);
                        }
                    } 
                }
                if(colorIndex == colors.length-1)
                    colorIndex = 0
                else 
                    colorIndex++
            }

            if(dateFlag != null){
                for(let k=0; k < myChart.data.labels.length; k++){
                    myChart.data.labels[k] = await myChart.data.labels[k].split(' ')[1];
                }
            }
            myChart.update();
            
        }

        async function pushLabelTime(date){
            let dateObj = new Date(date)
            let monthDayFlag = ("0" + dateObj.getDate()).slice(-2) + '/' + ("0" + parseInt(dateObj.getMonth()+1)).slice(-2)
            if(dateFlag != '' && dateFlag != null){
                dateFlag == monthDayFlag ? dateFlag = monthDayFlag : dateFlag = null
            }else{
                if(dateFlag == '')
                    dateFlag = monthDayFlag
            }
            await myChart.data.labels.push(monthDayFlag + ' ' +  ("0" + dateObj.getHours()).slice(-2) + ':' +  ("0" + dateObj.getMinutes()).slice(-2))
        }

        function updatedTraffic(){
            let trafficIf = nodes.value.data[0].interfaces[0].traffic.value
            let date = new Date(trafficIf[trafficIf.length-2].date)
            let result = labels[labels.length-1].includes(("0" + date.getHours()).slice(-2) + ':' +  ("0" + date.getMinutes()).slice(-2))
            return result
        }
        
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