import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { useTodos } from "./TodoContext";
import "@testing-library/jest-dom";

jest.mock("./TodoContext", () => ({
  useTodos: jest.fn(),
}));

test("renders App component", () => {
  useTodos.mockReturnValue({
    todos: [],
    dispatch: jest.fn(),
    isLoading: true,
  });

  render(<App />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("adds a todo when the Add button is clicked", () => {
  const mockDispatch = jest.fn();
  useTodos.mockReturnValue({
    todos: [],
    dispatch: mockDispatch,
    isLoading: false,
  });

  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Create Todo-Task/i);
  const buttonElement = screen.getByText(/Add/i);

  fireEvent.change(inputElement, { target: { value: "New Todo" } });

  fireEvent.click(buttonElement);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "ADD_TODO",
    payload: { task: "New Todo", completed: false },
  });
});

test("renders todo items", () => {
  useTodos.mockReturnValue({
    todos: [
      { task: "Todo 1", completed: false },
      { task: "Todo 2", completed: true },
    ],
    dispatch: jest.fn(),
    isLoading: false,
  });

  render(<App />);

  const todoItems = screen.getAllByRole("listitem");
  expect(todoItems).toHaveLength(2);
  expect(screen.getByText(/Todo 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Todo 2/i)).toBeInTheDocument();
});
