<template>
  <div class="traffic-container">
    <div class="traffic-box">
      <div class="chartContainer">
        <canvas ref="chart" class="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto';
export default {
    setup(){
        const chart = ref(null);
        const labels = [
            '14-10-2021',
            '15-10-2021',
            '16-10-2021',
            '17-10-2021',
            '18-10-2021',
            '19-10-2021',
            '20-10-2021',
            '21-10-2021',
            '22-10-2021',
            '23-10-2021',
            '24-10-2021',
        ];

        const colors = ['rgb(46, 64, 83)', 'rgb(40, 180, 99)', 'rgb(203, 68, 53)', 'rgb(241, 196, 15)', 'rgb(115, 198, 182)', 'rgb(52, 152, 219)', 'rgb(125, 60, 152)']
        const dataChart = {
            labels: labels,
            datasets: [
                {
                    label: 'R1',
                    backgroundColor: colors[0],
                    borderColor: colors[0],
                    data: [100, 400, 78, 225, 300, 250, 150, 500, 850, 450, 630],
                },
                {
                    label: 'R2',
                    backgroundColor: colors[1],
                    borderColor: colors[1],
                    data: [350, 200, 780, 420, 100, 650, 450, 700, 150, 320, 400],
                },
                {
                    label: 'S1',
                    backgroundColor: colors[2],
                    borderColor: colors[2],
                    data: [600, 1200, 950, 1100, 700, 800, 680, 200, 1000, 50, 1500],
                },
                {
                    label: 'R3',
                    backgroundColor: colors[3],
                    borderColor: colors[3],
                    data: [0, 0, 0, 0, 50, 0, 900, 70, 10, 0, 40],
                },
                {
                    label: 'R4',
                    backgroundColor: colors[5],
                    borderColor: colors[5],
                    data: [1000, 2000, 1200, 2500, 350, 52, 1400, 900, 1500, 1700, 2000],
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

.traffic-container{
    width: 100%;
    height: 100%;
    display: grid;

    .traffic-box {
      box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
      border-radius: 5px;
      background-color: white;
      height: 92%;
      width: 92%;
      margin: auto;
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