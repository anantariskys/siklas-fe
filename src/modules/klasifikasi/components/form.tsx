import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClassifyPayload, classifySchema } from "@/schemas/classifty";
import { ClassifyResponse, classifySkripsi } from "@/services/classify";
import { createRiwayat } from "@/services/riwayat/post-riwayat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

export default function Form({
  setResult,
}: {
  setResult: (res: ClassifyResponse | null) => void;
}) {
  const { data: session } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassifyPayload>({
    resolver: zodResolver(classifySchema),
    defaultValues: {
      judul: "",
      abstrak: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: classifySkripsi,
    onSuccess: async (res, variables) => {
      console.log("Klasifikasi berhasil:", res);
      setResult(res);
      // langsung simpan ke backend Laravel
      try {
        await createRiwayat({
          user_id: session?.user.id,
          judul: variables.judul,
          abstrak: variables.abstrak,
          prediksi_topik: res.kategori,
          confidence_score: res.confidence,
        });
        console.log("🗂 Riwayat berhasil disimpan ke backend");
      } catch (err) {
        console.error("❌ Gagal menyimpan riwayat:", err);
      }
    },

    onError: (err) => {
      console.error("Gagal mengklasifikasikan skripsi:", err);
    },
  });

  const onSubmit = (data: ClassifyPayload) => {
    setResult(null);
    mutate(data);
  };
  return (
    <div className="bg-gray-50 h-fit p-6 relative w-fit">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Klasifikasi Bidang Penelitian
        </h1>
        <p className="text-gray-600 mb-4">
          Sistem cerdas berbasis kecerdasan buatan untuk mengklasifikasikan
          topik skripsi berdasarkan judul dan abstrak menggunakan algoritma
          Support Vector Machine (SVM).
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-lg w-full"
        >
          {/* Judul */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Judul Skripsi
            </label>
            <Controller
              name="judul"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="title"
                  placeholder="Masukkan judul skripsi"
                  disabled={isPending}
                />
              )}
            />
            {errors.judul && (
              <p className="text-red-500 text-sm mt-1">
                {errors.judul.message}
              </p>
            )}
          </div>

          {/* Abstrak */}
          <div>
            <label
              htmlFor="abstrak"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Abstrak
            </label>
            <Controller
              name="abstrak"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="abstrak"
                  rows={6}
                  placeholder="Masukkan abstrak skripsi"
                  disabled={isPending}
                />
              )}
            />
            {errors.abstrak && (
              <p className="text-red-500 text-sm mt-1">
                {errors.abstrak.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Mengklasifikasi..." : "Klasifikasikan"}
          </Button>
        </form>
      </div>
    </div>
  );
}
