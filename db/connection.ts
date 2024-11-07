import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db = drizzle("file:./db/todos.sqlite3", { schema });
