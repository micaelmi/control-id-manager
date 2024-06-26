"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Cookies from "js-cookie";
import { useUserUpdate } from "@/contexts/user-update-context";

export default function ListUsers() {
  const { update } = useUserUpdate();
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
  // console.log("DATA: ", data);
  return (
    <div className="my-4">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
