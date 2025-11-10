import { apiRequest } from "@/lib/axios";
import { ErrorResponse, SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type SocialLoginPayload = {
  google_id: string;
  email: string;
  name: string;
  avatar?: string;
};

export type SocialLoginResponse = SuccessResponse<{
  user: {
    google_id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
}>;

/**
 * Fungsi login/register ke Laravel backend via social login
 */
export async function socialLogin(
  payload: SocialLoginPayload
): Promise<SocialLoginResponse> {
  try {
    const res = await apiRequest<SocialLoginResponse>(
      "post",
      "/auth/social-login",
      payload,
      { withAuth: false } // tidak perlu token karena ini untuk login
    );

    if (!res || !res.data) {
      throw new Error("Gagal login ke backend");
    }

    return res;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Social login error:", err.message);
      throw new Error(err.message || "Terjadi kesalahan saat login");
    }
    throw err;
  }
}
