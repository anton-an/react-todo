import React from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import EditTaskForm from '../EditTaskForm'

function Task({
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
  const taskClassName = () => {
    if (completed) {
      return 'completed'
    }
    if (editing) {
      return 'editing'
    }
    return ''
  }

  const isChecked = () => completed

  return (
    <li key={id} className={taskClassName()}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={isChecked()} />
        <span className="description">{description}</span>
        <span className="created">
          created
          {formatDistanceToNow(createdTime)}
          ago
        </span>
        <button type="button" aria-label="Edit task" className="icon icon-edit" onClick={onToggleEditing} />
        <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDelete} />
      </div>
      <EditTaskForm id={id} description={description} onToggleEditing={onToggleEditing} editTask={editTask} />
    </li>
  )
}

Task.defaultProps = {
  completed: false,
  editing: false,
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
}

export default Task
