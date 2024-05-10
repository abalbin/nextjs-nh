import { FastifyPluginAsync } from "fastify";
import jwt from "@fastify/jwt";

type LoginRequest = {
  email: string;
  password: string;
};

const authController: FastifyPluginAsync = async (fastify, options) => {
  // para producción, el secret debería ser una variable de entorno
  fastify.register(jwt, { secret: "supersecret" });
  fastify.post<{ Body: LoginRequest }>("/login", async (request, reply) => {
    const { email, password } = request.body;
    // generar el jwt
    const token = fastify.jwt.sign({ email });
    return { success: true, token };
  });
};

export default authController;
