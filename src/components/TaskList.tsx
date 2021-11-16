import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    let ids:number = 1;
    let similar: boolean = true;

    if(tasks.length){
      while(similar){
        ids = Math.round((Math.random()*1000));
        similar = false;
        tasks.forEach(taskid =>{
          if(taskid.id==ids){
            similar = true;
          }
        });
      }
    }

    if(newTaskTitle){
        const aux: Task ={
          id: ids,
          title: newTaskTitle,
          isComplete: false
        }
        setTasks([...tasks, aux]);
      }
    }

  function handleToggleTaskCompletion(id: number) {
    tasks.forEach(task =>{
      if(id == task.id){
        task.isComplete = !task.isComplete;
      }
      setTasks([...tasks]);
    });
  }

  function handleRemoveTask(id: number) {
    let auxArray:Task[] = [];
    auxArray = tasks.filter((task)=>{
      return task.id != id;
    });
    setTasks([...auxArray]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))
        }
          
        </ul>
      </main>
    </section>
  )
}