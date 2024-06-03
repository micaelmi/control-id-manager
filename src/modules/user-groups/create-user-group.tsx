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
  user_id: z.string(),
  group_id: z.string(),
});

export function CreateUserGroup() {
  const { triggerUpdate } = useDefaultUpdate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_id: "",
      group_id: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    try {
      const response = await api.post(
        `create_objects.fcgi?session=${session}`,
        {
          object: "user_groups",
          values: [
            {
              user_id: Number(data.user_id),
              group_id: Number(data.group_id),
            },
          ],
        }
      );
      if (response.status === 200) {
        toast.success("Grupo registrado!", {
          theme: "colored",
        });
        form.reset({
          user_id: "",
          group_id: "",
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
          <FilePlus2Icon /> Criar relação
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Criar relação</SheetTitle>
          <SheetDescription>Relacione um usuário a um grupo.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              type="number"
              name="user_id"
              label="ID do usuário"
              placeholder="Digite o ID do usuário"
            />
            <InputItem
              control={form.control}
              type="number"
              name="group_id"
              label="ID do grupo"
              placeholder="Digite o ID do grupo"
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
