import React, {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "./custom-hooks/useLocalStorage";

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload];
    case "UPDATE_TODO":
      return state.map((todo, index) =>
        index === action.index ? { ...todo, task: action.payload } : todo
      );
    case "DELETE_TODO":
      return state.filter((_, index) => index !== action.index);
    case "TOGGLE_COMPLETE":
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);

  useEffect(() => {
    console.log("Loaded todos from localStorage:", storedTodos);
    dispatch({ type: "SET_TODOS", payload: storedTodos });
    setIsLoading(false);
  }, [storedTodos]);

  useEffect(() => {
    if (!isLoading) {
      setStoredTodos(todos);
    }
  }, [todos, isLoading, setStoredTodos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch, isLoading }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
