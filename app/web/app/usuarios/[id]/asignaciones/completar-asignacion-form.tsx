"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  comentario: z
    .string()
    .min(20, "Ingresa un comentario de al menos 20 caracteres"),
  fecha_entrega: z.date({
    required_error: "Ingresa una fecha de entrega",
    invalid_type_error: "Ingresa una fecha válida",
  }),
  archivo: z.instanceof(FileList),
});

export const CompletarAsignacionForm = ({
  idAsignacion,
}: {
  idAsignacion: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comentario: "",
    },
  });

  const fileRef = form.register("archivo");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { comentario, fecha_entrega, archivo } = values;
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(archivo[0] as File);
    });

    const request = { comentario, fecha_entrega, archivo: base64 };

    await fetch(
      `http://localhost:3000/asignaciones/${idAsignacion}/completar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );
  }
  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="comentario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentario</FormLabel>
              <FormControl>
                <Textarea placeholder="ingresa un comentario" {...field} />
              </FormControl>
              <FormDescription>
                Este es el comentario que verá el profesor
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="archivo"
          render={() => (
            <FormItem>
              <FormLabel>Archivo de Sutento</FormLabel>
              <FormControl>
                <Input
                  {...fileRef}
                  placeholder="selecciona un archivo"
                  type="file"
                />
              </FormControl>
              <FormDescription>
                Este es el comentario que verá el profesor
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_entrega"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de entrega</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
};
