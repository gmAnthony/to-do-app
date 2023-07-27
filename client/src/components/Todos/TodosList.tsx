import { useState } from "react";
import type { Todo } from "../../types/todo";
import { TodoItem } from "./TodoItem";
import { SegmentedControl } from "@mantine/core";

interface TodoListProps {
  todos: Todo[];
}

function TodosList({ todos }: TodoListProps): JSX.Element {
  // instead of accepting todos as a prop, fetch them from the backend
  const [filter, setFilter] = useState("all");
  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  return (
    <div className="todo-list">
      <h2>Your Tasks</h2>
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
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export { TodosList };
