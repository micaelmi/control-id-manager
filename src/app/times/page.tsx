import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import TimeZonesTable from "@/modules/time-zones/time-zone-table";
import { TimeZoneUpdateProvider } from "@/contexts/time-zone-update-context";
import TimeSpansTable from "@/modules/time-spans/time-span-table";
import AccessRulesTable from "@/modules/access-rules/access-rule-table";
import AccessRuleTimeZonesTable from "@/modules/access-rule-time-zones/access-rule-time-zone-table";
import UserAccessRulesTable from "@/modules/user-access-rules/user-access-rules-table";

export default function Times() {
  return (
    <TimeZoneUpdateProvider>
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
          {/* <CreateTimeZone /> */}
        </div>
        <TimeZonesTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Intervalos</h2>
          {/* <CreateTimeZone /> */}
        </div>
        <TimeSpansTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Regras de acesso</h2>
          {/* <CreateTimeZone /> */}
        </div>
        <AccessRulesTable />
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
    </TimeZoneUpdateProvider>
  );
}
