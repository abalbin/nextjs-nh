import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListTodo, User } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

type Response = {
  success: boolean;
  data: Array<{ id: number; nombres: string; apellidos: string }>;
};

// server component
export default async function UsuariosIndex() {
  const token = cookies().get("token");
  console.log("token", token);
  const response = await fetch("http://localhost:3000/usuarios", {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const responseData = (await response.json()) as Response;
  return (
    <div className="p-4">
      <h1 className="text-2xl">Listado de Usuarios</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responseData.data.map((usuario) => {
              return (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombres}</TableCell>
                  <TableCell>{usuario.apellidos}</TableCell>
                  <TableCell>
                    {/* Este es un botón regular */}
                    {/* <Button size="sm">
                      <ListTodo className="w-4 h-4 mr-2" />
                      Ver asignaciones
                    </Button> */}
                    {/* Este es un link con los estilos del componente botón */}
                    <Link
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                      href={`/usuarios/${usuario.id}`}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Link>
                    <Link
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                      href={`/usuarios/${usuario.id}/asignaciones`}
                    >
                      <ListTodo className="w-4 h-4 mr-2" />
                      Ver Asignaciones
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* {responseData.data.map((usuario) => {
          return (
            <div key={usuario.id}>
              Nombre de usuario {usuario.id}: {usuario.nombres}
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
