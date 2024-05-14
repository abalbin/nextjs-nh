import { FastifyPluginAsync } from "fastify";
import jwt from "@fastify/jwt";
import db from "../db/drizzle";
import { usuario } from "../db/schema";
import { and, eq } from "drizzle-orm";

type LoginRequest = {
  email: string;
  password: string;
};

const authController: FastifyPluginAsync = async (fastify, options) => {
  // para producción, el secret debería ser una variable de entorno
  fastify.post<{ Body: LoginRequest }>("/login", async (request, reply) => {
    const { email, password } = request.body;
    // validar que el usuario y contraseña sean correctos
    const query = db
      .select()
      .from(usuario)
      .where(and(eq(usuario.email, email), eq(usuario.password, password)));
    const [usuarioDB] = await db.execute(query);
    if (!usuarioDB) {
      reply.status(401);
      return { success: false, message: "Credenciales inválidas" };
    }
    // generar el jwt
    const token = fastify.jwt.sign(
      {
        id: usuarioDB.id,
        email: usuarioDB.email,
      },
      {
        expiresIn: 3600,
      }
    );
    return { success: true, token };
  });
};

export default authController;
