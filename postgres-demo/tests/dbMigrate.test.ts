import { describe, test } from "vitest";
import { migrateDB } from "../src/dbMigrate";

describe("pruebas forzadas para realizar una migración de BD", () => {
  test("debe realizar la migración", async () => {
    await migrateDB();
  });
});
