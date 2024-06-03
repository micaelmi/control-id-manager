"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useDefaultUpdate } from "@/contexts/default-update-context";
import {
  Table,
  TableBody,
  TableCaption,
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
import { UserSetImage } from "./set-user-image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteObject } from "@/lib/delete-item";

export default function UserTable() {
  const { update } = useDefaultUpdate();
  const [users, setUsers] = useState<User[]>([]);
  async function getUsers() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "users",
      });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, [update]);

  async function confirmAlert(id: number) {
    const user: DeleteResponse | null = await deleteObject("users", id);
    if (user && user.status === 200 && user.data.changes === 1) {
      toast.success("Usuário excluído!", {
        theme: "colored",
      });
      getUsers();
    } else {
      toast.error("Algo deu errado", {
        theme: "colored",
      });
    }
  }

  return (
    <div className="w-full max-h-[58vh] overflow-auto">
      <Table className="w-full border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead>ID</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead>Salt</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data de início</TableHead>
            <TableHead>Data de fim</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.registration ? user.registration : "-"}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.password ? user.password : "-"}</TableCell>
                <TableCell>{user.salt ? user.salt : "-"}</TableCell>
                <TableCell>
                  {user.user_type_id ? user.user_type_id : "padrão"}
                </TableCell>
                <TableCell>
                  {user.begin_time ? user.begin_time : "indefinida"}
                </TableCell>
                <TableCell>
                  {user.end_time ? user.end_time : "indefinida"}
                </TableCell>
                <TableCell>
                  <UserSetImage id={user.id} />
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
                          Tem certeza que você deseja excluir este usuário?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => confirmAlert(user.id)}
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
