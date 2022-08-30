import React from "react";
import './TaskList.css'

import Task from "../Task";

const TaskList = ({taskData}) => {

    const elements = taskData.map((item) => {
        return (
            <Task {...item } />
        );
    });

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

export default TaskList;