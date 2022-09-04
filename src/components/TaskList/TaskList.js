import React from "react";
import './TaskList.css'
import PropTypes from 'prop-types'

import Task from "../Task";

const TaskList = ({ tasksData, onDelete, editTask, onToggleEditing, onToggleCompleted }) => {

    const elements = tasksData.map((item) => {
        const { id, createdTime } = item
        return (
            <Task {...item}
            key={id} 
            onDelete={() => onDelete(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
            onToggleEditing={() => onToggleEditing(id)}
            editTask={editTask}
            createdTime={createdTime}
            />
        );
    });

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

TaskList.propTypes = {
    tasksData: PropTypes.arrayOf(PropTypes.object)
}

export default TaskList;