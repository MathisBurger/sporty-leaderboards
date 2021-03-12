import * as Chart from 'chart.js';
import React from "react";

export class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
        let data = [];
        let lables = [];
        console.log("props gehen raus digga", props);
        for (let i=0; i<props.data.length; i++) {
            data.push(props.data[i].distance);
            lables.push(new Date(props.data[i].timestamp * 1000).toDateString());
        }
        this.state = {
            chartData: {
                datasets: [
                    {
                        borderColor: ['rgba(12, 96, 39, 1)'],
                        backgroundColor: ['rgba(12, 96, 39, 0.2)'],
                        data: data
                    }
                ],
                lables: lables
            }
        };
    }

    render() {
        return <canvas id={"dashboard-chart"} />
    }

    componentDidMount() {
        console.log(this.state.chartData.datasets);
        new Chart(document.getElementById('dashboard-chart'), {
           type: 'line',
           data: {
               datasets: this.state.chartData.datasets,
               labels: this.state.chartData.lables
           },
            options: {
               legend: {
                   display: false
               },
                responsive: true
            }
        });
    }
}
