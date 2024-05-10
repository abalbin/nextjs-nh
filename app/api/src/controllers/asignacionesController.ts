import { FastifyPluginAsync } from "fastify";
import { CompletarAsignacionRequest } from "../../../shared/types";
import db from "../db/drizzle";
import { and, eq } from "drizzle-orm";
import { asignacion } from "../db/schema";

const asignacionesController: FastifyPluginAsync = async (fastify, options) => {
  fastify.post<{ Body: CompletarAsignacionRequest; Params: { id: number } }>(
    "/:id/completar",
    async (request, reply) => {
      const { id } = request.params;
      const { comentario, fecha_entrega, archivo } = request.body;
      await db
        .update(asignacion)
        .set({ comentario, fechaEntrega: fecha_entrega, archivo })
        .where(and(eq(asignacion.id, id)));
      return { success: true };
    }
  );
};

export default asignacionesController;
