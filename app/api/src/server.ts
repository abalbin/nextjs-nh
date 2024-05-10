import fastify from "fastify";
import cors from "@fastify/cors";

import usuariosController from "./controllers/usuariosController";
import asignacionesController from "./controllers/asignacionesController";

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

// configurar CORS
server.register(cors, {
  origin: "*", // esto es para permitir cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE"], // estos son los métodos permitidos
});

// yo quiero la ruta: https://api.empresa.com/usuarios/....
server.register(usuariosController, { prefix: "/usuarios" });

server.register(asignacionesController, { prefix: "/asignaciones" });

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
