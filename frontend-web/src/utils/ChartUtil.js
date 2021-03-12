import * as Chart from "chart.js";

export function initChart(workouts) {
    let chartData = [];
    let lables = [];
    for (let i=0; i<workouts.length; i++) {
        chartData.push(workouts[i].distance);
        lables.push(new Date(workouts[i].timestamp * 1000).toDateString());
    }
    new Chart(document.getElementById('dashboard-chart'), {
        type: 'line',
        data: {
            datasets: [
                {
                    borderColor: ['rgba(12, 96, 39, 1)'],
                    backgroundColor: ['rgba(12, 96, 39, 0.2)'],
                    data: chartData.reverse()
                }
            ],
            labels: lables
        },
        options: {
            legend: {
                display: false
            },
            responsive: true
        }
    });
}
