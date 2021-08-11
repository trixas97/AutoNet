<template>
    <div class="container">
        <div class="chartContainer">
            <canvas ref="chart" class="chart"></canvas>
        </div>
    </div>
</template>

<script>
// import * as Chart from 'chart.js'
// const Chart = require('chart.js');
import { ref, onMounted } from 'vue'
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
                    data: [0, 10, 5, 2, 20, 30, 45],
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

        onMounted(() => {
            let myChart = new Chart(
                chart.value,
                config
            );
            console.log(myChart);
        })
        

        return{
            config,
            chart
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 1em;

    .chartContainer{
        margin: auto;
        height:100%; 
        width:80%;

    }
    
}
</style>