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
import { CheckboxItem, InputItem } from "@/components/form-item";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { FilePlus2Icon } from "lucide-react";
import { useDefaultUpdate } from "@/contexts/default-update-context";

const FormSchema = z.object({
  time_zone_id: z.string(),
  start_hour: z.string(),
  start_min: z.string(),
  end_hour: z.string(),
  end_min: z.string(),
  sun: z.boolean(),
  mon: z.boolean(),
  tue: z.boolean(),
  wed: z.boolean(),
  thu: z.boolean(),
  fri: z.boolean(),
  sat: z.boolean(),
  hol1: z.boolean(),
  hol2: z.boolean(),
  hol3: z.boolean(),
});

export function CreateTimeSpan() {
  const { triggerUpdate } = useDefaultUpdate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      time_zone_id: "0",
      start_hour: "0",
      start_min: "0",
      end_hour: "0",
      end_min: "0",
      sun: true,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      hol1: true,
      hol2: true,
      hol3: true,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const session = Cookies.get("session");
    try {
      // converter tudo em minutos
      const start_time =
        Number(data.start_hour) * 3600 + Number(data.start_min) * 60;
      const end_time = Number(data.end_hour) * 3600 + Number(data.end_min) * 60;
      const response = await api.post(
        `create_objects.fcgi?session=${session}`,
        {
          object: "time_spans",
          values: [
            {
              time_zone_id: Number(data.time_zone_id),
              start: start_time,
              end: end_time,
              sun: data.sun === true ? 1 : 0,
              mon: data.mon === true ? 1 : 0,
              tue: data.tue === true ? 1 : 0,
              wed: data.wed === true ? 1 : 0,
              thu: data.thu === true ? 1 : 0,
              fri: data.fri === true ? 1 : 0,
              sat: data.sat === true ? 1 : 0,
              hol1: data.hol1 === true ? 1 : 0,
              hol2: data.hol2 === true ? 1 : 0,
              hol3: data.hol3 === true ? 1 : 0,
            },
          ],
        }
      );
      if (response.status === 200) {
        toast.success("Intervalo registrado!", {
          theme: "colored",
        });
        form.reset({
          time_zone_id: "",
          start_hour: "0",
          start_min: "0",
          end_hour: "0",
          end_min: "0",
          sun: true,
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: true,
          hol1: true,
          hol2: true,
          hol3: true,
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
          <FilePlus2Icon /> Criar intervalo
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Criar intervalo</SheetTitle>
          <SheetDescription>Cadastre aqui um novo intervalo.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              type="number"
              name="time_zone_id"
              label="ID do horário"
              placeholder="Digite o ID do horário"
            />
            <div className="flex items-end justify-center gap-2">
              <InputItem
                control={form.control}
                type="number"
                name="start_hour"
                label="Hora de início"
                placeholder="00"
              />
              <p className="font-bold text-xl">:</p>
              <InputItem
                control={form.control}
                type="number"
                name="start_min"
                label=""
                placeholder="00"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <InputItem
                control={form.control}
                type="number"
                name="end_hour"
                label="Hora de fim"
                placeholder="00"
              />
              <p className="font-bold text-xl">:</p>
              <InputItem
                control={form.control}
                type="number"
                name="end_min"
                label=""
                placeholder="00"
              />
            </div>
            <div className="flex flex-col gap-2 py-2">
              <p className="text-sm">Dias da semana</p>
              <CheckboxItem control={form.control} name="sun" label="Domingo" />
              <CheckboxItem control={form.control} name="mon" label="Segunda" />
              <CheckboxItem control={form.control} name="tue" label="Terça" />
              <CheckboxItem control={form.control} name="wed" label="Quarta" />
              <CheckboxItem control={form.control} name="thu" label="Quinta" />
              <CheckboxItem control={form.control} name="fri" label="Sexta" />
              <CheckboxItem control={form.control} name="sat" label="Sábado" />
            </div>
            <div className="flex flex-col gap-2 py-2">
              <p className="text-sm">Feriados</p>
              <CheckboxItem control={form.control} name="hol1" label="Tipo 1" />
              <CheckboxItem control={form.control} name="hol2" label="Tipo 2" />
              <CheckboxItem control={form.control} name="hol3" label="Tipo 3" />
            </div>
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
