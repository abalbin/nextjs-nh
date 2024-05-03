import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const pgClient = postgres({
  host: "localhost",
  port: 5432,
  database: "test_db",
  username: "postgres",
  password: "mysecretpassword",
});
const db = drizzle(pgClient);
export default db;
