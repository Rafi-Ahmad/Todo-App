import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdDelete, MdCheckCircle, MdPriorityHigh } from 'react-icons/md';
import Select from 'react-select';

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const TodoCard = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 150px; /* Adjust the height as needed */
  overflow-y: auto; /* Add scrollbar when needed */
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TodoCheckbox = styled.input`
  margin-right: 10px;
`;


const TodoInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: calc(100% - 10px);
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const TodoIcons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const PriorityIcon = styled(MdPriorityHigh)`
  color: ${(props) => props.priorityColor || '#777'};
  margin-right: 5px;
`;

const ColorButton = styled.button`
  background-color: ${(props) => props.color || '#e44d26'};
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('low');

  // Options for the priority select
  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: '#3498db' },
    { value: 'medium', label: 'Medium Priority', color: '#f7b731' },
    { value: 'high', label: 'High Priority', color: '#e44d26' },
  ];
  let server = "http://localhost:5000"
  useEffect(() => {
    axios.get(`${server}/todos`)
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = () => {
    axios.post(`${server}/todos`, { task, category, priority })
      .then(response => {
        setTodos([...todos, response.data]);
        setTask('');
        setCategory('');
        setPriority('low');
      })
      .catch(error => console.error(error));
  };

  const toggleTodo = (id) => {
    axios.put(`${server}/todos/${id}`, { completed: !todos.find(todo => todo._id === id).completed })
      .then(response => setTodos(todos.map(todo => (todo._id === id ? response.data : todo))))
      .catch(error => console.error(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`${server}/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <TodoContainer>
      <TodoCard>
        <h1>Todo App</h1>
        <TodoInput type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
        <TodoInput type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <Select
          value={priorityOptions.find((option) => option.value === priority)}
          onChange={(selectedOption) => setPriority(selectedOption.value)}
          options={priorityOptions}
        />
        <ColorButton color={priorityOptions.find((option) => option.value === priority).color} onClick={addTodo}>
          Add Todo
        </ColorButton>
        <h1>My Task</h1>
        <TodoList>
          {todos.map(todo => (
            <TodoItem key={todo._id}>
              <TodoCheckbox type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo._id)} />
              <div>
                <div>{todo.task}</div>
                {todo.category && <div>Category: {todo.category}</div>}
              </div>
              <TodoIcons>
                {todo.priority === 'high' && <PriorityIcon priorityColor="#e44d26" />}
                {todo.priority === 'medium' && <PriorityIcon priorityColor="#f7b731" />}
                {todo.priority === 'low' && <PriorityIcon priorityColor="#3498db" />}
                {todo.completed ? (
                  <MdCheckCircle style={{ color: '#2ecc71', marginLeft: '5px' }} />
                ) : (
                  <ColorButton color="#e44d26" onClick={() => deleteTodo(todo._id)}>
                    <MdDelete />
                  </ColorButton>
                )}
              </TodoIcons>
            </TodoItem>
          ))}
        </TodoList>
      </TodoCard>
    </TodoContainer>
  );
}

export default App;
