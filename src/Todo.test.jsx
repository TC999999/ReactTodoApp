import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo.jsx";
import { vi } from "vitest";

it("renders without crashing", function () {
  render(<Todo />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});

it("should show a button that says 'Mark As Complete' if complete is false'", function () {
  const { queryByText } = render(<Todo complete={false} />);
  const btn = queryByText("Mark As Complete");
  expect(btn).toBeInTheDocument();
});

it("should show a button that says 'Mark As Incomplete' if complete is true'", function () {
  const { queryByText } = render(<Todo complete={true} />);
  const btn = queryByText("Mark As Incomplete");
  expect(btn).toBeInTheDocument();
});

it("should give any todos with a complete attribute a class of 'complete'", function () {
  const { queryByText } = render(<Todo todo="test-task" complete={true} />);
  const task = queryByText("- test-task");
  expect(task.className).toBe("task complete");
});

it("should call a function to show the edit form when edit button is pressed", function () {
  const compTodoMock = vi.fn();
  const { queryByText } = render(
    <Todo complete={false} compTodo={compTodoMock} />
  );
  expect(compTodoMock).not.toHaveBeenCalled();
  const btn = queryByText("Mark As Complete");
  fireEvent.click(btn);
  expect(compTodoMock).toHaveBeenCalled();
});

it("should call a function to show the edit form when edit button is pressed", function () {
  const showEditFormMock = vi.fn();
  const { queryByText } = render(<Todo showEditForm={showEditFormMock} />);
  expect(showEditFormMock).not.toHaveBeenCalled();
  const btn = queryByText("Edit Task");
  fireEvent.click(btn);
  expect(showEditFormMock).toHaveBeenCalled();
});

it("should call a function to show to delete a task when delete button is pressed", function () {
  const delTodoMock = vi.fn();
  const { queryByText } = render(<Todo delTodo={delTodoMock} />);
  expect(delTodoMock).not.toHaveBeenCalled();
  const btn = queryByText("X");
  fireEvent.click(btn);
  expect(delTodoMock).toHaveBeenCalled();
});
