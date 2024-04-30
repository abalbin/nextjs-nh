-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "usuario" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombres" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asignacion" (
	"id" serial PRIMARY KEY NOT NULL,
	"fecha_entrega" date,
	"id_usuario" integer,
	"id_tarea" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tarea" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(200),
	"descripcion" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asignacion" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asignacion" ADD CONSTRAINT "fk_tarea" FOREIGN KEY ("id_tarea") REFERENCES "public"."tarea"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/