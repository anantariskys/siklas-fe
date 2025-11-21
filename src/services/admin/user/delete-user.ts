import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";
import { UserItem } from "./get-users";

export type DeleteUserResponse = SuccessResponse<UserItem>;

/**
 * Fungsi delete user oleh admin ke Laravel backend
 */
export async function deleteUser(userId: string): Promise<DeleteUserResponse> {
  try {
    const res = await apiRequest<DeleteUserResponse>(
      "delete",
      `/admin/user/${userId}`,
      undefined,
      { withAuth: true } // perlu token karena ini untuk menghapus user
    );

    if (!res || !res.data) {
      throw new Error("Gagal menghapus user");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat menghapus user");
    }
    throw err;
  }
}
