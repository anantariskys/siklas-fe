import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

/**
 * Payload untuk menyimpan riwayat klasifikasi
 */
export type CreateRiwayatPayload = {
  user_id?: string;
  judul?: string;
  abstrak?: string;
  prediksi_topik: string;
  confidence_score?: number;
};

/**
 * Response dari backend setelah menyimpan riwayat klasifikasi
 */
export type CreateRiwayatResponse = SuccessResponse<{
  id: string;
  user_id?: string;
  judul?: string;
  abstrak?: string;
  prediksi_topik: string;
  confidence_score?: number;
  diklasifikasi_pada: string;
  created_at: string;
  updated_at: string;
}>;

/**
 * Service untuk menyimpan riwayat klasifikasi baru
 */
export async function createRiwayat(
  payload: CreateRiwayatPayload
): Promise<CreateRiwayatResponse> {
  try {
    const res = await apiRequest<CreateRiwayatResponse>(
      "post",
      "/riwayat-klasifikasi",
      payload,
      { withAuth: true }
    );

    if (!res || !res.data) {
      throw new Error("Gagal menyimpan riwayat klasifikasi");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error("Create riwayat error:", err.message);
      throw new Error(
        err.message || "Terjadi kesalahan saat menyimpan riwayat"
      );
    }
    throw err;
  }
}
