import React from 'react';
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
              </div>
          </div>
        );
    }
}
