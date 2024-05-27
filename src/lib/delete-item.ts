import api from "@/lib/axios";
import Cookies from "js-cookie";

export async function deleteObject(
  object: string,
  object_id: Number
): Promise<DeleteResponse | null> {
  try {
    const session = Cookies.get("session");
    const response: DeleteResponse = await api.post(
      `/destroy_objects.fcgi?session=${session}`,
      {
        object: object,
        where: {
          object: { id: object_id },
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro excluir dado:", error);
    return null;
  }
}

export async function deleteAllObjects(
  object: string
): Promise<DeleteResponse | null> {
  try {
    const session = Cookies.get("session");
    const response: DeleteResponse = await api.post(
      `/destroy_objects.fcgi?session=${session}`,
      {
        object: object,
      }
    );
    return response;
  } catch (error) {
    console.error("Erro excluir dado:", error);
    return null;
  }
}
