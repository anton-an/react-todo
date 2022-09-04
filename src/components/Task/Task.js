import React from "react";
import './Task.css'
import EditTaskForm from "../EditTaskForm";
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  
  static defaultProps = {
    completed: false,
    editing: false
  }

  static propTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool
  }

  render () {

    const { description, id, onDelete, onToggleCompleted, onToggleEditing, editTask, createdTime, completed, editing } = this.props
    const taskClassName = completed ? 'completed' : editing ? 'editing' : '';
    const isChecked = completed ? true : false

    return (
        <li key={id} className = {taskClassName}>
            <div className="view">
              <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={isChecked} />
              <label>
                <span className="description">{description}</span>
                <span className="created">created {formatDistanceToNow(createdTime)} ago</span>
              </label>
              <button className="icon icon-edit" onClick={onToggleEditing}></button>
              <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
            <EditTaskForm id={id} description={description} onToggleEditing={onToggleEditing} editTask={editTask} />
        </li>
    );
  };
};