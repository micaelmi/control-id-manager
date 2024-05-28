import api from "@/lib/axios";
import Cookies from "js-cookie";

export async function deleteObject(
  object_type: string,
  object_id: Number
): Promise<DeleteResponse | null> {
  try {
    const session = Cookies.get("session");
    const response: DeleteResponse = await api.post(
      `/destroy_objects.fcgi?session=${session}`,
      {
        object: object_type,
        where: {
          [object_type]: { id: object_id },
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
  obj: string
): Promise<DeleteResponse | null> {
  try {
    const session = Cookies.get("session");
    const response: DeleteResponse = await api.post(
      `/destroy_objects.fcgi?session=${session}`,
      {
        object: obj,
      }
    );
    return response;
  } catch (error) {
    console.error("Erro excluir dado:", error);
    return null;
  }
}
