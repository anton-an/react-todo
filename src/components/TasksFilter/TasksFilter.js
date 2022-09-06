import React from 'react'

import './TasksFilter.css'

const filterButtons = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

function TasksFilter({ onFilterChange, filterType }) {
  let key = 0

  const onClick = (e) => {
    onFilterChange(e.target.innerText)
  }

  const buttons = filterButtons.map((item) => (
    <li key={(key += 1)}>
      <button type="button" className={item.label === filterType ? 'selected' : ''} onClick={onClick}>
        {item.label}
      </button>
    </li>
  ))
  return <ul className="filters">{buttons}</ul>
}

export default TasksFilter
