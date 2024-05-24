import Login from "@/modules/device/login";
import { CreateUser } from "@/modules/users/create-user";
import { ToastContainer } from "react-toastify";
import { UserUpdateProvider } from "@/contexts/user-update-context";
import UserTable from "@/modules/users/user-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Groups() {
  return (
    <section className="py-2 flex flex-col justify-center items-start gap-4">
      <Login />
      <div className="w-full flex justify-between items-end">
        <h2 className="text-xl">Grupos de acesso</h2>
        <CreateGroup />
      </div>
      <GroupTable />
      <Link href="/" className={buttonVariants({ variant: "default" })}>
        Usuários
      </Link>
      <ToastContainer />
    </section>
  );
}
