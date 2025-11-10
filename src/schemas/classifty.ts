import { z } from "zod";

export const classifySchema = z.object({
  judul: z.string().min(1, "Judul minimal 1 karakter"),
  abstrak: z.string().min(1, "Abstrak minimal 1 karakter"),
});

export type ClassifyPayload = z.infer<typeof classifySchema>;
``;
