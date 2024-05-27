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

export default function UserAccessRulesTable() {
  const { update } = useTimeZoneUpdate();
  const [userAccessRules, setUserAccessRules] = useState<UserAccessRules[]>([]);
  async function getUserAccessRules() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "user_access_rules",
      });
      setUserAccessRules(response.data.user_access_rules);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserAccessRules();
  }, [update]);

  async function confirmAlert(id: number) {
    const user_access_rules: DeleteResponse | null = await deleteObject(
      "user_access_rules",
      id
    );
    if (
      user_access_rules &&
      user_access_rules.status === 200 &&
      user_access_rules.data.changes === 1
    ) {
      toast.success("Regra de acesso excluído!", {
        theme: "colored",
      });
      getUserAccessRules();
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
            <TableHead>Id do usuário</TableHead>
            <TableHead>Id da regra de acesso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userAccessRules.length > 0 ? (
            userAccessRules.map((item) => (
              <TableRow key={item.access_rule_id + item.user_id}>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.access_rule_id}</TableCell>
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
