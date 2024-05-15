import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  async function onLogin(formData: FormData) {
    "use server";
    // obtener los valores de los inputs
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // enviar los datos al servidor
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let data;
    if (response.ok) {
      data = await response.json();
    } else {
      throw new Error("Error en la petición");
    }

    console.log("response", data);
    // guardar el token en el local storage
    cookies().set("token", data.token);
    // redirigir
    redirect("/usuarios");
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        className="flex flex-col items-center justify-center w-full h-full"
        action={onLogin}
      >
        <input
          type="text"
          placeholder="Email"
          className="w-1/2 p-2 m-2 border border-gray-300 rounded-lg"
          id="email"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-1/2 p-2 m-2 border border-gray-300 rounded-lg"
          id="password"
          name="password"
        />
        <button
          type="submit"
          className="w-1/2 p-2 m-2 border border-gray-300 rounded-lg"
        >
          Login
        </button>
      </form>
      {/* {mensaje && <p className="text-red-500">{mensaje}</p>} */}
    </div>
  );
}
