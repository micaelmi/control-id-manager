// POST /create_objects.fcgi
"use client";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

const FormSchema = z.object({
  registration: z.string({ message: "Digite um número" }),
  name: z.string().min(6, {
    message: "Digite o nome completo.",
  }),
  password: z.string().optional(),
});

export function CreateUser() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      registration: "",
      name: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    try {
      const response = await api.post(
        `create_objects.fcgi?session=${session}`,
        {
          object: "users",
          values: [
            {
              registration: data.registration,
              name: data.name,
              password: data.password,
            },
          ],
        }
      );
      if (response.status === 200) {
        toast.success("Usuário registrado!", {
          theme: "colored",
        });
        form.reset({
          registration: "",
          name: "",
        });
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
        <Button variant="outline">Criar usuário</Button>
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
