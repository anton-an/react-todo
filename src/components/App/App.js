import React, {Component} from 'react';
import './App.css'
import { formatDistanceToNow } from 'date-fns'


import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import TaskList from '../TaskList';



export default class App extends React.Component {

    state = {
        tasksData: [],
        filterType: 'All'
    };

    taskId = 1

    createTask = (taskName) => {
        return {
            description: taskName,
            completed: false,
            editing: false,
            id: this.taskId++
        };
    };

    deleteTask = (id) => {
        this.setState(({ tasksData }) => {
            const newArr = tasksData.filter(item => item.id !== id)
            return {
                tasksData: newArr
            };
        });
    };

    onComplete = (id) => {
        this.setState(({ tasksData }) => {
            const newArr = [...tasksData]
            newArr.forEach ((item) => {
                if (item.id === id) {
                    item.completed = !item.completed
                }
            });
            return {
                tasksData: newArr
            };
        });
    };

    editTask = (id) => {
        this.setState(({ tasksData }) => {
            const newArr = [...tasksData]
            newArr.forEach ((item) => {
                if (item.id === id) {
                    item.editing = !item.editing
                }
            });
            return {
                tasksData: newArr
            };
        });
    };


    addNewTask = (name) => {
        const newTask = this.createTask(name) 

        this.setState(({ tasksData }) => {
            return {
                tasksData: [...tasksData, newTask]
            };
        });
    };

    filterTasks = (filterName) => {
        this.setState({
            filterType: filterName
        })
    }

    clearCompleted = () => {
        this.setState(({ tasksData }) => {
            const newArr = tasksData.filter((item) => !item.completed)
            return {
                tasksData: newArr
            }
        })
    }

    render () {

        const filteredTaskData = this.state.tasksData.filter(item => {
            if (this.state.filterType === 'Completed') {
                return item.completed
            } else if (this.state.filterType === 'Active') {
                return !item.completed
            } else {
                return item
            }
        })

        const { tasksData, filterType } = this.state
        const tasksCounter = tasksData.filter(item => !item.completed).length

        return (
            <section className='todoapp'>
                <header className='header'>
                    <h1>Todos</h1>
                    <NewTaskForm onTaskAdded={this.addNewTask}/>
                </header>
                <section className='main'>
                    <TaskList tasksData={filteredTaskData}
                              onDelete={this.deleteTask}
                              onComplete={this.onComplete} 
                              onEdit={this.editTask}
                              filterType={filterType}/>
                    <Footer tasksCounter={tasksCounter} 
                            onFilterChange={this.filterTasks} 
                            filterType={filterType} 
                            onClearCompleted={this.clearCompleted} />
                </section>   
            </section>
        );
    };
};