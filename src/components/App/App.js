import React from 'react'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'

export default class App extends React.Component {
  static toggleProperty(arr, id, propName) {
    const taskIndex = arr.findIndex((el) => el.id === id)
    const oldTask = arr[taskIndex]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }
    return [...arr.slice(0, taskIndex), newTask, ...arr.slice(taskIndex + 1)]
  }

  taskId = 0

  state = {
    tasksData: [this.createTask('Task', 3), this.createTask('Other Task', 150)],
    filterType: 'All',
  }

  addNewTask = (name, seconds) => {
    const newTask = this.createTask(name, seconds)
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
      tasksData: App.toggleProperty(tasksData, id, 'completed'),
    }))
  }

  onToggleEditing = (id) => {
    this.setState(({ tasksData }) => ({ tasksData: App.toggleProperty(tasksData, id, 'editing') }))
  }

  editTask = (id, description) => {
    const { tasksData } = this.state
    const taskIndex = tasksData.findIndex((el) => el.id === id)
    const oldTask = tasksData[taskIndex]
    const newTask = { ...oldTask, editing: !oldTask.editing, taskName: description }
    const newTasksData = [...tasksData.slice(0, taskIndex), newTask, ...tasksData.slice(taskIndex + 1)]
    this.setState(() => ({
      tasksData: newTasksData,
    }))
  }

  filterTasks = (filterName) => {
    this.setState({
      filterType: filterName,
    })
  }

  clearCompleted = () => {
    this.setState(({ tasksData }) => {
      const newTasksData = tasksData.filter((item) => !item.completed)
      return {
        tasksData: newTasksData,
      }
    })
  }

  timerChange = (id) => {
    this.setState((state) => {
      const { tasksData } = state
      const taskIndex = tasksData.findIndex((el) => el.id === id)
      const oldTask = tasksData[taskIndex]
      const newTask = { ...oldTask, taskTime: oldTask.taskTime - 1 }
      const newTasksData = [...tasksData.slice(0, taskIndex), newTask, ...tasksData.slice(taskIndex + 1)]
      return { tasksData: newTasksData }
    })
  }

  createTask(taskName, seconds) {
    this.taskId += 1
    return {
      taskName,
      completed: false,
      editing: false,
      id: this.taskId,
      taskTime: seconds,
      createdTime: new Date(),
    }
  }

  render() {
    const { tasksData, filterType } = this.state
    const tasksCounter = tasksData.filter((item) => !item.completed).length

    const filteredTasksData = tasksData.filter((item) => {
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
            tasksData={filteredTasksData}
            onDelete={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            editTask={this.editTask}
            timerChange={this.timerChange}
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
