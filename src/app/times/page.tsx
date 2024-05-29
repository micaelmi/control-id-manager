import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import TimeZonesTable from "@/modules/time-zones/time-zone-table";
import { DefaultUpdateProvider } from "@/contexts/default-update-context";
import TimeSpansTable from "@/modules/time-spans/time-span-table";
import AccessRulesTable from "@/modules/access-rules/access-rule-table";
import AccessRuleTimeZonesTable from "@/modules/access-rule-time-zones/access-rule-time-zone-table";
import UserAccessRulesTable from "@/modules/user-access-rules/user-access-rules-table";
import { CreateTimeZone } from "@/modules/time-zones/create-time-zone";
import { CreateTimeSpan } from "@/modules/time-spans/create-time-span";
import { CreateAccessRule } from "@/modules/access-rules/create-access-rule";
import { CreateGroupAccessRule } from "@/modules/group-access-rules/create-group-access-rule";
import GroupAccessRulesTable from "@/modules/group-access-rules/group-access-rules-table";

export default function Times() {
  return (
    <DefaultUpdateProvider>
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
          <h2 className="text-xl">Horários</h2>
          <CreateTimeZone />
        </div>
        <TimeZonesTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Intervalos</h2>
          <CreateTimeSpan />
        </div>
        <TimeSpansTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Regras de acesso</h2>
          <CreateAccessRule />
        </div>
        <AccessRulesTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Grupos - Regras de acesso</h2>
          <CreateGroupAccessRule />
        </div>
        <GroupAccessRulesTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Regras de acesso - Horários</h2>
          {/* <CreateTimeZone /> */}
        </div>
        <AccessRuleTimeZonesTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários - Regras de acesso</h2>
          {/* <CreateTimeZone /> */}
        </div>
        <UserAccessRulesTable />
      </section>
    </DefaultUpdateProvider>
  );
}
