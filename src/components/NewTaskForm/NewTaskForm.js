import React from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { onTaskAdded } = this.props
    const { label } = this.state
    e.preventDefault()
    onTaskAdded(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" onChange={this.onChange} placeholder="What needs to be done?" value={label} />
      </form>
    )
  }
}
