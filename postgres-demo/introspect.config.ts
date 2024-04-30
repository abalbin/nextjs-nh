import type { Config } from "drizzle-kit";
export default {
  schema: "./src/schema/*",
  out: "./drizzle-introspect",
  driver: "pg",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    database: "test_db",
    user: "postgres",
    password: "mysecretpassword",
  },
} satisfies Config;
