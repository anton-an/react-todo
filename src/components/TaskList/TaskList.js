import React from 'react'
import './TaskList.css'
import PropTypes from 'prop-types'

import Task from '../Task'

function TaskList({ tasksData, onDelete, editTask, onToggleEditing, onToggleCompleted }) {
  const elements = tasksData.map((item) => {
    const { id, description, completed, editing, createdTime } = item
    return (
      <Task
        description={description}
        completed={completed}
        editing={editing}
        createdTime={createdTime}
        key={id}
        onDelete={() => onDelete(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        editTask={editTask}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasksData: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
}

export default TaskList
