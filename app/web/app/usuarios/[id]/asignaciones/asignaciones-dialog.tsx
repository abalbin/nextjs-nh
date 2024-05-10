import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CompletarAsignacionForm } from "./completar-asignacion-form";

export function AsignacionesDialog({
  open,
  setOpen,
  idAsignacion,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  idAsignacion: number;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Completar la asignación con ID {idAsignacion}
          </DialogTitle>
        </DialogHeader>
        <CompletarAsignacionForm idAsignacion={idAsignacion} />
      </DialogContent>
    </Dialog>
  );
}
