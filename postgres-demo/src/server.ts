import fastify from "fastify";
import db from "./db";
import { usuario } from "./schema-introspect";
import { eq } from "drizzle-orm";
const server = fastify();

// configuran las rutas
server.get("/", async (request, reply) => {
  console.log("los headers de la solicitud son", request.headers);
  if (request.headers["header-invalido"] === "valor_no_valido") {
    reply.code(400);
    return;
  }
  return { hello: "world 1" };
});

// query string params
// /usuarios?fechaInicio=2024-04-20&fechaHasta=2024-04-30
server.get("/usuarios", async (request, reply) => {
  try {
    const { fechaInicio, fechaHasta } = request.query as {
      fechaInicio: string;
      fechaHasta: string;
    };
    const users = await db.select().from(usuario);
    return {
      success: true,
      data: users,
      queryString: {
        fechaInicio,
        fechaHasta,
      },
    };
  } catch (error) {
    console.error("error al obtener la tabla usuario", error);
    return {
      success: false,
      message: "ocurrió un error, vuelve a intentar en unos minutos",
    };
  }
});
server.get("/usuarios/:id", async (request, reply) => {
  const { id: paramId } = request.params as { id: number };
  const user = await db.select().from(usuario).where(eq(usuario.id, paramId));
  if (!user[0]) {
    reply.code(404);
    return;
  }
  return user[0];
});

type InsertarUsuarioRequest = {
  nombres: string;
};
server.post<{ Body: InsertarUsuarioRequest }>(
  "/usuarios",
  async (request, reply) => {
    const { nombres } = request.body;
    if (!nombres) {
      reply.code(400);
      return;
    }
    const newUser = await db
      .insert(usuario)
      .values({
        nombres,
      })
      .returning({ id: usuario.id });
    return newUser;
  }
);
//   server.put('/usuarios/:id', async (request, reply) => {
//     const { nombre, email } = request.body;
//     const user = await db.update().set({ no
//   mbre, email }).where({ id: request.params.id }).execute
//   ();
//     return user;
//   });
//   server.delete('/usuarios/:id', async (request, reply) =>
//   {
//     await db.delete().where({ id: request.p
//   arams.id }).execute();
//     return { message: 'El usuario ha sido eliminado.' };
//   });

// se inicializa el servidor
server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
