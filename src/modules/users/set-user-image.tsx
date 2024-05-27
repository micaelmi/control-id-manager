// POST /user_set_image.fcgi
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { FolderCheck, ImageUp, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FormSchema = z.object({
  url: z.string(),
  file: z.instanceof(File),
});

export function UserSetImage({ id }: { id: number }) {
  const { triggerUpdate } = useUserUpdate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      file: new File([], ""),
    },
  });

  const [base64, setBase64] = useState<string | null>(null);
  const [fileStatus, setFileStatus] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    const timestamp = ~~(Date.now() / 1000);
    try {
      // Base64 conversion
      const url = data.url;
      const file = data.file;
      if (url.length > 10) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64(reader.result as string);
            // console.log("URL -> Base 64");
            // console.log(reader.result);
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      } else if (file instanceof File && file.size > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64(reader.result as string);
          // console.log("File -> Base 64");
          // console.log(reader.result);
        };
        reader.readAsDataURL(file);
      }

      const response = await api.post(
        `user_set_image.fcgi?user_id=${id}&timestamp=${timestamp}&match=0&session=${session}`,
        data.file,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Foto registrada!", {
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
        <Button variant={"ghost"} className="aspect-square p-0">
          <ImageUp />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Definir imagem</SheetTitle>
          <SheetDescription>
            Cadastre aqui uma foto para o usuário {id}.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              name="url"
              label="Link da foto"
              placeholder="Digite o link da foto do usuário"
            />
            <p className="pb-4">ou</p>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="w-full items-center justify-center flex gap-4 border border-dashed rounded-lg py-4 cursor-pointer transition-colors hover:bg-card-foreground/10 hover:border-card">
                    {fileStatus ? (
                      <>
                        <FolderCheck />
                        <p>Arquivo selecionado</p>
                      </>
                    ) : (
                      <>
                        <Upload />
                        <p>Selecione um arquivo</p>
                      </>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null,
                          setFileStatus(true)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="pt-8">
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
