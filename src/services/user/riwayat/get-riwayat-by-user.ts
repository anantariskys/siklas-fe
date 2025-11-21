import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
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

export type GetRiwayatByUserResponse = SuccessResponse<RiwayatItem[]>;

/**
 * Fungsi untuk mendapatkan riwayat klasifikasi berdasarkan user
 */
export async function getRiwayatByUser(
  payload: GetRiwayatByUserPayload
): Promise<GetRiwayatByUserResponse> {
  try {
    const res = await apiRequest<GetRiwayatByUserResponse>(
      "get",
      `/riwayat-klasifikasi/user/${payload.userId}`,
      undefined,
      { withAuth: true }
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
