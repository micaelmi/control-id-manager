// POST /user_set_image.fcgi
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
import { useUserUpdate } from "@/contexts/user-update-context";
import { FilePlus2Icon } from "lucide-react";

const FormSchema = z.object({
  url: z.string().url({ message: "Insira uma URL válida." }),
  file: z.instanceof(File),
});

export function UserSetImage(id: number) {
  const { triggerUpdate } = useUserUpdate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      file: new File([], ""),
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    const timestamp = Date.now();
    try {
      // data.url ==> base64
      // ou
      // data.file ==> base64

      const response = await api.post(
        `user_set_image.fcgi?user_id=${id}&timestamp=${timestamp}&match=0&session=${session}`,
        data,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Usuário registrado!", {
          theme: "colored",
        });
        form.reset({
          url: "",
          file: new File([], ""),
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
          <FilePlus2Icon /> Criar usuário
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Criar usuário</SheetTitle>
          <SheetDescription>
            Cadastre aqui um novo usuário para o sistema.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              type="number"
              name="registration"
              label="Número de registro"
              placeholder="Digite o número de registro do usuário"
            />
            <InputItem
              control={form.control}
              name="name"
              label="Nome completo"
              placeholder="Digite o nome do usuário"
            />
            <InputItem
              control={form.control}
              type="number"
              name="password"
              label="Senha"
              placeholder="Digite uma senha numérica para o usuário"
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
