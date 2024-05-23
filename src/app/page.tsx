import Login from "@/modules/device/login";
import { CreateUser } from "@/modules/users/create-user";
import ListUsers from "@/modules/users/list-users";
import { ToastContainer } from "react-toastify";
import { UserUpdateProvider } from "@/contexts/user-update-context";
import UserTable from "@/modules/users/user-table";

export default function Home() {
  return (
    <UserUpdateProvider>
      <section className="py-2 flex flex-col justify-center items-start gap-4">
        <Login />
        {/* <ListUsers /> */}
        <div className="w-full flex justify-between items-end">
          <h2 className="text-xl">Usuários</h2>
          <CreateUser />
        </div>
        <UserTable />
        <ToastContainer />
      </section>
    </UserUpdateProvider>
  );
}
