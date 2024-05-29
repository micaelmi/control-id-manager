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
    message: "Digite o nome da regra.",
  }),
  type: z.string(),
  priority: z.string(),
});

export function CreateAccessRule() {
  const { triggerUpdate } = useDefaultUpdate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
      priority: "0",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    try {
      const response = await api.post(
        `create_objects.fcgi?session=${session}`,
        {
          object: "access_rules",
          values: [
            {
              name: data.name,
              type: Number(data.type),
              priority: Number(data.priority),
            },
          ],
        }
      );
      if (response.status === 200) {
        toast.success("Regra registrada!", {
          theme: "colored",
        });
        form.reset({
          name: "",
          type: "",
          priority: "0",
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
          <FilePlus2Icon /> Criar regra de acesso
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Criar regra de acesso</SheetTitle>
          <SheetDescription>
            Cadastre aqui uma nova regra de acesso.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              name="name"
              label="Nome da regra de acesso"
              placeholder="Digite o nome da regra de acesso"
            />
            <InputItem
              control={form.control}
              type="number"
              name="type"
              label="Tipo"
              placeholder="0 = bloqueio | 1 = permissão"
            />
            <InputItem
              control={form.control}
              type="number"
              name="priority"
              label="Prioridade"
              placeholder="Padrão = 0"
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
