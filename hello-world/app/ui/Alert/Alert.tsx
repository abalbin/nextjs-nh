import clsx from "clsx";

type Props = {
  mensaje: string;
  tipo: "error" | "exitoso" | "info";
};

export function Alert({ mensaje, tipo }: Props) {
  return (
    <div
      className={clsx([
        "border-2 p-2",
        { "border-sky-500 text-sky-600": tipo === "info" },
        { "border-red-500 text-red-600": tipo === "error" },
        { "border-green-500 text-green-600": tipo === "exitoso" },
      ])}
    >
      {mensaje}
    </div>
  );
}
