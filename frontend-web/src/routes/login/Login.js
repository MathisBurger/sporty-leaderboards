import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import './Login.css';
import cookie from 'react-cookies';
import {getXHRConnection} from "../../utils/XHR";
import {Snackbar} from "../../components/Snackbar/Snackbar";

export class LoginWindow extends React.Component {

    state = {
        username: "",
        password: ""
    };


    // sets the username as state value
    handleUsername = event => {
        this.setState((state) => {
            return {
                username: event.target.value,
                password: state.password
            };
        });
    };

    // sets the password as state value
    handlePassword = event => {
        this.setState((state) => {
            return {
                username: state.username,
                password: event.target.value
            };
        });
    };

    // renders the component
    render() {
        return (
          <div className="card">
              <div className="card-body">
                  <h1>Login</h1>
                  <input type="text" placeholder="username" onChange={this.handleUsername}/>
                  <input type="password" placeholder="password" onChange={this.handlePassword}/>
                  <button onClick={this.login}>Login</button>
                  <Link to="/register">
                      <h3>register</h3>
                  </Link>
              </div>
          </div>
        );
    }

    // onclick function for the login
    login = () => {

        // defines JSON array
        const json = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            login_device: "web"
        });

        let xhr = getXHRConnection('POST', '/login', json, 'application/json');
        xhr.addEventListener('load', () => {
            let data = JSON.parse(xhr.responseText);
            if (data.status === true) {
                // set token
                let d = new Date();
                d.setTime(d.getTime() + (48*3600*1000));
                cookie.save("username", this.state.username, {path: "/", expires: d});
                cookie.save("token", data.token, {path: "/", expires: d});

                // open dashboard
                this.props.history.push('/dashboard');
            } else {
                // renders alert if login failed
                ReactDOM.render(<Snackbar render={true} message={data.message} color={"#CB1212"}/>, document.getElementById('snackbar'));
                setTimeout(() => {
                    ReactDOM.render(null, document.getElementById('snackbar'));
                }, 1000);
            }
        })
    }
}
