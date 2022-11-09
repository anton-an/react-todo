import React from 'react'

import './TasksFilter.css'

const filterButtons = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

export default function TasksFilter({ onFilterChange, filterType }) {
  let key = 1

  const onClick = (e) => {
    onFilterChange(e.target.innerText)
  }

  const buttons = filterButtons.map((item) => {
    key += 1
    return (
      <li key={key}>
        <button type="button" className={item.label === filterType ? 'selected' : ''} onClick={onClick}>
          {item.label}
        </button>
      </li>
    )
  })
  return <ul className="filters">{buttons}</ul>
}
