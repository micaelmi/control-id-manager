"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { InputItem } from "@/components/form-item";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { FilePlus2Icon } from "lucide-react";
import { useDefaultUpdate } from "@/contexts/default-update-context";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Digite o nome do horário.",
  }),
});

export function CreateTimeZone() {
  const { triggerUpdate } = useDefaultUpdate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    try {
      const response = await api.post(
        `create_objects.fcgi?session=${session}`,
        {
          object: "time_zones",
          values: [
            {
              name: data.name,
            },
          ],
        }
      );
      if (response.status === 200) {
        toast.success("Horário registrado!", {
          theme: "colored",
        });
        form.reset({
          name: "",
        });
        triggerUpdate();
      }
    } catch (error) {
      toast.error("Erro ao registrar", {
        theme: "colored",
      });
      console.error("Erro:", error);
      throw error;
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-2">
          <FilePlus2Icon /> Criar horário
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Criar horário</SheetTitle>
          <SheetDescription>Cadastre aqui um novo horário.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              name="name"
              label="Nome do horário"
              placeholder="Digite o nome do horário"
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="w-full">
                  Salvar
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
