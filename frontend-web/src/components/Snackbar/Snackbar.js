import React from 'react';
import './Snackbar.css';

export class Snackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            render: true
        };
        setTimeout(() => {
            this.setState({
                render: false
            });
        }, 1500);
    }

    render() {
        if (this.state.render) {
            return (
                <div style={{background: this.props.color}} className="alert">
                    {this.props.message}
                </div>
            );
        } else {
            return null;
        }
    }
}
