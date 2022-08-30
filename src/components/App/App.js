import React, {Component} from 'react';
import './App.css'
import { formatDistanceToNow } from 'date-fns'


import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import TaskList from '../TaskList';



export default class App extends React.Component {

    state = {
        tasksData: [
            {completed: true, description: 'Completed task', id: 1},
            {completed: false, description: 'Active task', id: 2},
            {completed: false, editing: true, description: 'Editing task', id: 3}
        ],
    }

    deleteTask = (id) => {
        console.log(id)
        this.setState(({ tasksData }) => {
            const newArr = tasksData.filter(item => item.id !== id)
            return {
                tasksData: newArr
            };
        });
    };

    render () {

        return (
            <section className='todoapp'>
                <header className='header'>
                    <h1>Todos</h1>
                    <NewTaskForm />
                </header>
                <section className='main'>
                    <TaskList tasksData={this.state.tasksData} onDeleted={this.deleteTask} />
                    <Footer />
                </section>   
            </section>
        );
    };
};