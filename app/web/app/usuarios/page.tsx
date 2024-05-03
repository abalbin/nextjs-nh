type Response = {
  success: boolean;
  data: Array<{ id: number; nombres: string }>;
};

// server component
export default async function UsuariosIndex() {
  const response = await fetch("http://localhost:3000/usuarios", {
    cache: "no-cache",
  });
  const responseData = (await response.json()) as Response;
  return (
    <div className="p-4">
      <h1 className="text-2xl">Listado de Usuarios</h1>
      <div>
        {responseData.data.map((usuario) => {
          return (
            <div key={usuario.id}>
              Nombre de usuario {usuario.id}: {usuario.nombres}
            </div>
          );
        })}
      </div>
    </div>
  );
}
