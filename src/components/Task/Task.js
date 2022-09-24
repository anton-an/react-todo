import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'
import formatTime from '../../formatTime'

export default class Task extends Component {
  timerInterval = null

  componentDidUpdate(prevProps) {
    const { completed } = this.props
    if (prevProps.completed !== completed) {
      this.stopTimer()
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    const { completed, id, timerChange, taskTime } = this.props
    if (completed) return
    if (!taskTime) return
    if (this.timerInterval) return
    this.timerInterval = setInterval(() => {
      timerChange(id)
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timerInterval)
    this.timerInterval = null
  }

  render() {
    const { taskName, onDelete, completed, onToggleCompleted, onToggleEditing, createdTime, taskTime } = this.props
    return (
      <div className="view">
        <input
          className="toggle"
          id="toggleCompleted"
          type="checkbox"
          onChange={onToggleCompleted}
          checked={completed}
        />
        <label htmlFor="toggleCompleted">
          <span className="title">{taskName}</span>
          <span className="description">
            <button aria-label="Start timer" className="icon icon-play" type="button" onClick={this.startTimer} />
            <button aria-label="Pause timer" className="icon icon-pause" type="button" onClick={this.stopTimer} />
            {taskTime > 0 ? formatTime(taskTime) : 'time is up!'}
          </span>
          <span className="description">{`created ${formatDistanceToNow(createdTime)} ago`}</span>
        </label>
        <button type="button" aria-label="Edit task" className="icon icon-edit" onClick={onToggleEditing} />
        <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDelete} />
      </div>
    )
  }
}

Task.defaultProps = {
  completed: false,
  editing: false,
}
