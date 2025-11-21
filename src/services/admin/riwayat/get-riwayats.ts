import { apiRequest } from "@/lib/axios";
import { SuccessPaginationResponse } from "@/types/api-response";
import { DatatableQuery } from "@/types/data-table";
import { AxiosError } from "axios";

export type RiwayatItem = {
  id: number;
  user_id: number;
  judul: string;
  abstrak: string;
  prediksi_topik: string;
  confidence_score: number;
  diklasifikasi_pada: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    google_id?: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    provider?: string;
    provider_id?: string | null;
    avatar?: string;
    role: string;
    created_at: string;
    username: string;
    updated_at: string;
  };
};

export type GetRiwayatsResponse = SuccessPaginationResponse<RiwayatItem>;

/**
 * Fungsi untuk mendapatkan daftar user
 */
export async function getRiwayats(
  payload: DatatableQuery = {}
): Promise<GetRiwayatsResponse> {
  try {
    const params = new URLSearchParams();
    if (payload.page) params.append("page", String(payload.page));
    if (payload.limit) params.append("limit", String(payload.limit));
    if (payload.search) params.append("search", payload.search);

    const res = await apiRequest<GetRiwayatsResponse>(
      "get",
      `/admin/riwayat-klasifikasi`,
      undefined,
      {
        withAuth: true,
        config: {
          params: params,
        },
      }
    );

    if (!res || !res.data) {
      throw new Error("Gagal memuat data riwayat klasifikasi");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.message || "Terjadi kesalahan saat memuat data riwayat klasifikasi"
      );
    }
    throw err;
  }
}
