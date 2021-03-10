import React from "react";
import './Sidebar.css';
import logo from '../../logo.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export class SidebarComponent extends React.Component {

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
                </div>
            </div>
        );
    }

    toggleNavbar() {
        let container = document.getElementById('sidebar-container');
        let left = container.offsetLeft;
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
}
