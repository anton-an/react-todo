import React, { useState } from 'react'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import TasksFilter from '../TasksFilter/TasksFilter'

export default function App() {
  let taskId = 0

  const createTask = (taskName, seconds) => {
    taskId += 1
    return {
      taskName,
      completed: false,
      editing: false,
      id: taskId,
      taskTime: seconds,
      createdTime: new Date(),
    }
  }

  const [tasksData, setTasksData] = useState([createTask('Task', 3), createTask('Other Task', 150)])
  const [filterType, setFilterType] = useState('All')

  const addNewTask = (name, seconds) => {
    const newTask = createTask(name, seconds)
    setTasksData([...tasksData, newTask])
  }

  const toggleProperty = (arr, id, propName) => {
    const taskIndex = arr.findIndex((el) => el.id === id)
    const oldTask = arr[taskIndex]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }
    return [...arr.slice(0, taskIndex), newTask, ...arr.slice(taskIndex + 1)]
  }

  const deleteTask = (id) => {
    const newArr = tasksData.filter((item) => item.id !== id)
    setTasksData(newArr)
  }

  const onToggleCompleted = (id) => {
    setTasksData(toggleProperty(tasksData, id, 'completed'))
  }

  const onToggleEditing = (id) => {
    const taskIndex = tasksData.findIndex((el) => el.id === id)
    const oldTask = tasksData[taskIndex]
    const newTask = { ...oldTask, editing: !oldTask.editing }
    const newData = [...tasksData.slice(0, taskIndex), newTask, ...tasksData.slice(taskIndex + 1)]
    /* eslint-disable no-param-reassign */
    newData.forEach((item, index) => {
      if (index !== taskIndex) {
        item.editing = false
      }
    })
    /* eslint-enable no-param-reassign */
    setTasksData(newData)
  }

  const editTask = (id, description) => {
    const taskIndex = tasksData.findIndex((el) => el.id === id)
    const oldTask = tasksData[taskIndex]
    const newTask = { ...oldTask, editing: !oldTask.editing, taskName: description }
    const newTasksData = [...tasksData.slice(0, taskIndex), newTask, ...tasksData.slice(taskIndex + 1)]
    setTasksData(newTasksData)
  }

  const onFilterTasks = (filterName) => {
    setFilterType(filterName)
  }

  const onClearCompleted = () => {
    const newTasksData = tasksData.filter((item) => !item.completed)
    setTasksData(newTasksData)
  }

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
        <h1 className="app-title">Todos</h1>
        <NewTaskForm onTaskAdded={addNewTask} />
      </header>
      <section className="main">
        <TaskList
          tasksData={filteredTasksData}
          onDelete={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
          editTask={editTask}
        />
        <Footer>
          <footer className="footer">
            <span className="todo-count">{tasksCounter} items left</span>
            <TasksFilter onFilterChange={onFilterTasks} filterType={filterType} />
            <button type="button" className="clear-completed" onClick={onClearCompleted}>
              Clear completed
            </button>
          </footer>
        </Footer>
      </section>
    </section>
  )
}
