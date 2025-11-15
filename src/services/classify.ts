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
    `${process.env.NEXT_PUBLIC_SVM_URL ?? "https://ml.siklas.divisigurutugasduba.com"}/classify`,
    payload
  );

  if (!res.data) {
    throw new Error("Gagal mengklasifikasikan skripsi");
  }

  return res.data;
}
