import { apiRequest } from "@/lib/axios";
import { SuccessPaginationResponse } from "@/types/api-response";
import { DatatableQuery } from "@/types/data-table";
import { AxiosError } from "axios";

export type GetRiwayatByUserPayload = {
  userId: string;
};

export type RiwayatItem = {
  id: string;
  user_id: string | null;
  judul: string | null;
  abstrak: string | null;
  prediksi_topik: string;
  confidence_score: number | null;
  diklasifikasi_pada: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

export type GetRiwayatByUserResponse = SuccessPaginationResponse<RiwayatItem>;

/**
 * Fungsi untuk mendapatkan riwayat klasifikasi berdasarkan user
 */
export async function getRiwayatByUser(
  payload: GetRiwayatByUserPayload,
  query: DatatableQuery = {}
): Promise<GetRiwayatByUserResponse> {
  const params = new URLSearchParams();
  if (query.page) params.append("page", String(query.page));
  if (query.limit) params.append("limit", String(query.limit));
  if (query.search) params.append("search", query.search);
  try {
    const res = await apiRequest<GetRiwayatByUserResponse>(
      "get",
      `/riwayat-klasifikasi`,
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
        err.message || "Terjadi kesalahan saat memuat riwayat klasifikasi"
      );
    }
    throw err;
  }
}
