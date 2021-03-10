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
        let xhr = getXHRConnection('POST', '/login', json);
        xhr.addEventListener('load', () => {
            let data = JSON.parse(xhr.responseText);
            if (data.status === true) {
                let d = new Date();
                d.setTime(d.getTime() + (48*3600*1000))
                cookie.save("token", data.token, {path: "/", expires: d});
                this.props.history.push('dashboard');
            } else {
                ReactDOM.render(<Snackbar message={data.message} color="#CB1212"/>, document.getElementById('snackbar'));
            }
        })
    }
}
