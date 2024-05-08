export type GetUsuarioAsignacionesResponseItem = {
  id_asignacion: number;
  nombre_usuario: string | null;
  fecha_entrega: string | null;
  nombre_tarea: string | null;
  desc_tarea: string | null;
};
export type GetUsuarioAsignacionesResponse = {
  success: boolean;
  data: GetUsuarioAsignacionesResponseItem[];
};
