import { apiRequest } from "@/lib/axios";
export { type CreateDosenPayload } from "@/features/admin/dosen/modal/create";
import { CreateDosenPayload } from "@/features/admin/dosen/modal/create";
import { SuccessResponse } from "@/types/api-response";
import { AxiosError } from "axios";
import { DosenItem } from "./dosen";

export type CreateDosenResponse = SuccessResponse<DosenItem>;

/**
 * Fungsi untuk membuat user oleh admin ke Laravel backend
 */
export async function createDosen(
  payload: CreateDosenPayload
): Promise<CreateDosenResponse> {
  try {
    const res = await apiRequest<CreateDosenResponse>(
      "post",
      "/admin/dosen",
      payload,
      { withAuth: true } // perlu token karena ini untuk membuat user
    );

    if (!res || !res.success) {
      throw new Error("Gagal membuat dosen");
    }

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message || "Terjadi kesalahan saat membuat user");
    }
    throw err;
  }
}
