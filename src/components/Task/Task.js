import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'
import formatTime from '../../formatTime'

export default function Task({
  taskName,
  taskTime,
  onDelete,
  completed,
  onToggleCompleted,
  onToggleEditing,
  createdTime,
}) {
  const [timer, setTimer] = useState(0)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    setTimer(taskTime)
  }, [taskTime])

  const startTimer = () => {
    setIsCounting(true)
  }

  const stopTimer = () => {
    setIsCounting(false)
  }

  useEffect(() => {
    let interval
    if (isCounting) {
      interval = setInterval(() => {
        if (taskTime > 0) {
          setTimer(timer - 1)
        }
        if (timer === 0) {
          stopTimer()
        }
      }, 1000)
    }
    if (completed) {
      stopTimer()
    }
    return () => clearInterval(interval)
  }, [isCounting, taskTime, timer, completed])

  return (
    <div className="view">
      <input className="toggle" id="toggleCompleted" type="checkbox" onChange={onToggleCompleted} checked={completed} />
      <label htmlFor="toggleCompleted">
        <span className="title">{taskName}</span>
        <span className="description">
          <button aria-label="Start timer" className="icon icon-play" type="button" onClick={startTimer} />
          <button aria-label="Pause timer" className="icon icon-pause" type="button" onClick={stopTimer} />
          {timer > 0 ? formatTime(timer) : 'time is up!'}
        </span>
        <span className="description">{`created ${formatDistanceToNow(createdTime)} ago`}</span>
      </label>
      <button type="button" aria-label="Edit task" className="icon icon-edit" onClick={onToggleEditing} />
      <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDelete} />
    </div>
  )
}
