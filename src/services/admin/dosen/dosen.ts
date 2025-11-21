import { apiRequest } from "@/lib/axios";
import { SuccessPaginationResponse } from "@/types/api-response";
import { DatatableQuery } from "@/types/data-table";
import { AxiosError } from "axios";

export type DosenItem = {
  id: string;
  nama: string;
  gelar_awal?: string;
  gelar_akhir?: string;
  bidang_penelitian_major_id: string;
  created_at: string;
  updated_at: string;
  major: {
    id: string;
    nama: string;
  };
  minors: {
    id: string;
    nama: string;
    pivot: {
      dosen_id: string;
      bidang_penelitian_id: string;
    };
  }[];
};

export type GetDosenResponse = SuccessPaginationResponse<DosenItem>;

/**
 * Fungsi untuk mendapatkan daftar user
 */
export async function getDosens(
  payload: DatatableQuery = {}
): Promise<GetDosenResponse> {
  try {
    const params = new URLSearchParams();
    if (payload.page) params.append("page", String(payload.page));
    if (payload.limit) params.append("limit", String(payload.limit));
    if (payload.search) params.append("search", payload.search);

    const res = await apiRequest<GetDosenResponse>(
      "get",
      `/admin/dosen`,
      undefined,
      {
        withAuth: true,
        config: {
          params: params,
        },
      }
    );

    if (!res || !res.data) {
      throw new Error("Gagal memuat data dosen");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.message || "Terjadi kesalahan saat memuat data dosen"
      );
    }
    throw err;
  }
}
