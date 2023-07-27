import { TodoForm } from "./TodoForm";
import { TodosList } from "./TodosList";
// delete once we hook up the backend
import { todos } from "../../mocks/todos";

function TodosContainer() {
  return (
    <div className="todo-container">
      <TodoForm />
      <TodosList todos={todos} />
    </div>
  );
}

export { TodosContainer };
