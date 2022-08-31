import React, {Component} from 'react';

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {

    state = {
        label: ''
    };

    onChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onTaskAdded(this.state.label)
        this.setState({
            label: ''
        });
    };


    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <input className="new-todo" 
                        onChange={this.onChange}
                        placeholder="What needs to be done?" 
                        value={this.state.label}
                        autoFocus />
            </form>
        );
    };
};
