import React from 'react'
import './TaskList.css'

import Task from '../Task'
import EditTaskForm from '../EditTaskForm'

export default function TaskList({ tasksData, onDelete, editTask, onToggleEditing, onToggleCompleted, timerChange }) {
  const elements = tasksData.map((item) => {
    const { id, taskName, completed, editing, taskTime, createdTime } = item
    const checkClassName = () => {
      let classList = ''
      if (completed) classList += ' completed'
      if (editing) classList += ' editing'
      return classList
    }
    return (
      <li key={id} className={checkClassName()}>
        {editing ? (
          <EditTaskForm
            id={id}
            completed={completed}
            taskName={taskName}
            onToggleEditing={onToggleEditing}
            editTask={editTask}
          />
        ) : (
          <Task
            taskName={taskName}
            completed={completed}
            editing={editing}
            taskTime={taskTime}
            createdTime={createdTime}
            id={id}
            key={id}
            onDelete={() => onDelete(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
            onToggleEditing={() => onToggleEditing(id)}
            editTask={editTask}
            timerChange={timerChange}
          />
        )}
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
