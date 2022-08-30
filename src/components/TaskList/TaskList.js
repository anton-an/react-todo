import React from "react";
import './TaskList.css'

import Task from "../Task";

const TaskList = ({tasksData, onDeleted}) => {

    const elements = tasksData.map((item) => {
        const { id } = item
        return (
            <Task {...item}
            key={id} 
            onDeleted={() => onDeleted(id)}/>
        );
    });

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

export default TaskList;