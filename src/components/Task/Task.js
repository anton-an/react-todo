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
  const [referenceTime, setReferenceTime] = useState(0)

  useEffect(() => {
    setTimer(taskTime)
  }, [taskTime])

  const startTimer = () => {
    setReferenceTime(Math.trunc(Date.now() / 1000))
    setIsCounting(true)
  }

  const stopTimer = () => {
    setIsCounting(false)
  }

  useEffect(() => {
    let countdown
    if (isCounting) {
      countdown = setTimeout(() => {
        setTimer((prevTime) => {
          if (prevTime <= 0) return 0
          const now = Math.trunc(Date.now() / 1000)
          const interval = now - referenceTime
          setReferenceTime(now)
          return prevTime - interval
        })
      }, 1000)
    }
    if (completed) {
      stopTimer()
    }
    return () => clearTimeout(countdown)
  }, [timer, isCounting, completed, referenceTime])

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
