import React from 'react';
import {Link} from "react-router-dom";
import './Login.css';

export class LoginWindow extends React.Component {
    render() {
        return (
          <div className="card">
              <div className="card-body">
                  <h1>Login</h1>
                  <input type="text" placeholder="username"/>
                  <input type="text" placeholder="password"/>
                  <button>Login</button>
                  <Link to="/register">
                      <h3>register</h3>
                  </Link>
              </div>
          </div>
        );
    }
}
