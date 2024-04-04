import { useState } from "react";

const NewTodoForm = ({ addTodo }) => {
  const initialState = {
    todo: "",
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
    addTodo({ ...formData });
    setFormData(initialState);
  };

  return (
    <div id="todo-form-div">
      <form id="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="todo">Next on the List</label>
        <input
          id="todo"
          type="text"
          name="todo"
          placeholder="Enter Task Here"
          value={formData.todo}
          onChange={handleChange}
        />

        <button>Add Todo</button>
      </form>
    </div>
  );
};

export default NewTodoForm;
