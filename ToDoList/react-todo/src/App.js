import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';

const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks);

  const saveTasks = (tasks) => {
    setTasks(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (name) => {
    const newTask = { id: 'todo-' + nanoid(), name: name };
    saveTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    saveTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    saveTasks(editedTaskList);
  };

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      key={task.id}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className='todoapp stack-large'>
      <Form addTask={addTask} />
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  );
};

export default App;
