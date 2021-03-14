import React from 'react';
import {SidebarComponent} from "../../components/Sidebar/Sidebar";
import {checkAPICredentials} from "../../utils/CheckCreds";
import './Dashboard.css';
import {getXHRConnection} from "../../utils/XHR";
import {renderLeaderboard, renderWorkouts} from "./Renderer";
import cookie from "react-cookies";
import {initChart} from "../../utils/ChartUtil";

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
                                {renderLeaderboard(this.state.leaderboard)}
                            </div>
                            <div className={"card-column"}>
                                <div className={"dashboard-workout-card"}>
                                    <h2>Last workouts</h2>
                                    <hr />
                                    {renderWorkouts(this.state.workouts)}
                                </div>
                                <div className={"dashboard-graph-card"}>
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

        // defines params for get request
        let params = "?username=" + cookie.load('username') + "&token=" + cookie.load('token') + "&device=web";

        // queries the leaderboard data
        // refresh component
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

        // queries the workout data
        // refresh component
        let workouts = getXHRConnection('GET', '/get_all_workouts_of_user' + params, null, 'application/x-www-urlencoded');
        workouts.addEventListener('load', () => {
            let data = JSON.parse(workouts.responseText);
            if (data.status) {
                initChart(data.workouts.reverse());
                this.setState({
                    leaderboard: this.state.leaderboard,
                    workouts: data.workouts.reverse()
                });
            }
        });
    }
}
