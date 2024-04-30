import { drizzle } from "drizzle-orm/postgres-js";
import sqlClient from "./sqlClient";

const db = drizzle(sqlClient);

export default db;
