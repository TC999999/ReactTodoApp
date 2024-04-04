import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm.jsx";
import { expect, vi } from "vitest";

it("renders without crashing", function () {
  render(<NewTodoForm />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("should be empty at the start", function () {
  const { getByLabelText } = render(<NewTodoForm />);
  const input = getByLabelText("Next on the List");
  expect(input).toBeEmptyDOMElement();
});

it("should have value when filled in", function () {
  const { getByLabelText } = render(<NewTodoForm />);
  const input = getByLabelText("Next on the List");

  fireEvent.change(input, { target: { value: "test-task" } });
  expect(input).toHaveValue("test-task");
});

it("should empty itself when submitted", function () {
  const addTodoMock = vi.fn();
  const { getByLabelText, queryByText } = render(
    <NewTodoForm addTodo={addTodoMock} />
  );
  expect(addTodoMock).not.toHaveBeenCalled();

  const input = getByLabelText("Next on the List");
  const btn = queryByText("Add Todo");

  fireEvent.change(input, { target: { value: "test-task" } });
  fireEvent.submit(btn);

  expect(addTodoMock).toHaveBeenCalled();
  expect(input).toBeEmptyDOMElement();
});
