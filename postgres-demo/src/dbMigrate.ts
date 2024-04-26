import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export async function migrateDB() {
  const sql = postgres({
    host: "localhost",
    port: 5432,
    database: "test_db_1",
    username: "postgres",
    password: "mysecretpassword",
    max: 1,
  });
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: "drizzle" });
  await sql.end();
}
