import fastify from "fastify";
import cors from "@fastify/cors";

import usuariosController from "./controllers/usuariosController";
import asignacionesController from "./controllers/asignacionesController";
import authController from "./controllers/authController";
import jwt from "@fastify/jwt";

const server = fastify({
  logger: {
    // esto es para mostrar el nivel del error en texto y no como código
    // más info: https://fastify.dev/docs/v2.15.x/Documentation/Logging/#log-redaction
    formatters: {
      level: (label) => {
        return {
          level: label,
        };
      },
    },
  },
});

server.register(jwt, { secret: "supersecret" });

server.decorate("verifyJWT", function (request, reply) {
  // esperamos un header Authotization con el token que tenga el formato "Bearer <token>"
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    reply.code(401).send({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    this.jwt.verify(token);
  } catch (error) {
    console.error(error);
    reply.code(401).send({ success: false, message: "Unauthorized" });
    return;
  }
});

// configurar CORS
server.register(cors, {
  origin: "*", // esto es para permitir cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE"], // estos son los métodos permitidos
});

// yo quiero la ruta: https://api.empresa.com/usuarios/....
server.register(usuariosController, { prefix: "/usuarios" });

server.register(asignacionesController, { prefix: "/asignaciones" });

server.register(authController, { prefix: "/auth" });

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
