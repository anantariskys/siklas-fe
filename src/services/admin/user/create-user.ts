import { apiRequest } from "@/lib/axios";
import { CreateUserPayload } from "@/schemas/user";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type AdminLoginResponse = SuccessResponse<{
  id: string;
  email: string;
  name: string;
  role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
  username: string;
}>;

/**
 * Fungsi untuk membuat user oleh admin ke Laravel backend
 */
export async function createUser(
  payload: CreateUserPayload
): Promise<AdminLoginResponse> {
  try {
    const res = await apiRequest<AdminLoginResponse>(
      "post",
      "/admin/user",
      payload,
      { withAuth: true } // perlu token karena ini untuk membuat user
    );

    if (!res || !res.data) {
      throw new Error("Gagal membuat user");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat membuat user");
    }
    throw err;
  }
}
