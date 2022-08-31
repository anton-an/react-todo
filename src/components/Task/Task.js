import React, {Component} from "react";
import './Task.css'

export default class Task extends React.Component {

  state = {
    description: this.props.description
  }

  editTask = (e) => {
    this.setState({
      description: e.target.value
    })
  }
    
  render () {

    const { description, id, onDelete, onComplete, onEdit } = this.props
    const taskClassName = this.props.completed ? 'completed' : this.props.editing ? 'editing' : '';
    const isChecked = this.props.completed ? true : false

    return (
        <li key={id} className = {taskClassName}>
            <div className="view">
              <input className="toggle" type="checkbox" onChange={onComplete} checked={isChecked} />
              <label>
                <span className="description">{description}</span>
                <span className="created">created createdTime</span>
              </label>
              <button className="icon icon-edit" onClick={onEdit}></button>
              <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
            <input type="text" class="edit"/>
        </li>
    );
  };
};