import sqlClient from "./sqlClient";
/**
 * Esta función va a obntener todos los usuarios de la
 * tabla usuario
 */
export async function seleccionarUsuarios() {
  return await sqlClient`
        select * from usuario
    `;
}
