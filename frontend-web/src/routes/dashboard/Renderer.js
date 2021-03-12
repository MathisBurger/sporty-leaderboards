import {round} from "../../utils/Round";
import React from "react";

// renders the workout content
export function renderWorkouts(workouts) {
    // generates list of jsx HTML
    let list = [];
    for (let i=0; i<workouts.length; i++) {
        list.push(
            <tr key={i.toString()}>
                <td>{round(workouts[i].distance / 1000, 3)}km</td>
                <td>{round(workouts[i].time / 3600, 4)}h</td>
                <td>{new Date(workouts[i].timestamp * 1000).toLocaleDateString()}</td>
            </tr>
        );
    }

    // returns table
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

// renders the leaderboard content
export function renderLeaderboard(leaderboard) {
    // generates list of jsx HTML
    let list = [];
    for (let i=0; i<leaderboard.length; i++) {
        list.push(
            <tr key={i.toString()}>
                <td>{i + 1}.</td>
                <td>{leaderboard[i][0]}</td>
                <td>{leaderboard[i][1]}</td>
            </tr>
        );
    }
    // returns table
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
