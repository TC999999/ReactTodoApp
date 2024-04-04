import Todo from "./Todo.jsx";
import NewTodoForm from "./NewTodoForm.jsx";
import EditTodoForm from "./EditTodoForm.jsx";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const TodoList = () => {
  const initialState = () => {
    if (!localStorage.getItem("todos")) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem("todos"));
    }
  };
  const [todos, setTodos] = useState(initialState());
  const [needsEditing, setNeedsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ id: "", todo: "" });

  const addTodo = (newTodo) => {
    const newTodos = [...todos, { ...newTodo, id: uuid(), complete: false }];
    setTodos((todos) => newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const delTodo = (e) => {
    let todosCopy = todos.map((t) => {
      return { ...t };
    });

    let id = e.target.closest(".todo-item").id;
    let filteredTodosCopy = todosCopy.filter((t) => {
      return t.id !== id;
    });
    setNeedsEditing(false);
    setTodos(filteredTodosCopy);
    localStorage.setItem("todos", JSON.stringify(filteredTodosCopy));
  };

  const showEditForm = (e) => {
    if (needsEditing == false) {
      let id = e.target.closest(".todo-item").id;

      const target = todos.filter((t) => {
        return t.id == id;
      });
      setNeedsEditing(true);
      setEditedTodo({ id: id, todo: target[0].todo });
    } else {
      setEditedTodo({ id: "", todo: "" });
      setNeedsEditing(false);
    }
  };

  const editTodo = (newTodo) => {
    const todosCopy = todos.map((t) => {
      if (editedTodo.id == t.id) {
        return { ...t, todo: newTodo["edit-todo"] };
      } else {
        return { ...t };
      }
    });
    setNeedsEditing(false);
    setEditedTodo({ id: "", todo: "" });
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
  };

  const compTodo = (e) => {
    let task = e.target.previousElementSibling;
    let id = e.target.closest(".todo-item").id;
    let todosCopy;

    if (!task.classList.contains("complete")) {
      todosCopy = todos.map((t) => {
        if (t.id == id) {
          return { ...t, complete: true };
        } else {
          return { ...t };
        }
      });
    } else {
      todosCopy = todos.map((t) => {
        if (t.id == id) {
          return { ...t, complete: false };
        } else {
          return { ...t };
        }
      });
    }
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
  };

  return (
    <div id="todos">
      <h3>To-Do List</h3>
      {!needsEditing && <NewTodoForm addTodo={addTodo} />}

      {needsEditing && (
        <EditTodoForm
          todo={editedTodo.todo}
          editTodo={editTodo}
          showEditForm={showEditForm}
        />
      )}
      {!needsEditing && (
        <div id="todo-list-div">
          {todos.map(({ id, todo, complete }) => {
            return (
              <Todo
                id={id}
                key={id}
                todo={todo}
                complete={complete}
                delTodo={delTodo}
                compTodo={compTodo}
                showEditForm={showEditForm}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoList;
