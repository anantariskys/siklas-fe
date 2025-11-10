import { ClassifyPayload } from "@/schemas/classifty";
import axios from "axios";

export type ClassifyResponse = {
  kategori: string;
  confidence: number;
};

export async function classifySkripsi(
  payload: ClassifyPayload
): Promise<ClassifyResponse> {
  const res = await axios.post<ClassifyResponse>(
    "http://localhost:5000/classify/",
    payload
  );

  if (!res.data) {
    throw new Error("Gagal mengklasifikasikan skripsi");
  }

  return res.data;
}
