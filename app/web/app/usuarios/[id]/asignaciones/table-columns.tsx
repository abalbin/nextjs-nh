"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GetUsuarioAsignacionesResponseItem } from "../../../../../shared/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type Param = {
  abrirDialogo: (id_asignacion: number) => void;
};

export function getColumns({
  abrirDialogo,
}: Param): ColumnDef<GetUsuarioAsignacionesResponseItem>[] {
  return [
    {
      header: "Tarea",
      accessorKey: "nombre_tarea",
    },
    {
      header: "Descripción",
      accessorKey: "desc_tarea",
    },
    {
      header: "Fecha de entrega",
      accessorKey: "fecha_entrega",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const asignacion = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    asignacion.id_asignacion.toString()
                  )
                }
              >
                Copiar el ID de la asignación
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => abrirDialogo(asignacion.id_asignacion)}
              >
                Completar la tarea
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
