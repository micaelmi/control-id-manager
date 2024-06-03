import { CreateUser } from "@/modules/users/create-user";
import { DefaultUpdateProvider } from "@/contexts/default-update-context";
import UserTable from "@/modules/users/user-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CreateGroup } from "@/modules/groups/create-group";
import GroupTable from "@/modules/groups/group-table";
import { CreateUserGroup } from "@/modules/user-groups/create-user-group";
import UserGroupTable from "@/modules/user-groups/user-group-table";
import { CreateTimeZone } from "@/modules/time-zones/create-time-zone";
import TimeZonesTable from "@/modules/time-zones/time-zone-table";
import { CreateTimeSpan } from "@/modules/time-spans/create-time-span";
import TimeSpansTable from "@/modules/time-spans/time-span-table";
import { CreateAccessRule } from "@/modules/access-rules/create-access-rule";
import AccessRulesTable from "@/modules/access-rules/access-rule-table";
import { CreateGroupAccessRule } from "@/modules/group-access-rules/create-group-access-rule";
import GroupAccessRulesTable from "@/modules/group-access-rules/group-access-rules-table";
import AccessRuleTimeZonesTable from "@/modules/access-rule-time-zones/access-rule-time-zone-table";
import UserAccessRulesTable from "@/modules/user-access-rules/user-access-rules-table";

export default function Home() {
  return (
    <DefaultUpdateProvider>
      <section className="py-2 flex flex-col justify-center items-start gap-4">
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários</h2>
          <CreateUser />
        </div>
        <UserTable />
        {/* <div className="flex items-center gap-4">
          <Link
            href="/groups"
            className={buttonVariants({ variant: "default" })}
          >
            Grupos de acesso
          </Link>
          <Link
            href="/times"
            className={buttonVariants({ variant: "default" })}
          >
            Horários
          </Link>
        </div> */}
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Grupos de acesso</h2>
          <CreateGroup />
        </div>
        <GroupTable />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários - Grupos</h2>
          <CreateUserGroup />
        </div>
        <UserGroupTable />
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
