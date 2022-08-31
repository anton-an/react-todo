import React from "react";

import TasksFilter from "../TasksFilter/TasksFilter";
import './Footer.css';

const Footer = ({ tasksCounter, onFilterChange, filterType, onClearCompleted }) => {

    return (
        <footer className="footer">
            <span className="todo-count">{tasksCounter} items left</span>
            <TasksFilter onFilterChange={onFilterChange} filterType={filterType} />
            <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>
    );

};

export default Footer;