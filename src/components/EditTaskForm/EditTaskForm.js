import React from "react";
import './EditTaskForm.css'
import PropTypes from 'prop-types'


export default class EditTaskForm extends React.Component {

    static propTypes = {
        description: PropTypes.string
    }

    state = {
        value: this.props.description
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.editTask(this.props.id, this.state.value)
        }
    };

    onInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    onInputBlur = (e) => {
        const {onToggleEditing} = this.props
        onToggleEditing()
    }
    
    render () {
        return <input type="text" className="edit" onKeyDown={this.onKeyDown} onChange={this.onInputChange} onBlur={this.onInputBlur} value={this.state.value} autoFocus />
    };
};