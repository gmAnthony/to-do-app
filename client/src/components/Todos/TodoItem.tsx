import { useState } from "react";
import type { Todo } from "../../types/todo";
import { ActionIcon, Card, Checkbox, TextInput } from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconDeviceFloppy,
  IconCircleX,
} from "@tabler/icons-react";

type TodoItemProps = {
  todo: Todo;
  deleteTodo: (id: Todo["id"]) => void;
  updateTodo: (id: Todo["id"], newTodo: Partial<Todo>) => void;
};

function TodoItem({
  todo,
  deleteTodo,
  updateTodo,
}: TodoItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
  });

  const newStatus = todo.status === "completed" ? "pending" : "completed";

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    updateTodo(todo.id, editedTodo);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTodo({
      ...editedTodo,
      title: todo.title,
      description: todo.description,
    });
    setIsEditing(false);
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
            onChange={() => updateTodo(todo.id, { status: newStatus })}
            size="xs"
            disabled={isEditing}
            data-testid="toggle-todo"
          />
          {isEditing ? (
            <TextInput
              value={editedTodo.title}
              className="todo-edited-item-title"
              onChange={(event) =>
                setEditedTodo({
                  ...editedTodo,
                  title: event.currentTarget.value,
                })
              }
              size="xs"
              variant="unstyled"
              data-testid="editable-todo-title-input"
            />
          ) : (
            <span data-testid="todo-title" className="todo-title">
              {todo.title}
            </span>
          )}
        </div>
        {isEditing ? (
          <TextInput
            value={editedTodo.description}
            className="todo-edited-item-description"
            placeholder="Description"
            onChange={(event) =>
              setEditedTodo({
                ...editedTodo,
                description: event.currentTarget.value,
              })
            }
            size="xs"
            variant="unstyled"
            data-testid="editable-todo-description-input"
          />
        ) : (
          <span
            data-testid="todo-description"
            className="todo-item-description"
          >
            {todo.description}
          </span>
        )}
        <div className="todo-item-footer">
          {isEditing && (
            <>
              <ActionIcon
                color="teal"
                onClick={handleSaveClick}
                radius="xl"
                variant="light"
                disabled={editedTodo.title.length === 0}
              >
                <IconDeviceFloppy data-testid="save-todo" size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={handleCancelClick}
                radius="xl"
                variant="light"
              >
                <IconCircleX data-testid="cancel-todo" size="1.125rem" />
              </ActionIcon>
            </>
          )}
          <ActionIcon
            disabled={todo.status === "completed" || isEditing}
            onClick={handleClick}
            radius="xl"
          >
            <IconEdit data-testid="edit-todo" size="1.125rem" />
          </ActionIcon>
          <ActionIcon
            disabled={todo.status === "completed" || isEditing}
            onClick={() => deleteTodo(todo.id)}
            radius="xl"
          >
            <IconTrash data-testid="delete-todo" size="1.125rem" />
          </ActionIcon>
        </div>
      </Card>
    </div>
  );
}

export { TodoItem };
