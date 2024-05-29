"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "react-toastify";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteObject } from "@/lib/delete-item";
import { useDefaultUpdate } from "@/contexts/default-update-context";

export default function TimeSpansTable() {
  const { update } = useDefaultUpdate();
  const [timeSpans, setTimeSpans] = useState<TimeSpans[]>([]);
  async function getTimeSpans() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "time_spans",
      });
      setTimeSpans(response.data.time_spans);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTimeSpans();
  }, [update]);

  async function confirmAlert(id: number) {
    const group: DeleteResponse | null = await deleteObject("time_spans", id);
    if (group && group.status === 200 && group.data.changes === 1) {
      toast.success("Intervalo excluído!", {
        theme: "colored",
      });
      getTimeSpans();
    } else {
      toast.error("Algo deu errado", {
        theme: "colored",
      });
    }
  }

  return (
    <div className="w-full max-h-[60vh] overflow-auto">
      <Table className="w-full border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead>ID</TableHead>
            <TableHead>Id do horário</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>Dias da semana</TableHead>
            <TableHead>Feriados</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSpans.length > 0 ? (
            timeSpans.map((time_span) => (
              <TableRow key={time_span.id}>
                <TableCell>{time_span.id}</TableCell>
                <TableCell>{time_span.time_zone_id}</TableCell>
                <TableCell>{time_span.start}</TableCell>
                <TableCell>{time_span.end}</TableCell>
                <TableCell>
                  {"D " +
                    time_span.sun +
                    " | S " +
                    time_span.mon +
                    " | T " +
                    time_span.tue +
                    " | Q " +
                    time_span.wed +
                    " | Q " +
                    time_span.thu +
                    " | S " +
                    time_span.fri +
                    " | S " +
                    time_span.sat}
                </TableCell>
                <TableCell>
                  {(time_span.hol1, time_span.hol2, time_span.hol3)}
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "aspect-square p-0"
                      )}
                    >
                      <Trash2Icon />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que você deseja excluir este intervalo?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => confirmAlert(time_span.id)}
                        >
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                rowSpan={2}
                colSpan={10}
                className="w-full text-center"
              >
                Nenhum dado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
