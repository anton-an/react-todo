import React from "react";

import './TasksFilter.css'

const filterButtons = [
    { label: 'All' },
    { label: 'Active' },
    { label: 'Completed' }
];

const TasksFilter = ({ onFilterChange, filterType }) => {

    const onClick = (e) => {
        onFilterChange(e.target.innerText)
    };

    const buttons = filterButtons.map(item => {
        return (
            <li>
                <button className={item.label === filterType ? 'selected' : ''} onClick={onClick}>{item.label}</button>
            </li>
        )
    })

    return (
        <ul className="filters">
            {buttons}
        </ul>
    );

};

export default TasksFilter