import React from 'react';
import {SidebarComponent} from "../../components/Sidebar/Sidebar";
import {checkAPICredentials} from "../../utils/CheckCreds";
import './UserManagement.css';
import {renderAcceptedUser, renderBlockedUser, renderUnacceptedUser} from "./RenderArrays";
import {getXHRConnection} from "../../utils/XHR";
import cookie from "react-cookies";
import ReactDOM from "react-dom";
import {Snackbar} from "../../components/Snackbar/Snackbar";

export class UserManagement extends React.Component {

    // defines component state by cookies
    constructor(props) {
        super(props);
        this.state = {
            showAcceptedUser: cookie.load('showAcceptedUser') !== undefined ? cookie.load('showAcceptedUser') === 'true': true,
            acceptedUser: [],
            showUnacceptedUser: cookie.load('showUnacceptedUser') !== undefined ? cookie.load('showUnacceptedUser') === 'true': true,
            unacceptedUser: [],
            showBlockedUser: cookie.load('showBlockedUser') !== undefined ? cookie.load('showBlockedUser') === 'true': true,
            blockedUser: []
        };
    }


    render() {
        return (
            <div className={"row"}>
                <SidebarComponent />
                <div className={"column"}>
                    <h1>User management</h1>
                    <div className={"card-user-management"} id={"accept-user-card"}>
                        <h2 onClick={() => this.toggleCardUser('accept-user-card', 'showAcceptedUser')}>Accepted user</h2>
                        <hr />
                        {this.state.showAcceptedUser ? renderAcceptedUser(this.state.acceptedUser): null}
                    </div>
                    <div className={"card-user-management"} id={"unaccepted-user-card"}>
                        <h2 onClick={() => this.toggleCardUser('unaccepted-user-card', 'showUnacceptedUser')}>Unaccepted user</h2>
                        <hr />
                        {this.state.showUnacceptedUser ? renderUnacceptedUser(this.state.unacceptedUser): null}
                    </div>
                    <div className={"card-user-management"} id={"blocked-user-card"}>
                        <h2 onClick={() => this.toggleCardUser('blocked-user-card', 'showBlockedUser')}>Blocked user</h2>
                        <hr />
                        {this.state.showBlockedUser ? renderBlockedUser(this.state.blockedUser): null}
                    </div>
                </div>
            </div>
        );
    }

    // on component load
    componentDidMount() {
        // get all references of card elements
        let acceptedCard = document.getElementById('accept-user-card');
        let unacceptedCard = document.getElementById('unaccepted-user-card');
        let blockedCard = document.getElementById('blocked-user-card');

        // resize cards based on states
        this.state.showAcceptedUser ? acceptedCard.style.height = "20%": acceptedCard.style.height = "2.8%";
        this.state.showUnacceptedUser ? unacceptedCard.style.height = "20%": unacceptedCard.style.height = "2.8%";
        this.state.showBlockedUser ? blockedCard.style.height = "20%": blockedCard.style.height = "2.8%";

        // login
        let login = checkAPICredentials();
        login.addEventListener('load', () => JSON.parse(login.responseText).status ? console.log('login verified') : this.props.history.push('/login'));

        // define login parameter
        let params = "?username=" + cookie.load('username') + "&token=" + cookie.load('token') + "&device=web";

        // load all accepted user
        let accepted_user = getXHRConnection('GET', '/get_all_accepted_user' + params, null, 'application/x-www-form-urlencoded');
        accepted_user.addEventListener('load', () => this.prepareDisplay(accepted_user, "acceptedUser"));

        // load all unaccepted user
        let unaccepted_user = getXHRConnection('GET', '/get_all_unaccepted_user' + params, null, 'application/x-www-form-urlencoded');
        unaccepted_user.addEventListener('load', () => this.prepareDisplay(unaccepted_user, "unacceptedUser"));

        // load all blocked user
        let blocked_user = getXHRConnection('GET', '/get_all_blocked_user' + params, null, 'application/x-www-form-urlencoded');
        blocked_user.addEventListener('load', () => this.prepareDisplay(blocked_user, "blockedUser"));
    }

    // inserts data into given card
    prepareDisplay(xhr, stateElement) {
        let json = JSON.parse(xhr.responseText);
        if (json.status) {
            let state = this.state;
            state[stateElement] = json.user;
            this.setState(state);
        } else {
            ReactDOM.render(<Snackbar render={true} message={json.message} color={"#CB1212"}/>, document.getElementById('snackbar'));
            setTimeout(() => {
                ReactDOM.render(null, document.getElementById('snackbar'));
            }, 1000);
        }
    }

    // animates card open and close
    toggleCardUser = (id, name) => {
        let card = document.getElementById(id);
        if (!this.state[name]) {
            card.style.animationName = 'openCardContent';
            card.style.animationDuration = '0.3s';
            card.style.animationFillMode = 'forwards';
        } else {
            card.style.animationName = 'closeCardContent';
            card.style.animationDuration = '0.3s';
            card.style.animationFillMode = 'forwards';
        }
        let state = this.state;
        state[name] = !this.state[name];
        cookie.save(name, this.state[name]);
        this.setState(state);
    };
}
