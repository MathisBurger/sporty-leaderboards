import * as Chart from "chart.js";

// initialize the chart
export function initChart(workouts) {
    let chartData = [];
    let lables = [];

    // generates arrays for chart configuration
    for (let i=0; i<workouts.length; i++) {
        chartData.push(workouts[i].distance);
        lables.push(new Date(workouts[i].timestamp * 1000).toDateString());
    }

    // initializes chart
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
