import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";

export type GetDashboardStatsPayload = {
  userId?: string;
};

export type DashboardStats = {
  total_klasifikasi: number;
  bidang_terbanyak: string | null;
  klasifikasi_bulan_ini: number;
  rata_akurasi: number;
  total_user_aktif?: number;
  distribusi_topik?: {
    prediksi_topik: string;
    total: number;
  }[];
  user_teraktif?: {
    user_id: string;
    total: number;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  };
  persebaran_bidang?: {
    prediksi_bidang: string;
    total: number;
  }[];
  tren_per_bulan?: {
    bulan: number;
    total: number;
  }[];
  terakhir_klasifikasi?: {
    id: string;
    diklasifikasi_pada: string;
  };
  tren_klasifikasi?: {
    bulan: string;
    total: number;
  }[];
  akurasi_per_bidang?: {
    prediksi_topik: string;
    rata_akurasi: number;
  }[];
  distribusi_confidence?: {
    rendah: number;
    sedang: number;
    tinggi: number;
  };
  riwayat_terakhir?: {
    judul: string;
    abstrak: string;
    prediksi_topik: string;
    confidence_score: number;
    diklasifikasi_pada: string;
  }[];
};

export type GetDashboardStatsResponse = SuccessResponse<DashboardStats>;

/**
 * Mendapatkan data statistik dashboard (global / per user)
 */
export async function getDashboardStats(
  payload?: GetDashboardStatsPayload
): Promise<GetDashboardStatsResponse> {
  try {
    const res = await apiRequest<GetDashboardStatsResponse>(
      "get",
      "/dashboard",
      undefined,
      {
        withAuth: true,
        config: {
          params: payload?.userId ? { user_id: payload.userId } : undefined,
        },
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
