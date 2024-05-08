export default async function UsuarioDetalle({
  params,
}: {
  params: { id: string };
}) {
  return <div>Detalle del usuario {params.id} </div>;
}
