import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GroupUpdateProvider } from "@/contexts/group-update-context";
import { CreateGroup } from "@/modules/groups/create-group";
import GroupTable from "@/modules/groups/group-table";
import { CreateUserGroup } from "@/modules/user-groups/create-user-group";
import UserGroupTable from "@/modules/user-groups/user-group-table";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Groups() {
  return (
    <GroupUpdateProvider>
      <section className="py-2 flex flex-col justify-center items-start gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "aspect-square p-0"
          )}
        >
          <ArrowLeft />
        </Link>
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Grupos de acesso</h2>
          <CreateGroup />
        </div>
        <GroupTable />
      </section>
      <section className="py-2 flex flex-col justify-center items-start gap-4">
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários - Grupos</h2>
          <CreateUserGroup />
        </div>
        <UserGroupTable />
      </section>
    </GroupUpdateProvider>
  );
}
