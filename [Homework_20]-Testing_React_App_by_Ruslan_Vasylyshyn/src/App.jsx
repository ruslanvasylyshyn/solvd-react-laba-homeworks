import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import "./App.css";
import deleteBtn from "./assets/img/delete-btn.svg";
import updateBtn from "./assets/img/update-btn.svg";
import { useTodos } from "./TodoContext";
import { usePrevious } from "./custom-hooks/usePrevious";
import { useValidation } from "./custom-hooks/useValidation";

function App() {
  const { todos, dispatch, isLoading } = useTodos();
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const editInputRef = useRef(null);
  const inputRef = useRef(null);
  const prevTodos = usePrevious(todos);

  const inputValidationRules = useMemo(
    () => ({
      required: true,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9а-яА-Я\s]+$/,
      unique: todos,
    }),
    [todos]
  );

  const editValidationRules = useMemo(
    () => ({
      required: true,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9а-яА-Я\s]+$/,
      unique: todos.filter((_, i) => i !== editIndex),
    }),
    [todos, editIndex]
  );

  const inputError = useValidation(inputValue, inputValidationRules);
  const editError = useValidation(editValue, editValidationRules);

  useEffect(() => {
    if (prevTodos && prevTodos.length !== todos.length) {
      console.log("===============");
      console.log("Previous todos:", prevTodos);
      console.log("Current todos:", todos);
    }
  }, [todos, prevTodos]);

  const addTodo = useCallback(() => {
    if (inputError) {
      alert(inputError);
      return;
    }

    const newTodo = {
      task: inputValue,
      completed: false,
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });
    setInputValue("");
    inputRef.current.focus();
  }, [inputValue, inputError, dispatch]);

  const updateTodo = useCallback(
    (index) => {
      if (editError) {
        alert(editError);
        return;
      }

      dispatch({ type: "UPDATE_TODO", index, payload: editValue });
      setEditIndex(null);
      setEditValue("");
    },
    [editValue, editError, dispatch]
  );

  const deleteTodo = useCallback(
    (index) => {
      dispatch({ type: "DELETE_TODO", index });
    },
    [dispatch]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (editIndex !== null) {
          updateTodo(editIndex);
        } else {
          addTodo();
        }
      }
    },
    [addTodo, updateTodo, editIndex]
  );

  useEffect(() => {
    if (editIndex !== null) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  const toggleComplete = useCallback(
    (index) => {
      dispatch({ type: "TOGGLE_COMPLETE", index });
    },
    [dispatch]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-wrapper">
      <div className="input-wrapper">
        <input
          type="text"
          value={inputValue}
          ref={inputRef}
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
              <div className={todo.completed ? "completed" : ""}>
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
              <img src={updateBtn} alt="Update" />
            </button>
            <button
              onClick={() => deleteTodo(index)}
              className="todo-deleteBtn"
            >
              <img src={deleteBtn} alt="Delete" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
