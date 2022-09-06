import React from 'react'
import PropTypes from 'prop-types'
import './TaskList.css'

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
        id={id}
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
  tasksData: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      createdTime: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}

export default TaskList
