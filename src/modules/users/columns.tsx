"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/column";
import { Trash } from "lucide-react";
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
import { deleteUser } from "./actions/delete";
import { useUserUpdate } from "@/contexts/user-update-context";
import { toast } from "react-toastify";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "registration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registro" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "password",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Senha" />
    ),
  },
  {
    accessorKey: "salt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salt" />
    ),
  },
  {
    accessorKey: "user_type_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    accessorKey: "begin_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de início" />
    ),
  },
  {
    accessorKey: "end_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de fim" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const id = user.id;

      async function confirm(id: number) {
        const { triggerUpdate } = useUserUpdate();
        const user: UserResponse | null = await deleteUser(id);
        console.log(user);
        if (user && user.status === 200 && user.data.changes === 1) {
          toast.success("Usuário excluído!", {
            theme: "colored",
          });
          triggerUpdate();
        } else {
          toast.error("Algo deu errado", {
            theme: "colored",
          });
        }
      }

      return (
        <>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que você deseja excluir este usuário?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => confirm(id)}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
