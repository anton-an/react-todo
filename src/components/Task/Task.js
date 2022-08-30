import React, {Component} from "react";
import './Task.css'

export default class Task extends React.Component {

  state = {
    completed: false,
    editing: false
  }
  
  toggleCompleted = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed
      }
    });
  };
    
  render () {

    const { description, id, onDeleted } = this.props
    const taskClassName = this.state.completed ? 'completed' : this.state.editing ? 'editing' : '';

    return (
        <li key={id} className = {taskClassName}>
            <div className="view">
              <input className="toggle" type="checkbox" onChange={this.toggleCompleted}/>
              <label>
                <span className="description">{description}</span>
                <span className="created">created createdTime</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        </li>
    );
  };
};