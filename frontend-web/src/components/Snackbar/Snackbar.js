import React from 'react';
import './Snackbar.css';

export class Snackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            render: props.render,
            color: props.color,
            message: props.message
        };
    }
    render() {
        if (this.state.render) {
            return (
                <div style={{background: this.state.color}} className="alert">
                    {this.state.message}
                </div>
            );
        } else {
            return null;
        }
    }
}
