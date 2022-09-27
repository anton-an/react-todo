import React from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onChangeText = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onChangeMinutes = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onChangeSeconds = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { onTaskAdded } = this.props
    const { label, minutes, seconds } = this.state
    const totalSeconds = Number(minutes) * 60 + Number(seconds)
    e.preventDefault()
    onTaskAdded(label, totalSeconds)
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          onChange={this.onChangeText}
          type="text"
          placeholder="What needs to be done?"
          value={label}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="1"
          max="60"
          step="1"
          placeholder="Min"
          onChange={this.onChangeMinutes}
          value={minutes}
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="1"
          max="59"
          step="1"
          placeholder="Sec"
          onChange={this.onChangeSeconds}
          value={seconds}
          required
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}
