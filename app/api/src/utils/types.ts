import fastify from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    verifyJWT: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}
