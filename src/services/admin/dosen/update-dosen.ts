import { apiRequest } from "@/lib/axios";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";
import { DosenItem } from "./dosen";
import { CreateDosenPayload } from "@/features/admin/dosen/modal/create";
// Reuse payload type but make it adaptable for update if needed
export type UpdateDosenPayload = CreateDosenPayload;
export type UpdateDosenResponse = SuccessResponse<DosenItem>;

/**
 * Fungsi untuk mengupdate data dosen oleh admin ke Laravel backend
 */
export async function updateDosen(
  id: string,
  payload: UpdateDosenPayload
): Promise<UpdateDosenResponse> {
  try {
    const res = await apiRequest<UpdateDosenResponse>(
      "put",
      `/admin/dosen/${id}`,
      payload,
      { withAuth: true }
    );

    if (!res || !res.success) {
      throw new Error("Gagal mengupdate data dosen");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.message || "Terjadi kesalahan saat mengupdate data dosen"
      );
    }
    throw err;
  }
}
