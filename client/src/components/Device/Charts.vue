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
                if(labels.length == 0)
                    initData()
                else
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

        async function initData(){
            let ifs = nodes.value.data[0].interfaces
            
            for(let j=0; j < ifs.length; j++){
                await myChart.data.datasets.push({
                    label: ifs[j].interface_short.value,
                    backgroundColor: 'rgb(46, 64, 83)',
                    borderColor: 'rgb(46, 64, 83)',
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
                        console.log(i);
                    } 
                }
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