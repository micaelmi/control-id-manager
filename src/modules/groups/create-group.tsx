// POST /create_objects.fcgi
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
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { FilePlus2Icon } from "lucide-react";
import { useGroupUpdate } from "@/contexts/group-update-context";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Digite o nome do grupo.",
  }),
});

export function CreateGroup() {
  const { triggerUpdate } = useGroupUpdate();
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
          object: "groups",
          values: [
            {
              name: data.name,
            },
          ],
        }
      );
      if (response.status === 200) {
        toast.success("Grupo registrado!", {
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
          <FilePlus2Icon /> Criar grupo
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Criar grupo</SheetTitle>
          <SheetDescription>
            Cadastre aqui um novo grupo de usuários.
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
              label="Nome do grupo"
              placeholder="Digite o nome do grupo"
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
