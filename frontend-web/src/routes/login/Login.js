import React from 'react';
import {Link} from "react-router-dom";
import './Login.css';
import cookie from 'react-cookies';

export class LoginWindow extends React.Component {

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
          <div className="card">
              <div className="card-body">
                  <h1>Login</h1>
                  <input type="text" placeholder="username" onChange={this.handleUsername}/>
                  <input type="text" placeholder="password" onChange={this.handlePassword}/>
                  <button onClick={this.login}>Login</button>
                  <Link to="/register">
                      <h3>register</h3>
                  </Link>
              </div>
          </div>
        );
    }

    login = () => {

        const json = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            login_device: "web"
        });

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://127.0.0.1:8080/login');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(json);

        xhr.addEventListener('load', () => {
            let data = JSON.parse(xhr.responseText);
            if (data.status === true) {
                let d = new Date();
                d.setTime(d.getTime() + (48*3600*1000))
                cookie.save("token", data.token, {path: "/", expires: d});
                this.props.history.push('dashboard');
            } else {
                alert(data.message);
            }
        })
    }
}
