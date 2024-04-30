import { pgTable, serial, varchar, foreignKey, date, integer, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const usuario = pgTable("usuario", {
	id: serial("id").primaryKey().notNull(),
	nombres: varchar("nombres", { length: 200 }),
});

export const asignacion = pgTable("asignacion", {
	id: serial("id").primaryKey().notNull(),
	fechaEntrega: date("fecha_entrega"),
	idUsuario: integer("id_usuario").references(() => usuario.id),
	idTarea: integer("id_tarea").references(() => tarea.id),
});

export const tarea = pgTable("tarea", {
	id: serial("id").primaryKey().notNull(),
	nombre: varchar("nombre", { length: 200 }),
	descripcion: text("descripcion"),
});