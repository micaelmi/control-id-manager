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

export default function AccessRulesTable() {
  const { update } = useTimeZoneUpdate();
  const [accessRules, setAccessRules] = useState<AccessRules[]>([]);
  async function getAccessRules() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "access_rules",
      });
      setAccessRules(response.data.access_rules);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAccessRules();
  }, [update]);

  async function confirmAlert(id: number) {
    const access_rules: DeleteResponse | null = await deleteObject(
      "access_rules",
      id
    );
    if (
      access_rules &&
      access_rules.status === 200 &&
      access_rules.data.changes === 1
    ) {
      toast.success("Regra de acesso excluído!", {
        theme: "colored",
      });
      getAccessRules();
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
            <TableHead>Tipo</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessRules.length > 0 ? (
            accessRules.map((access_rule) => (
              <TableRow key={access_rule.id}>
                <TableCell>{access_rule.id}</TableCell>
                <TableCell>{access_rule.name}</TableCell>
                <TableCell>{access_rule.type}</TableCell>
                <TableCell>{access_rule.priority}</TableCell>
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
                          Tem certeza que você deseja excluir esta regra?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => confirmAlert(access_rule.id)}
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
