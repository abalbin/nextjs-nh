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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Completar la tarea</DialogTitle>
        </DialogHeader>
        <CompletarAsignacionForm />
        <DialogFooter>
          <Button>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
