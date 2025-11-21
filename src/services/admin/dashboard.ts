import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type DashboardStats = {
  total_klasifikasi: number;
  total_user: number;

  bidang_terbanyak: string | null;
  klasifikasi_bulan_ini: number;
  rata_akurasi: number;

  persebaran_bidang: {
    prediksi_topik: string;
    total: number;
  }[];

  tren_klasifikasi: {
    bulan: string;
    total: number;
  }[];

  akurasi_per_bidang: {
    prediksi_topik: string;
    rata_akurasi: number;
  }[];

  distribusi_confidence: {
    rendah: number;
    sedang: number;
    tinggi: number;
  };

  riwayat_terbaru: {
    user_id: number;
    judul: string;
    prediksi_topik: string;
    confidence_score: number;
    diklasifikasi_pada: string;
  }[];
};

export type GetDashboardStatsResponse = SuccessResponse<DashboardStats>;

/**
 * Mendapatkan data statistik dashboard (global / per user)
 */
export async function getAdminDashboardStats(): Promise<GetDashboardStatsResponse> {
  try {
    const res = await apiRequest<GetDashboardStatsResponse>(
      "get",
      "/admin/dashboard",
      undefined,
      {
        withAuth: true,
      }
    );

    if (!res || !res.data) {
      throw new Error("Gagal memuat data statistik dashboard");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat memuat statistik dashboard"
      );
    }
    throw err;
  }
}
