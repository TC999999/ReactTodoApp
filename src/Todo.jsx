import "./Todo.css";

const Todo = ({ id, todo, complete, delTodo, compTodo, showEditForm }) => {
  const classes = `task ${complete ? "complete" : ""}`;
  const compMessage = () => {
    return complete == true ? "Mark As Incomplete" : "Mark As Complete";
  };

  return (
    <div className="todo">
      <div className="todo-item" id={id}>
        <p className={classes}>- {todo}</p>
        <button className="btn" onClick={compTodo}>
          {compMessage()}
        </button>
        <button className="btn" onClick={delTodo}>
          X
        </button>
        <button className="btn" onClick={showEditForm}>
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default Todo;
