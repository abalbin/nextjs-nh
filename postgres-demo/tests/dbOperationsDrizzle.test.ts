import { describe, expect, test } from "vitest";
import { seleccionarUsuarios } from "../src/dbOperationsDrizzle";

describe("pruebas de transacciones a la BD usando Drizzle", () => {
  test("debe retornar más de 1 usuario", async () => {
    const resultado = await seleccionarUsuarios();
    expect(resultado.length).toBe(4);
    expect(resultado[0].otro_nombre).toBe("uan Jesus Orbezo");
  });
});
