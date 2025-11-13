import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Fungsi wrapper untuk melakukan request dengan opsi auth.
 * Jika withAuth = true, token diambil otomatis dari NextAuth session.
 */
export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: AxiosRequestConfig["data"],
  options?: {
    withAuth?: boolean;
    config?: AxiosRequestConfig;
  }
): Promise<T> {
  try {
    const headers: Record<string, string> = {};

    // 🔑 Ambil token otomatis dari NextAuth session kalau withAuth true
    if (options?.withAuth) {
      const session = await getSession();
      console.log("TOKENNN", session);
      const token = session?.user.token;

      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.request<T>({
      method,
      url,
      data,
      headers,
      ...options?.config,
    });

    return response.data;
  } catch (error: AxiosError<T> | unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Terjadi kesalahan saat memanggil API"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memanggil API"
      );
    }
  }
}

export default api;
