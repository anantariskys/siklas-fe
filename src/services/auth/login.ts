import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = SuccessResponse<{
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
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await apiRequest<LoginResponse>(
      "post",
      "/auth/login",
      payload,
      { withAuth: false }
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
