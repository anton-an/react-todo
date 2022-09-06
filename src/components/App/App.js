import React from 'react'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'

export default class App extends React.Component {
  static toggleProperty = (arr, id, propName) => {
    const newArr = [...arr]
    newArr.forEach((item) => {
      if (item.id === id) {
        item[propName] = !item[propName]
      }
    })
    return newArr
  }

  taskId = 1

  state = {
    tasksData: [],
    filterType: 'All',
  }

  addNewTask = (name) => {
    const newTask = this.createTask(name)

    this.setState(({ tasksData }) => ({
      tasksData: [...tasksData, newTask],
    }))
  }

  deleteTask = (id) => {
    this.setState(({ tasksData }) => {
      const newArr = tasksData.filter((item) => item.id !== id)
      return {
        tasksData: newArr,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: this.toggleProperty(tasksData, id, 'completed'),
    }))
  }

  onToggleEditing = (id) => {
    this.setState(({ tasksData }) => this.toggleProperty(tasksData, id, 'editing'))
  }

  editTask = (id, newDescription) => {
    this.setState(({ tasksData }) => {
      const newArr = [...tasksData]
      newArr.forEach((item) => {
        if (item.id === id) {
          item.description = newDescription
          item.editing = false
        }
      })
      return {
        tasksData: newArr,
      }
    })
  }

  filterTasks = (filterName) => {
    this.setState({
      filterType: filterName,
    })
  }

  clearCompleted = () => {
    this.setState(({ tasksData }) => {
      const newArr = tasksData.filter((item) => !item.completed)
      return {
        tasksData: newArr,
      }
    })
  }

  createTask(taskName) {
    return {
      description: taskName,
      completed: false,
      editing: false,
      id: (this.taskId += 1),
      createdTime: new Date(),
    }
  }

  render() {
    const { tasksData, filterType } = this.state
    const tasksCounter = tasksData.filter((item) => !item.completed).length

    const filteredTaskData = tasksData.filter((item) => {
      if (filterType === 'Completed') {
        return item.completed
      }
      if (filterType === 'Active') {
        return !item.completed
      }
      return item
    })

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onTaskAdded={this.addNewTask} />
        </header>
        <section className="main">
          <TaskList
            tasksData={filteredTaskData}
            onDelete={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            editTask={this.editTask}
            filterType={filterType}
          />
          <Footer
            tasksCounter={tasksCounter}
            onFilterChange={this.filterTasks}
            filterType={filterType}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
