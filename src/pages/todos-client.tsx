"use client";

import React, { useReducer, useState } from "react";
import {
  PlusCircle,
  CheckCircle2,
  ListTodo,
  Check,
  Circle,
  Trash2,
} from "lucide-react";
import { reducerClient } from "./reducer-client";

export function TodosClient({
  title,
  initialTodos = [],
}: {
  title: string;
  initialTodos: Todo[];
}) {
  const [todos, dispatch] = useReducer(reducerClient, initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo.trim() });
      setNewTodo("");
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <ListTodo className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          <p className="text-gray-600">
            Stay organized, focused, and productive
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusCircle className="h-5 w-5" />
              Add
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {activeTodos.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">Active</h2>
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={(id) =>
                    dispatch({ type: "TOGGLE_TODO", payload: id })
                  }
                  onDelete={(id) =>
                    dispatch({ type: "DELETE_TODO", payload: id })
                  }
                />
              ))}
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Completed
                </h2>
                <button
                  onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Clear completed
                </button>
              </div>
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={(id) =>
                    dispatch({ type: "TOGGLE_TODO", payload: id })
                  }
                  onDelete={(id) =>
                    dispatch({ type: "DELETE_TODO", payload: id })
                  }
                />
              ))}
            </div>
          )}

          {todos.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No todos yet. Add some tasks above!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 focus:outline-none"
      >
        {todo.completed ? (
          <Check className="h-5 w-5 text-emerald-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-400" />
        )}
      </button>

      <span
        className={`flex-grow ${
          todo.completed ? "text-gray-400 line-through" : "text-gray-700"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 transition-opacity focus:opacity-100 focus:outline-none group-hover:opacity-100"
      >
        <Trash2 className="h-5 w-5 text-red-400 hover:text-red-500" />
      </button>
    </div>
  );
}
