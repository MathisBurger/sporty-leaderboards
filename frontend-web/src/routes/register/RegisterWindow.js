import React from "react";
import ReactDOM from 'react-dom';
import '../login/Login.css';
import {Link} from "react-router-dom";
import {getXHRConnection} from "../../utils/XHR";
import {Snackbar} from "../../components/Snackbar/Snackbar";

export class RegisterWindow extends React.Component {

    state = {
        username: "",
        password: ""
    };

    handleUsername = event => {
        this.setState((state) => {
            return {
                username: event.target.value,
                password: state.password
            };
        });
    };

    handlePassword = event => {
        this.setState((state) => {
            return {
                username: state.username,
                password: event.target.value
            };
        });
    };

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h1>Register</h1>
                        <input type="text" placeholder="username" onChange={this.handleUsername}/>
                        <input type="text" placeholder="password" onChange={this.handlePassword}/>
                        <button onClick={this.register}>Register</button>
                        <Link to="/login">
                            <h3>login</h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    register = () => {
        console.log('lights');
        const json = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });

        let xhr = getXHRConnection('POST', '/register', json);
        xhr.addEventListener('load', () => {
            const data = JSON.parse(xhr.responseText);
            if (data.status) {
                this.props.history.push('dashboard');
            } else {
                console.log('break the rules');
                ReactDOM.render(<Snackbar render={true} message={data.message} color={"#CB1212"}/>, document.getElementById('snackbar'));
                setTimeout(() => {
                    ReactDOM.render(null, document.getElementById('snackbar'));
                }, 1000);
            }
        });
    };
}
