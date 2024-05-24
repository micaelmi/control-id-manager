import Login from "@/modules/device/login";
import { CreateUser } from "@/modules/users/create-user";
import { ToastContainer } from "react-toastify";
import { UserUpdateProvider } from "@/contexts/user-update-context";
import UserTable from "@/modules/users/user-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <UserUpdateProvider>
      <section className="py-2 flex flex-col justify-center items-start gap-4">
        <Login />
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários</h2>
          <CreateUser />
        </div>
        <UserTable />
        <Link href="/groups" className={buttonVariants({ variant: "default" })}>
          Grupos de acesso
        </Link>
        <ToastContainer />
      </section>
    </UserUpdateProvider>
  );
}
