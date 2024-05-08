import { AsignacionesTable } from "./asignaciones-table";
import { GetUsuarioAsignacionesResponse } from "../../../../../shared/types";

export default async function UsuarioAsignaciones({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `http://localhost:3000/usuarios/${params.id}/asignaciones`,
    {
      cache: "no-cache",
    }
  );
  const responseData =
    (await response.json()) as GetUsuarioAsignacionesResponse;
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Asignaciones del usuario {params.id}
      </h1>
      <AsignacionesTable data={responseData.data} />
    </div>
  );
}
