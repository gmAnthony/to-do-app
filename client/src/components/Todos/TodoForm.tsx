import { useState } from "react";
import { Card, Input, Button } from "@mantine/core";

type TodoFormProps = {
  addTodo: (newTodo: any) => void;
};

function TodoForm({ addTodo }: TodoFormProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({ title, description, status: "pending" });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="todo-form">
      <h2>Add a To-do</h2>
      <Card
        className="auth-form-card"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            type="description"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Card>
    </div>
  );
}

export { TodoForm };
