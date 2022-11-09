import React, { useState } from 'react'
import './EditTaskForm.css'

export default function EditTaskForm({ taskName, editTask, id }) {
  const [inputTaskName, setInputTaskName] = useState(taskName)

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      editTask(id, inputTaskName)
    }
    if (e.key === 'Escape') {
      editTask(id, inputTaskName)
    }
  }

  const onBlur = () => {
    editTask(id, inputTaskName)
  }

  const onInputChange = (e) => {
    setInputTaskName(e.target.value)
  }

  return (
    <input
      type="text"
      className="edit"
      onKeyDown={onKeyDown}
      onChange={onInputChange}
      value={inputTaskName}
      onBlur={onBlur}
      autoFocus
    />
  )
}
