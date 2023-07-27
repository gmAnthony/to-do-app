import { useState } from "react";
import { Card, Input, Button } from "@mantine/core";

function TodoForm(): JSX.Element {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // POST to /todos when backend is set up
    event.preventDefault();
    console.log(todoTitle, todoDescription);
    setTodoTitle("");
    setTodoDescription("");
  };

  return (
    <div className="todo-form">
      <h2>Add a Task</h2>
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
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
          <Input
            type="description"
            placeholder="Description"
            value={todoDescription}
            onChange={(event) => setTodoDescription(event.target.value)}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Card>
    </div>
  );
}

export { TodoForm };
