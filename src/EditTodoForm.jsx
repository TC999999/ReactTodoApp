import { useState } from "react";

const EditTodoForm = ({ todo, editTodo, showEditForm }) => {
  const initialState = {
    "edit-todo": todo,
  };

  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo({ ...formData });
    setFormData(initialState);
  };

  return (
    <div id="edit-todo-div">
      <form id="edit-todo-form" onSubmit={handleSubmit}>
        <label htmlFor="edit-todo">Edit Task - {todo}</label>
        <input
          id="edit-todo"
          type="text"
          name="edit-todo"
          placeholder="Enter Task Here"
          value={formData["edit-todo"]}
          onChange={handleChange}
        />

        <button>Edit Todo</button>
      </form>
      <button onClick={showEditForm}>Cancel</button>
    </div>
  );
};

export default EditTodoForm;
