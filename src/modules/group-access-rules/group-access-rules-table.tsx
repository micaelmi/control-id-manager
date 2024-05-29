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

export default function GroupAccessRulesTable() {
  const { update } = useDefaultUpdate();
  const [groupAccessRules, setGroupAccessRules] = useState<GroupAccessRules[]>(
    []
  );
  async function getGroupAccessRules() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "group_access_rules",
      });
      setGroupAccessRules(response.data.group_access_rules);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getGroupAccessRules();
  }, [update]);

  return (
    <div className="w-full max-h-[60vh] overflow-auto">
      <Table className="w-full border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead>ID do grupo</TableHead>
            <TableHead>ID da regra de acesso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupAccessRules.length > 0 ? (
            groupAccessRules.map((item) => (
              <TableRow key={item.access_rule_id + item.group_id}>
                <TableCell>{item.group_id}</TableCell>
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
