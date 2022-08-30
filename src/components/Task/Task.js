import React from "react";
import './Task.css'

const Task = ({completed = false, editing = false, description, createdTime}) => {
    
    const taskClassName = completed ? 'completed' : editing ? 'editing' : '';

    return (
        <li className = {taskClassName}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description">{description}</span>
                <span className="created">created {createdTime}</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
        </li>
    );
};

export default Task;