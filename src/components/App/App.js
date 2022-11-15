import React, { useEffect, useState } from 'react'
import './App.css'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import TasksFilter from '../TasksFilter/TasksFilter'

export default function App() {
  const [taskId, setTaskId] = useState(1)
  const [tasksData, setTasksData] = useState([])
  const [filterType, setFilterType] = useState('All')

  const createTask = (taskName, seconds) => {
    setTaskId(taskId + 1)
    return {
      taskName,
      completed: false,
      editing: false,
      id: taskId,
      taskTime: seconds,
      createdTime: new Date(),
      hidden: false,
    }
  }

  useEffect(() => {
    setTasksData([createTask('Task', 10)])
  }, [])

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
    setTasksData(toggleProperty(tasksData, id, 'editing'))
  }

  const editTask = (id, description) => {
    const taskIndex = tasksData.findIndex((el) => el.id === id)
    const oldTask = tasksData[taskIndex]
    const newTask = { ...oldTask, editing: false, taskName: description }
    const newTasksData = [...tasksData.slice(0, taskIndex), newTask, ...tasksData.slice(taskIndex + 1)]
    setTasksData(newTasksData)
  }

  const onFilterTasks = (filterName) => {
    setFilterType(filterName)
    /* eslint-disable no-param-reassign */
    setTasksData(() =>
      [...tasksData].map((task) => {
        task.hidden = false
        if (filterName === 'Completed' && !task.completed) {
          task.hidden = true
        } else if (filterName === 'Active' && task.completed) {
          task.hidden = true
        }
        return task
      })
    )
    /* eslint-enable no-param-reassign */
  }

  const onClearCompleted = () => {
    const newTasksData = tasksData.filter((item) => !item.completed)
    setTasksData(newTasksData)
  }

  const tasksCounter = tasksData.filter((item) => !item.completed).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1 className="app-title">Todos</h1>
        <NewTaskForm onTaskAdded={addNewTask} />
      </header>
      <section className="main">
        <TaskList
          tasksData={tasksData}
          onDelete={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
          editTask={editTask}
        />
        <Footer>
          <span className="todo-count">{tasksCounter} items left</span>
          <TasksFilter onFilterChange={onFilterTasks} filterType={filterType} />
          <button type="button" className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        </Footer>
      </section>
    </section>
  )
}
