import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import type { Todo } from "../types/todo";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

type makeApiRequestProps = {
  method: RequestMethod;
  endpoint: string;
  body?: Partial<Todo> | Todo["id"];
};

const makeApiRequest = async ({
  method,
  endpoint,
  body,
}: makeApiRequestProps) => {
  const user = auth.currentUser;
  const idToken = user && (await user.getIdToken());

  const options: RequestInit = {
    method: method,
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response: Response = await fetch(endpoint, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  let responseData;
  if (response.status !== 204) {
    responseData = await response.json();
  }
  return responseData;
};

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchTodos = async () => {
      const todos: Todo[] = await makeApiRequest({
        method: "GET",
        endpoint: `${apiEndpoint}todos`,
      });
      if (todos) setTodos(todos);
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo: Todo) => {
    const addedTodo: Todo | undefined = await makeApiRequest({
      method: "POST",
      endpoint: `${apiEndpoint}todos`,
      body: newTodo,
    });
    if (addedTodo) {
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    }
  };

  const deleteTodo = async (id: Todo["id"]) => {
    try {
      await makeApiRequest({
        method: "DELETE",
        endpoint: `${apiEndpoint}todos/${id}`,
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error deleting todo: ${error.message}`);
      } else {
        console.error("Unknown error occurred while deleting todo.");
      }
    }
  };

  const updateTodo = async (id: Todo["id"], updatedTodo: Partial<Todo>) => {
    const updated: Todo | undefined = await makeApiRequest({
      method: "PATCH",
      endpoint: `${apiEndpoint}todos/${id}`,
      body: updatedTodo,
    });
    if (updated) {
      setTodos((prevTodos) => {
        const todoIndex = prevTodos.findIndex((todo) => todo.id === id);
        const newTodos = [...prevTodos];
        newTodos[todoIndex] = updated;
        return newTodos;
      });
    }
  };

  return { todos, addTodo, deleteTodo, updateTodo };
};

export { useTodos };
