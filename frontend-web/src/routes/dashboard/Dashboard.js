import React from 'react';
import {SidebarComponent} from "../../components/Sidebar/Sidebar";
import {checkAPICredentials} from "../../utils/CheckCreds";

export class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <SidebarComponent />
            </div>
        );
    }

    componentDidMount() {
        let xhr = checkAPICredentials();
        xhr.addEventListener('load', () => JSON.parse(xhr.responseText).status ? console.log('login verified') : this.props.history.push('/login'));
    }
}
