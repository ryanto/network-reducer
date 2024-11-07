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

export function reducerClient(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
          createdAt: new Date(),
        },
        ...state,
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}
