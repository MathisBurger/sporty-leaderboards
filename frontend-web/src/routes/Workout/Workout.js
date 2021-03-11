import React from "react";
import {SidebarComponent} from "../../components/Sidebar/Sidebar";
import './Workout.css';
import {SwitchColorAndText} from "./Animations";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import Popup from 'reactjs-popup';
import {getXHRConnection} from "../../utils/XHR";
import cookie from 'react-cookies';
import {checkAPICredentials} from "../../utils/CheckCreds";
import ReactDOM from "react-dom";
import {Snackbar} from "../../components/Snackbar/Snackbar";

export class Workout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secsRunning: 0,
            timerRunning: false,
            timerID: 0,
            showFinishWorkoutButton: false,
            workoutFinished: false
        };
    }
    componentDidMount() {
        let login = checkAPICredentials();
        login.addEventListener('load', () => JSON.parse(login.responseText).status ? console.log('login verified') : this.props.history.push('/login'));
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <SidebarComponent />
                    <div className={"column"}>
                        <h1>Workout</h1>
                        <div className={"workout-main-card"}>
                            {this.secsToTimeString()}
                            <FontAwesomeIcon icon={faHeart}
                                             className={this.getHeartClasses()} />
                            <button className={"btn-workout"} onClick={this.toggleWorkout}
                                    id={"workout-start-button"}>start</button>
                            {this.state.showFinishWorkoutButton ? <Popup
                                trigger={<button className={"button-finish-workout"}>finish workout</button> }
                                modal
                                nested
                            >
                                <div className={"modal"}>
                                    {this.secsToTimeString()}
                                    <input type={"number"} placeholder={"distance in meter"}
                                           id={"distance-input"}/>
                                    <button onClick={() => this.saveWorkout()}> Save workout</button>
                                </div>
                            </Popup> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toggleWorkout = () => {
        SwitchColorAndText();
        this.toggleCounter();
    }

    saveWorkout() {
        const json = JSON.stringify({
            username: cookie.load('username'),
            token: cookie.load('token'),
            device: 'web',
            time: this.state.secsRunning,
            distance: +document.getElementById('distance-input').value
        });
        let xhr = getXHRConnection('POST', '/add_workout', json, 'application/json');
        xhr.addEventListener('load', () => {
           let data = JSON.parse(xhr.responseText);
           if (data.status) {
               this.setState({
                   secsRunning: 0,
                   timerRunning: false,
                   timerID: 0,
                   showFinishWorkoutButton: false,
                   workoutFinished: false
               });
           } else {
               ReactDOM.render(<Snackbar render={true} message={data.message} color={"#CB1212"}/>, document.getElementById('snackbar'));
               setTimeout(() => {
                   ReactDOM.render(null, document.getElementById('snackbar'));
               }, 1000);
           }
        });
    }

    toggleCounter() {
        if (!this.state.timerRunning) {
            let intervalID = setInterval(() => {
                this.setState({
                    secsRunning: this.state.secsRunning + 1,
                    timerRunning: true,
                    timerID: intervalID,
                    showFinishWorkoutButton: false,
                    workoutFinished: false
                });
            }, 1000);
        } else {
            clearInterval(this.state.timerID);
            this.setState({
                secsRunning: this.state.secsRunning,
                timerRunning: false,
                timerID: 0,
                showFinishWorkoutButton: true,
                finishedWorkout: false
            })
        }
    }

    secsToTimeString() {
        let secs = this.state.secsRunning;
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        return <h1>{
            hours > 9 ? hours : "0" + hours
            + ":" + minutes + ":" + seconds
        }</h1>;
    }

    getHeartClasses = () => {
        if (this.state.timerRunning) {
            return "heart-container animated-heart-container";
        } else {
            return "heart-container";
        }
    }
}
