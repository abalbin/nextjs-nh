import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  text,
} from "drizzle-orm/pg-core";

export const usuario = pgTable("usuario", {
  id: serial("id").primaryKey().notNull(),
  nombres: varchar("nombres", { length: 200 }),
  apellidos: varchar("apellidos", { length: 200 }),
  password: varchar("password", { length: 100 }),
  email: varchar("email", { length: 100 }),
});
export const asignacion = pgTable("asignacion", {
  id: serial("id").primaryKey().notNull(),
  fechaEntrega: date("fecha_entrega"),
  idUsuario: integer("id_usuario").references(() => usuario.id),
  idTarea: integer("id_tarea").references(() => tarea.id),
  comentario: text("comentario"),
  archivo: text("archivo"),
});
export const tarea = pgTable("tarea", {
  id: serial("id").primaryKey().notNull(),
  nombre: varchar("nombre", { length: 200 }),
  descripcion: text("descripcion"),
});
