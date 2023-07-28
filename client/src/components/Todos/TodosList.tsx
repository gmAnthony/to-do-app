import { useState } from "react";
import type { Todo } from "../../types/todo";
import { TodoItem } from "./TodoItem";
import { SegmentedControl } from "@mantine/core";

type TodosListProps = {
  todos: Todo[];
  deleteTodo: (id: Todo["id"]) => void;
  updateTodo: (id: Todo["id"], newTodo: Partial<Todo>) => void;
};

function TodosList({
  todos,
  deleteTodo,
  updateTodo,
}: TodosListProps): JSX.Element {
  const [filter, setFilter] = useState("all");

  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);
  return (
    <div className="todo-list">
      <h2>Your To-dos</h2>
      <SegmentedControl
        data={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Pending" },
        ]}
        value={filter}
        onChange={setFilter}
      />
      <ul>
        {!!filteredTodos.length ? (
          filteredTodos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            );
          })
        ) : (
          <p>No {filter != "all" ? filter : ""} to-dos.</p>
        )}
      </ul>
    </div>
  );
}

export { TodosList };
