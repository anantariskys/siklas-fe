import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";
import { DosenItem } from "./dosen";

export type DeleteDosenResponse = SuccessResponse<DosenItem>;

/**
 * Fungsi delete dosen oleh admin ke Laravel backend
 */
export async function deleteDosen(
  dosenId: string
): Promise<DeleteDosenResponse> {
  try {
    const res = await apiRequest<DeleteDosenResponse>(
      "delete",
      `/admin/dosen/${dosenId}`,
      undefined,
      { withAuth: true } // perlu token karena ini untuk menghapus dosen
    );

    if (!res || !res.success) {
      throw new Error("Gagal menghapus dosen");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat menghapus dosen");
    }
    throw err;
  }
}
