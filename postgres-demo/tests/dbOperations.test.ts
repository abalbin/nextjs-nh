import { describe, expect, test } from "vitest";
import { seleccionarUsuarios } from "../src/dbOperations";

describe("pruebas de transacciones a la BD", () => {
  test("debe retornar más de 1 usuario", async () => {
    const resultado = await seleccionarUsuarios();
    expect(resultado.count).toBe(4);
  });
});
