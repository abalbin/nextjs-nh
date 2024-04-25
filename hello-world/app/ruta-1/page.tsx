import { Alert } from "../ui/Alert/Alert";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <Alert mensaje="Este es una alerta info de ejemplo" tipo="info" />
      <Alert mensaje="Este es una alerta error de ejemplo" tipo="error" />
      <Alert mensaje="Este es una alerta exitosa de ejemplo" tipo="exitoso" />
      <div className={styles.texto}>Hola desde la Ruta 1</div>
    </div>
  );
}
