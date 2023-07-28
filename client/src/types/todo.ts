export type Todo = {
  id: number;
  title: string;
  description: string;
  status: "completed" | "pending";
  userId?: string;
};
