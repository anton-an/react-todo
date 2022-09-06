/* eslint-disable prettier/prettier */
import React from 'react'
import './EditTaskForm.css'
import PropTypes from 'prop-types'

export default class EditTaskForm extends React.Component {
  constructor() {
    super()
    const { description } = this.props
    this.state = {
      value: description,
    }
  }

  onKeyDown = (e) => {
    const { id, editTask } = this.props
    const { value } = this.state
    if (e.key === 'Enter') {
      editTask(id, value)
    }
  }

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onInputBlur = () => {
    const { onToggleEditing } = this.props
    onToggleEditing()
  }

  render() {
    const { value } = this.state
    return (
      <input
        type="text"
        className="edit"
        onKeyDown={this.onKeyDown}
        onChange={this.onInputChange}
        onBlur={this.onInputBlur}
        value={value}
      />
    )
  }
}

EditTaskForm.propTypes = {
  description: PropTypes.string.isRequired,
}
