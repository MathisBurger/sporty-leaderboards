import React from 'react';
import {SidebarComponent} from "../../components/Sidebar/Sidebar";
import {checkAPICredentials} from "../../utils/CheckCreds";
import './Dashboard.css';
import {getXHRConnection} from "../../utils/XHR";
import {round} from "../../utils/Round";
import cookie from "react-cookies";
import * as Chart from "chart.js";

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          leaderboard: [],
            workouts: []
        };
    }

    // renders component
    render() {
        console.log("work", this.state.workouts);
        return (
            <div>
                <div className={"row"}>
                    <SidebarComponent />
                    <div className={"column"}>
                        <h1>Dashboard</h1>
                        <div className={"card-row"}>
                            <div className={"dashboard-leaderboard-card"}>
                                <h2>Leaderboard</h2>
                                <hr />
                                {this.renderLeaderboard()}
                            </div>
                            <div className={"card-column"}>
                                <div className={"dashboard-workout-card"}>
                                    <h2>Last workouts</h2>
                                    <hr />
                                    {this.renderWorkouts()}
                                </div>
                                <div className={"dashboard-graph-card"}>
                                    {console.log("asdasd", this.state.workouts)}
                                    <canvas id={"dashboard-chart"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // checking login status
        let xhr = checkAPICredentials();
        xhr.addEventListener('load', () => JSON.parse(xhr.responseText).status ? console.log('login verified') : this.props.history.push('/login'));

        let params = "?username=" + cookie.load('username') + "&token=" + cookie.load('token') + "&device=web";

        let leaderboard = getXHRConnection('GET', '/get_leaderboard' + params, null, 'application/x-www-urlencoded');
        leaderboard.addEventListener('load', () => {
            let data = JSON.parse(leaderboard.responseText);
            if (data.status) {
                this.setState({
                    leaderboard: data.leaderboard.reverse(),
                    workouts: this.state.workouts
                });
            }
        });

        let workouts = getXHRConnection('GET', '/get_all_workouts_of_user' + params, null, 'application/x-www-urlencoded');
        workouts.addEventListener('load', () => {
            let data = JSON.parse(workouts.responseText);
            if (data.status) {
                let chartData = [];
                let lables = [];
                for (let i=0; i<data.workouts.length; i++) {
                    chartData.push(data.workouts[i].distance);
                    lables.push(new Date(data.workouts[i].timestamp * 1000).toDateString());
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
                this.setState({
                    leaderboard: this.state.leaderboard,
                    workouts: data.workouts.reverse()
                });
            }
        });
    }

    renderLeaderboard() {
        let list = [];
        for (let i=0; i<this.state.leaderboard.length; i++) {
            list.push(
              <tr key={i.toString()}>
                <td>{i + 1}.</td>
                <td>{this.state.leaderboard[i][0]}</td>
                <td>{this.state.leaderboard[i][1]}</td>
              </tr>
            );
        }
        return (
            <table id={"tbl"}>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
        );
    }

    renderWorkouts() {
        let list = [];
        for (let i=0; i<this.state.workouts.length; i++) {
            list.push(
                <tr key={i.toString()}>
                    <td>{round(this.state.workouts[i].distance / 1000, 3)}km</td>
                    <td>{round(this.state.workouts[i].time / 3600, 4)}h</td>
                    <td>{new Date(this.state.workouts[i].timestamp * 1000).toLocaleDateString()}</td>
                </tr>
            );
        }
        return (
            <table id={"tbl"}>
                <thead>
                <tr>
                    <th>Distance</th>
                    <th>Duration</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
        );
    }
}
