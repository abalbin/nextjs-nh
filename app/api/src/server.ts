import fastify from "fastify";
import usuariosController from "./controllers/usuariosController";

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

// yo quiero la ruta: https://api.empresa.com/usuarios/....
server.register(usuariosController, { prefix: "/usuarios" });

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
