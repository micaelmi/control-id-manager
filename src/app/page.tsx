import { CreateUser } from "@/modules/users/create-user";
import { UserUpdateProvider } from "@/contexts/user-update-context";
import UserTable from "@/modules/users/user-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <UserUpdateProvider>
      <section className="py-2 flex flex-col justify-center items-start gap-4">
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários</h2>
          <CreateUser />
        </div>
        <UserTable />
        <div className="flex items-center gap-4">
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
        </div>
      </section>
    </UserUpdateProvider>
  );
}
