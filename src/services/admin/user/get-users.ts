import { apiRequest } from "@/lib/axios";
import { RoleFilter } from "@/modules/admin/user";
import { SuccessPaginationResponse } from "@/types/api-response";
import { DatatableQuery } from "@/types/data-table";
import { AxiosError } from "axios";

export type UserItem = {
  id: string;
  google_id?: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  provider?: string;
  provider_id?: string | null;
  avatar?: string;
  role: string;
  username: string;
  created_at: string;
  updated_at: string;
};

export type GetUsersResponse = SuccessPaginationResponse<UserItem>;

/**
 * Fungsi untuk mendapatkan daftar user
 */
export async function getUsers(
  payload: DatatableQuery & { role?: RoleFilter } = {}
): Promise<GetUsersResponse> {
  try {
    const params = new URLSearchParams();
    if (payload.page) params.append("page", String(payload.page));
    if (payload.limit) params.append("limit", String(payload.limit));
    if (payload.search) params.append("search", payload.search);
    if (payload.role) params.append("role", payload.role);

    const res = await apiRequest<GetUsersResponse>(
      "get",
      `/admin/user`,
      undefined,
      {
        withAuth: true,
        config: {
          params: params,
        },
      }
    );

    if (!res || !res.data) {
      throw new Error("Gagal memuat data user");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat memuat data user");
    }
    throw err;
  }
}
