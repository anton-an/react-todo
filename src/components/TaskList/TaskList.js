import React from 'react'
import './TaskList.css'

import Task from '../Task'

export default function TaskList({ tasksData, onDelete, editTask, onToggleEditing, onToggleCompleted, timerChange }) {
  const elements = tasksData.map((item) => {
    const { id, taskName, completed, editing, taskTime, createdTime, hidden } = item
    return (
      <Task
        key={id}
        taskName={taskName}
        completed={completed}
        editing={editing}
        hidden={hidden}
        taskTime={taskTime}
        createdTime={createdTime}
        id={id}
        onDelete={() => onDelete(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        editTask={editTask}
        timerChange={timerChange}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
