import { apiRequest } from "@/lib/axios";
import { UpdateUserPayload } from "@/schemas/user";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type UpdateUserResponse = SuccessResponse<{
  id: string;
  email: string;
  name: string;
  role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
  username: string;
}>;

/**
 * Fungsi untuk memperbarui data user oleh admin ke Laravel backend
 */
export async function updateUser(
  payload: UpdateUserPayload,
  id: string
): Promise<UpdateUserResponse> {
  try {
    const res = await apiRequest<UpdateUserResponse>(
      "put",
      `/admin/user/${id}`,
      payload,
      { withAuth: true } // perlu token karena ini untuk memperbarui user
    );

    if (!res || !res.data) {
      throw new Error("Gagal memperbarui user");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat memperbarui user");
    }
    throw err;
  }
}
