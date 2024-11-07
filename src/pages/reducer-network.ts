"use server";

import { db } from "@/db/connection";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "CLEAR_COMPLETED" };

export async function reducerNetwork(
  state: Todo[],
  action: TodoAction,
): Promise<Todo[]> {
  switch (action.type) {
    case "ADD_TODO": {
      const todo = {
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
      };

      await db.insert(todos).values(todo);

      return [todo, ...state];
    }
    case "TOGGLE_TODO": {
      const todo = state.find((todo) => todo.id === action.payload);

      if (!todo) {
        throw new Error("Todo not found");
      }

      await db
        .update(todos)
        .set({ completed: !todo.completed })
        .where(eq(todos.id, action.payload));

      return state.map((t) =>
        t.id === action.payload ? { ...todo, completed: !todo.completed } : t,
      );
    }
    case "DELETE_TODO": {
      await db.delete(todos).where(eq(todos.id, action.payload));
      return state.filter((todo) => todo.id !== action.payload);
    }
    case "CLEAR_COMPLETED": {
      await db.delete(todos).where(eq(todos.completed, true));
      return state.filter((todo) => !todo.completed);
    }
    default:
      return state;
  }
}
