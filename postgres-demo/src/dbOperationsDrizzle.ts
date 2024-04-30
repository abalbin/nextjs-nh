import { desc } from "drizzle-orm";
import db from "./db";
import { usuario } from "./schema-introspect";

export async function seleccionarUsuarios() {
  // select nombres from usuario
  const query = db
    .select({ otro_nombre: usuario.nombres })
    .from(usuario)
    .orderBy(desc(usuario.nombres));
  const querySQL = query.toSQL();
  console.log("este es el query de la bd", querySQL.sql);
  return await query;
}
