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
import { useTimeZoneUpdate } from "@/contexts/time-zone-update-context";

export default function TimeZonesTable() {
  const { update } = useTimeZoneUpdate();
  const [timeZones, setTimeZones] = useState<TimeZones[]>([]);
  async function getTimeZones() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "time_zones",
      });
      setTimeZones(response.data.time_zones);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTimeZones();
  }, [update]);

  async function confirmAlert(id: number) {
    const group: DeleteResponse | null = await deleteObject("time_zones", id);
    if (group && group.status === 200 && group.data.changes === 1) {
      toast.success("Horário excluído!", {
        theme: "colored",
      });
      getTimeZones();
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
            <TableHead>Nome</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeZones.length > 0 ? (
            timeZones.map((time_zone) => (
              <TableRow key={time_zone.id}>
                <TableCell>{time_zone.id}</TableCell>
                <TableCell>{time_zone.name}</TableCell>
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
                          Tem certeza que você deseja excluir este horário?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => confirmAlert(time_zone.id)}
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
