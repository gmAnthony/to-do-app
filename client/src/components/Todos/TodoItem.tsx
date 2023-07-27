import type { Todo } from "../../types/todo";
import { ActionIcon, Card, Checkbox } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const changeStatus = () => {
    // update the todo's status
    console.log("We are changing the status of the todo");
  };

  return (
    <div className="todo-item">
      <Card
        className="todo-item"
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: todo.status === "completed" ? "#e6e6e6" : "white",
        }}
      >
        <div className="todo-item-header">
          <Checkbox
            checked={todo.status === "completed"}
            onChange={changeStatus}
            size="xs"
          />
          <h3>{todo.title}</h3>
        </div>
        <span>{todo.description}</span>
        <div className="todo-item-footer">
          <ActionIcon disabled={todo.status === "completed"}>
            <IconEdit size="1.125rem" />
          </ActionIcon>
          <ActionIcon disabled={todo.status === "completed"}>
            <IconTrash size="1.125rem" />
          </ActionIcon>
        </div>
      </Card>
    </div>
  );
}

export { TodoItem };
