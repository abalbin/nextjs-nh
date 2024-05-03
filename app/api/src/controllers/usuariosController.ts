import { FastifyPluginAsync } from "fastify";
import db from "../db/drizzle";
import { asignacion, tarea, usuario } from "../db/schema";
import { eq } from "drizzle-orm";

// Ruta: /usuarios
const usuariosController: FastifyPluginAsync = async (fastify, options) => {
  // Ruta final: GET /usuarios/
  fastify.get("/", async (request, reply) => {
    const users = await db.select().from(usuario).orderBy(usuario.id);
    return {
      success: true,
      data: users,
    };
  });

  // Ruta final: GET /usuarios/:id/asignaciones
  fastify.get<{ Params: { id: number } }>(
    "/:id/asignaciones",
    async (request, reply) => {
      const query = db
        .select({
          id_asignacion: asignacion.id,
          nombre_usuario: usuario.nombres,
          fecha_entrega: asignacion.fechaEntrega,
          nombre_tarea: tarea.nombre,
          desc_tarea: tarea.descripcion,
        })
        .from(asignacion)
        .leftJoin(usuario, eq(asignacion.idUsuario, usuario.id))
        .leftJoin(tarea, eq(asignacion.idTarea, tarea.id))
        .where(eq(asignacion.idUsuario, request.params.id));
      return {
        success: true,
        data: await query,
      };
    }
  );
};
export default usuariosController;
