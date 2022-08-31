import React from "react";
import './TaskList.css'

import Task from "../Task";

const TaskList = ({ tasksData, onDelete, onComplete, onEdit }) => {

    const elements = tasksData.map((item) => {
        const { id } = item
        return (
            <Task {...item}
            key={id} 
            onDelete={() => onDelete(id)}
            onComplete={() => onComplete(id)}
            onEdit={() => onEdit(id)}
            />
        );
    });

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

export default TaskList;