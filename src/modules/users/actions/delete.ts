import api from "@/lib/axios";
import Cookies from "js-cookie";

export async function deleteUser(userId: Number): Promise<UserResponse | null> {
  try {
    const session = Cookies.get("session");
    const response: UserResponse = await api.post(
      `/destroy_objects.fcgi?session=${session}`,
      {
        object: "users",
        where: {
          users: { id: userId },
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro excluir dado:", error);
    return null;
  }
}
