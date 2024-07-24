import { useState, useEffect, useRef } from "react";
import deleteImg from "./assets/img/delete-btn.svg";
import updateImg from "./assets/img/update-btn.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // State to manage the list of to-dos
  const [inputValue, setInputValue] = useState(""); // State to manage the input value for adding new to-dos
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the to-do being edited
  const [editValue, setEditValue] = useState(""); // State to manage the value being edited
  const [loading, setLoading] = useState(true); // State to manage loading status
  const editInputRef = useRef(null); // Ref to focus on the input during editing

  // useEffect to load data from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    setLoading(false); // Set loading to false after data is loaded
  }, []);

  // useEffect to save data to localStorage when todos change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  // Function to add a new to-do
  const addTodo = () => {
    if (
      inputValue.trim() === "" ||
      todos.some((todo) => todo.task === inputValue) ||
      inputValue.length > 100 ||
      !/^[a-zA-Z0-9а-яА-Я\s]+$/.test(inputValue.trim())
    ) {
      alert(
        "Invalid to-do item. Make sure it contains only letters, numbers, and spaces, and is not empty, duplicate, or too long."
      );
      return;
    }
    const newTodo = {
      task: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const updateTodo = (index) => {
    if (
      editValue.trim() === "" ||
      todos.some((todo, i) => i !== index && todo.task === editValue) ||
      editValue.length > 100 ||
      !/^[a-zA-Z0-9а-яА-Я\s]+$/.test(editValue.trim())
    ) {
      alert(
        "Invalid to-do item. Make sure it contains only letters, numbers, and spaces, and is not empty, duplicate, or too long."
      );
      return;
    }

    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, task: editValue } : todo
    );

    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  // Function to delete a to-do
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Handler for Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (editIndex !== null) {
        updateTodo(editIndex);
      } else {
        addTodo();
      }
    }
  };

  // Focus on input during editing
  useEffect(() => {
    if (editIndex !== null) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-wrapper">
      <div className="input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Create Todo-Task"
          className="input"
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-items">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editIndex === index ? (
              <input
                type="text"
                ref={editInputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateTodo(index);
                }}
                className="edit-input"
              />
            ) : (
              <div className={todo.completed ? "completed" : undefined}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="todo-checkbox"
                />
                {todo.task}
              </div>
            )}
            <button
              onClick={() => {
                if (editIndex === index) {
                  updateTodo(index);
                } else {
                  setEditIndex(index);
                  setEditValue(todo.task);
                }
              }}
              className={
                editIndex === index ? "todo-updateBtn active" : "todo-updateBtn"
              }
            >
              <img src={updateImg} />
            </button>
            <button
              onClick={() => deleteTodo(index)}
              className="todo-deleteBtn"
            >
              <img src={deleteImg} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
