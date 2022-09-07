import React from 'react'
import './EditTaskForm.css'

export default class EditTaskForm extends React.Component {
  constructor(props) {
    super(props)
    const { description } = this.props
    this.state = {
      taskName: description,
    }
  }

  onKeyDown = (e) => {
    const { id, editTask } = this.props
    const { taskName } = this.state
    if (e.key === 'Enter') {
      editTask(id, taskName)
    }
  }

  onBlur = () => {
    const { id, editTask } = this.props
    const { taskName } = this.state
    editTask(id, taskName)
  }

  onInputChange = (e) => {
    this.setState({
      taskName: e.target.value,
    })
  }

  render() {
    const { taskName } = this.state
    return (
      <input
        type="text"
        className="edit"
        onKeyDown={this.onKeyDown}
        onChange={this.onInputChange}
        value={taskName}
        onBlur={this.onBlur}
      />
    )
  }
}
