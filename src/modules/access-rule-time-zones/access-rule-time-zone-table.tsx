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

export default function AccessRuleTimeZonesTable() {
  const { update } = useDefaultUpdate();
  const [accessRuleTimeZones, setAccessRuleTimeZones] = useState<
    AccessRuleTimeZones[]
  >([]);
  async function getAccessRuleTimeZones() {
    const session = Cookies.get("session");
    try {
      const response = await api.post(`load_objects.fcgi?session=${session}`, {
        object: "access_rule_time_zones",
      });
      setAccessRuleTimeZones(response.data.access_rule_time_zones);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAccessRuleTimeZones();
  }, [update]);

  async function confirmAlert(id: number) {
    const access_rule_time_zones: DeleteResponse | null = await deleteObject(
      "access_rule_time_zones",
      id
    );
    if (
      access_rule_time_zones &&
      access_rule_time_zones.status === 200 &&
      access_rule_time_zones.data.changes === 1
    ) {
      toast.success("Regra de acesso excluído!", {
        theme: "colored",
      });
      getAccessRuleTimeZones();
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
            <TableHead>Id da regra de acesso</TableHead>
            <TableHead>Id do horário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessRuleTimeZones.length > 0 ? (
            accessRuleTimeZones.map((item) => (
              <TableRow key={item.access_rule_id + item.time_zone_id}>
                <TableCell>{item.access_rule_id}</TableCell>
                <TableCell>{item.time_zone_id}</TableCell>
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
