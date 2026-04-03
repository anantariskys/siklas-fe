import { z } from "zod";

export const classifySchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  abstrak: z.string().optional(),
});

export type ClassifyPayload = z.infer<typeof classifySchema>;
