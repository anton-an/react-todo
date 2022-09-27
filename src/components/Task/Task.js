import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'
import formatTime from '../../formatTime'

export default class Task extends Component {
  state = {
    timer: 0,
    isCounting: false,
  }

  timerInterval

  componentDidMount() {
    this.setState((state, props) => ({ timer: props.taskTime }))
  }

  componentDidUpdate(prevProps, prevState) {
    const { isCounting, timer } = this.state
    const { completed } = this.props
    if (prevState.timer !== timer) {
      if (!timer) {
        clearInterval(this.timerInterval)
      }
    }
    if (prevProps.completed !== completed) {
      if (completed === false) {
        this.stopTimer()
      }
    }
    if (prevState.isCounting !== isCounting || prevProps.completed !== completed) {
      if (isCounting && !completed && timer > 0) {
        this.timerInterval = setInterval(() => {
          this.setState((state) => (state.timer > 0 ? { timer: state.timer - 1 } : { timer: 0 }))
        }, 1000)
      } else {
        clearInterval(this.timerInterval)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  startTimer = () => {
    this.setState(() => ({
      isCounting: true,
    }))
  }

  stopTimer = () => {
    this.setState(() => ({
      isCounting: false,
    }))
  }

  render() {
    const { taskName, onDelete, completed, onToggleCompleted, onToggleEditing, createdTime } = this.props
    const { timer } = this.state
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
            {timer ? formatTime(timer) : 'time is up!'}
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
