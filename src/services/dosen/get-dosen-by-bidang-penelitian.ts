import { apiRequest } from "@/lib/axios";
import { ErrorResponse, SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type GetDosenByBidangPenelitianPayload = {
  bidangPenelitianSlug: string;
};

export type GetDosenByBidangPenelitianResponse = SuccessResponse<{
  bidang: string;
  dosen: {
    nama: string;
    bidang_penelitian_major: string;
    bidang_penelitian_minor: string | null;
  }[];
}>;

/**
 * Fungsi untuk mendapatkan daftar dosen berdasarkan bidang penelitian
 */
export async function getDosenByBidangPenelitian(
  payload: GetDosenByBidangPenelitianPayload
): Promise<GetDosenByBidangPenelitianResponse> {
  try {
    const res = await apiRequest<GetDosenByBidangPenelitianResponse>(
      "get",
      `/dosen/${payload.bidangPenelitianSlug}`,
      undefined,
      { withAuth: true ,
        
      }
    );

    if (!res || !res.data) {
      throw new Error("Gagal memuat data dosen");
    }

    return res;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Get dosen by bidang penelitian error:", err.message);
      throw new Error(
        err.message || "Terjadi kesalahan saat memuat data dosen"
      );
    }
    throw err;
  }
}
