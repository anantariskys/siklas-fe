import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export interface BidangPenelitianOption {
  id: string;
  nama: string;
}

export type GetBidangPenelitianOptionsResponse = SuccessResponse<
  BidangPenelitianOption[]
>;

/**
 * Fungsi untuk mendapatkan riwayat klasifikasi berdasarkan user
 */
export async function getBidangPenelitianOptions(): Promise<GetBidangPenelitianOptionsResponse> {
  try {
    const res = await apiRequest<GetBidangPenelitianOptionsResponse>(
      "get",
      `/bidang-penelitian/options`,
      undefined,
      {
        withAuth: true,
      }
    );

    if (!res || !res.data) {
      throw new Error("Gagal memuat data bidang penelitian");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.message || "Terjadi kesalahan saat memuat bidang penelitian"
      );
    }
    throw err;
  }
}
