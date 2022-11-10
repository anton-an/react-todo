import React, { useState } from 'react'

import './NewTaskForm.css'

export default function NewTaskForm({ onTaskAdded }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [error, setError] = useState(null)

  const onChangeText = (e) => {
    setLabel(e.target.value)
  }

  const onChangeMinutes = (e) => {
    if (e.target.value > 60) {
      setMinutes(60)
      setError('Minutes should be less than 60')
      setTimeout(() => setError(null), 2000)
    } else if (e.target.value < 0) {
      setMinutes(0)
    } else {
      setMinutes(e.target.value)
    }
  }

  const onChangeSeconds = (e) => {
    if (e.target.value > 59) {
      setSeconds(59)
      setError('Seconds should be less than 59')
      setTimeout(() => setError(null), 2000)
    } else if (e.target.value < 0) {
      setSeconds(0)
    } else {
      setSeconds(e.target.value)
    }
  }

  const onSubmit = (e) => {
    const totalSeconds = Number(minutes) * 60 + Number(seconds)
    e.preventDefault()
    onTaskAdded(label, totalSeconds)
    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  const errorText = <span className="error-text">{error}</span>

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        onChange={onChangeText}
        type="text"
        placeholder="What needs to be done?"
        value={label}
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="60"
        step="1"
        onKeyDown={(e) => {
          if (e.key === '.') e.preventDefault()
          if (e.key === ',') e.preventDefault()
          if (e.key === '-') e.preventDefault()
          if (e.key === 'e') e.preventDefault()
        }}
        placeholder="Min"
        onChange={onChangeMinutes}
        value={minutes}
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        max="59"
        step="1"
        onKeyDown={(e) => {
          if (e.key === '.') e.preventDefault()
          if (e.key === ',') e.preventDefault()
          if (e.key === '-') e.preventDefault()
          if (e.key === 'e') e.preventDefault()
        }}
        placeholder="Sec"
        onChange={onChangeSeconds}
        value={seconds}
        required
      />
      <input type="submit" style={{ display: 'none' }} />
      {error ? errorText : null}
    </form>
  )
}
