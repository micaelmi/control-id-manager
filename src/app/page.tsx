import Login from "@/modules/device/login";
import { CreateUser } from "@/modules/users/create-user";
import ListUsers from "@/modules/users/list-users";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <section className="py-2">
      <Login />
      <ListUsers />
      <CreateUser />
      <ToastContainer />
    </section>
  );
}
