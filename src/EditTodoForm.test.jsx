import { render, fireEvent } from "@testing-library/react";
import EditTodoForm from "./EditTodoForm.jsx";
import { vi } from "vitest";

it("renders without crashing", function () {
  render(<EditTodoForm />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<EditTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("should have value and label that includes the specified task at the start", function () {
  const { getByLabelText } = render(<EditTodoForm todo="test-task" />);
  const input = getByLabelText("Edit Task - test-task");
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("test-task");
});

it("should have a changeable value", function () {
  const { getByLabelText } = render(<EditTodoForm todo="test-task" />);
  const input = getByLabelText("Edit Task - test-task");
  fireEvent.change(input, { target: { value: "new-test-task" } });
  expect(input).toHaveValue("new-test-task");
});

it("should call a function to cancel editing when the cancel button is clicked", function () {
  const showEditFormMock = vi.fn();
  const { queryByText } = render(
    <EditTodoForm todo="test-task" showEditForm={showEditFormMock} />
  );
  expect(showEditFormMock).not.toHaveBeenCalled();

  const cancel = queryByText("Cancel");
  fireEvent.click(cancel);
  expect(showEditFormMock).toHaveBeenCalled();
});

it("should empty itself out when the edit button is clicked", function () {
  const editTodoMock = vi.fn();
  const { getByLabelText, queryByText } = render(
    <EditTodoForm todo="test-task" editTodo={editTodoMock} />
  );
  expect(editTodoMock).not.toHaveBeenCalled();

  const input = getByLabelText("Edit Task - test-task");

  const btn = queryByText("Edit Todo");
  fireEvent.submit(btn);
  expect(editTodoMock).toHaveBeenCalled();
  expect(input).toBeEmptyDOMElement();
});
