import { describe, test } from "vitest";
import { migrateDB } from "../src/dbMigrate";

// Esta prueba no debería estar ya que la migraci´øn se debería realizar mediante un script
describe("pruebas forzadas para realizar una migración de BD", () => {
  test.skip("debe realizar la migración", async () => {
    await migrateDB();
  });
});
