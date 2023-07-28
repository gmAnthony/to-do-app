import { TodoForm } from "./TodoForm";
import { TodosList } from "./TodosList";
import { useTodos } from "../../utils/useTodos";

function TodosContainer() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos();

  return (
    <div className="todo-container">
      <TodoForm addTodo={addTodo} />
      <TodosList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export { TodosContainer };
