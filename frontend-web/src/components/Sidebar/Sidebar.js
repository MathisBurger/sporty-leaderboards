import React from "react";
import './Sidebar.css';
import logo from '../../logo.svg';
import cookie from 'react-cookies';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

// Sidebar as component
export class SidebarComponent extends React.Component {

    // binding logout function
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    // rendering html
    render() {
        return (
            <div className={"sidebar"}>
                <div className={"sidebar-logo-header"} onClick={this.toggleNavbar}>
                    <img src={logo} alt={"logo"} className={"sidebar-logo-img"} />
                </div>
                <div className={"sidebar-link-container"} id={"sidebar-container"}>
                    <Link to={"/dashboard"}>
                        <div className={"sidebar-element"}>
                            <FontAwesomeIcon icon={faHome} className={"icon"} />
                        </div>
                    </Link>
                    <Link to={"/user-management"}>
                        <div className={"sidebar-element"}>
                            <FontAwesomeIcon icon={faUser} className={"icon"} />
                        </div>
                    </Link>
                    <div className={"sidebar-element"} onClick={this.logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className={"icon"} />
                    </div>
                </div>
            </div>
        );
    }

    // toggles visibility of sidebar
    toggleNavbar() {
        let container = document.getElementById('sidebar-container');
        let left = container.offsetLeft;

        // checks if sidebar is shown
        if (left === 0) {
            container.style.animationName = "SlideOut";
            container.style.animationFillMode = "forwards";
            container.style.animationDuration = "0.5s";
        } else {
            container.style.animationName = "SlideIn";
            container.style.animationFillMode = "forwards";
            container.style.animationDuration = "0.5s";
        }
    }

    // logout the user
    logout = () =>  {
        cookie.remove('username');
        cookie.remove('token');
        window.location.reload();
    };
}
