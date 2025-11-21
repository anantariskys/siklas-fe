import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type AdminLoginPayload = {
  username: string;
  password: string;
};

export type AdminLoginResponse = SuccessResponse<{
  user: {
    id: string;
    email: string;
    name: string;
    role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
    username: string;
  };
  token: string;
}>;

/**
 * Fungsi login admin ke Laravel backend
 */
export async function login(
  payload: AdminLoginPayload
): Promise<AdminLoginResponse> {
  try {
    const res = await apiRequest<AdminLoginResponse>(
      "post",
      "/auth/admin-login",
      payload,
      { withAuth: false } // tidak perlu token karena ini untuk login
    );

    if (!res || !res.data) {
      throw new Error("Gagal login ke backend");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat login");
    }
    throw err;
  }
}
