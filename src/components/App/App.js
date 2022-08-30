import React from 'react';
import './App.css'
import { formatDistanceToNow } from 'date-fns'


import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import TaskList from '../TaskList';



const App = () => {

    const taskCreatedTime = formatDistanceToNow(new Date(), { addSuffix: true })

    const tasksData = [
        {completed: true, description: 'Completed task', createdTime: taskCreatedTime, id: 1},
        {completed: false, description: 'Active task', createdTime: taskCreatedTime, id: 2},
        {completed: false, editing: true, description: 'Editing task', createdTime: taskCreatedTime, id: 3}
    ];

    return (
        <section className='todoapp'>
            <header className='header'>
                <h1>Todos</h1>
                <NewTaskForm />
            </header>
            <section className='main'>
                <TaskList taskData = {tasksData} />
                <Footer />
            </section>   
        </section>
    );
};

export default App;