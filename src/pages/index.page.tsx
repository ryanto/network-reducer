import { db } from "@/db/connection";
import { TodosNetwork } from "./todos-network";
import { TodosClient } from "./todos-client";

export default async function Page() {
  const todos = await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });

  return (
    <>
      <title>Network reducer</title>
      <div className="grid grid-cols-2">
        <div>
          <TodosClient title="Client reducer Todos" initialTodos={[]} />
        </div>

        <div>
          <TodosNetwork title="Network reducer Todos" initialTodos={todos} />
        </div>
      </div>
    </>
  );
}
