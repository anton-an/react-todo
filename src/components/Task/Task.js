import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

import EditTaskForm from '../EditTaskForm'

export default function Task({
  description,
  id,
  onDelete,
  onToggleCompleted,
  onToggleEditing,
  editTask,
  createdTime,
  completed,
  editing,
}) {
  const checkClassName = () => {
    let classList = ''
    if (completed) {
      classList += ' completed'
    }
    if (editing) {
      classList += ' editing'
    }
    return classList
  }

  const isChecked = () => completed

  return (
    <li key={id} className={checkClassName()}>
      <div className="view">
        <input
          className="toggle"
          id="toggleCompleted"
          type="checkbox"
          onChange={onToggleCompleted}
          checked={isChecked()}
        />
        <label htmlFor="toggleCompleted">
          <span className="description">{description}</span>
          <span className="created">created {formatDistanceToNow(createdTime)} ago</span>
        </label>
        <button type="button" aria-label="Edit task" className="icon icon-edit" onClick={onToggleEditing} />
        <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDelete} />
      </div>
      <EditTaskForm
        id={id}
        completed={completed}
        description={description}
        onToggleEditing={onToggleEditing}
        editTask={editTask}
      />
    </li>
  )
}

Task.defaultProps = {
  completed: false,
  editing: false,
}
