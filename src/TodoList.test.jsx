import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "./TodoList.jsx";

it("renders without crashing", function () {
  render(<TodoList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should make a task when the form is submitted", function () {
  const { queryByText, getByLabelText } = render(<TodoList />);
  const input = getByLabelText("Next on the List");
  const btn = queryByText("Add Todo");
  expect(queryByText("- test-task")).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: "test-task" } });
  fireEvent.submit(btn);
  expect(queryByText("- test-task")).toBeInTheDocument();
});

it("should add a 'complete' class to a task when 'Mark As Complete' button is clicked", function () {
  const { queryByText } = render(<TodoList />);
  const task = queryByText("- test-task");
  expect(task.className).toBe("task ");
  const mark = queryByText("Mark As Complete");
  fireEvent.click(mark);
  expect(task.className).toBe("task complete");
  expect(queryByText("Mark As Complete")).not.toBeInTheDocument();
});

it("should remove the 'complete' class when 'Mark as Incomplete' button is clicked", function () {
  const { queryByText } = render(<TodoList />);
  const task = queryByText("- test-task");
  expect(task.className).toBe("task complete");
  const mark = queryByText("Mark As Incomplete");
  fireEvent.click(mark);
  expect(task.className).toBe("task ");
  expect(queryByText("Mark As Incomplete")).not.toBeInTheDocument();
});

it("should hide the todo-list and new todo form and show edit form when 'Edit Task' button is clicked", function () {
  const { queryByText, container } = render(<TodoList />);

  expect(
    container.querySelector("div[id='todo-list-div']")
  ).toBeInTheDocument();
  expect(
    container.querySelector("div[id='todo-form-div']")
  ).toBeInTheDocument();
  expect(
    container.querySelector("div[id='edit-todo-div']")
  ).not.toBeInTheDocument();

  const edit = queryByText("Edit Task");
  fireEvent.click(edit);

  expect(
    container.querySelector("div[id='todo-list-div']")
  ).not.toBeInTheDocument();
  expect(
    container.querySelector("div[id='todo-form-div']")
  ).not.toBeInTheDocument();
  expect(
    container.querySelector("div[id='edit-todo-div']")
  ).toBeInTheDocument();
});

it("should cancel any changes if the 'Cancel' button is clicked when editing a function", function () {
  const { queryByText, getByLabelText, container } = render(<TodoList />);

  expect(queryByText("- test-task")).toBeInTheDocument();
  expect(queryByText("- new-test-task")).not.toBeInTheDocument();

  const edit = queryByText("Edit Task");
  fireEvent.click(edit);
  const input = getByLabelText("Edit Task - test-task");
  fireEvent.change(input, { target: { value: "new-test-task" } });
  expect(input).toHaveValue("new-test-task");
  fireEvent.click(queryByText("Cancel"));

  expect(queryByText("- test-task")).toBeInTheDocument();
  expect(queryByText("- new-test-task")).not.toBeInTheDocument();
});

it("should hide the edit form, show the todo-list with the changed task when the edit button is clicked", function () {
  const { queryByText, getByLabelText, container } = render(<TodoList />);

  expect(queryByText("- test-task")).toBeInTheDocument();
  expect(queryByText("- new-test-task")).not.toBeInTheDocument();

  const edit = queryByText("Edit Task");
  fireEvent.click(edit);
  const input = getByLabelText("Edit Task - test-task");
  fireEvent.change(input, { target: { value: "new-test-task" } });
  fireEvent.submit(queryByText("Edit Todo"));

  expect(queryByText("- test-task")).not.toBeInTheDocument();
  expect(queryByText("- new-test-task")).toBeInTheDocument();

  expect(
    container.querySelector("div[id='todo-list-div']")
  ).toBeInTheDocument();
  expect(
    container.querySelector("div[id='todo-form-div']")
  ).toBeInTheDocument();
  expect(
    container.querySelector("div[id='edit-todo-div']")
  ).not.toBeInTheDocument();
});

it("should delete a task when the 'X' button is clicked", function () {
  const { queryByText } = render(<TodoList />);

  expect(queryByText("- new-test-task")).toBeInTheDocument();
  const del = queryByText("X");

  fireEvent.click(del);
  expect(queryByText("- new-test-task")).not.toBeInTheDocument();
});
