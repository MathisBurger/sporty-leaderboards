import React from "react";
import '../login/Login.css';
import {Link} from "react-router-dom";

export class RegisterWindow extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h1>Register</h1>
                    <input type="text" placeholder="username"/>
                    <input type="text" placeholder="password"/>
                    <button>Register</button>
                    <Link to="/login">
                        <h3>login</h3>
                    </Link>
                </div>
            </div>
        );
    }
}
