"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { ClassifyPayload, classifySchema } from "@/schemas/classifty";
import { ClassifyResponse, classifySkripsi } from "@/services/classify";
import { createRiwayat } from "@/services/user/riwayat/post-riwayat";

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
      setResult(res);

      try {
        await createRiwayat({
          user_id: session?.user.id,
          judul: variables.judul,
          abstrak: variables.abstrak,
          prediksi_topik: res.kategori,
          confidence_score: res.confidence,
        });
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
    <div className="flex justify-center items-center h-[80vh] w-full p-6 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Klasifikasi Bidang Penelitian
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Sistem ini menggunakan algoritma Support Vector Machine (SVM) untuk
            menentukan bidang penelitian dari skripsi berdasarkan judul dan
            abstrak.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Judul */}
            <div className="space-y-2">
              <Label htmlFor="judul">Judul Skripsi</Label>
              <Controller
                name="judul"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="judul"
                    placeholder="Masukkan judul skripsi"
                    disabled={isPending}
                  />
                )}
              />
              {errors.judul && (
                <p className="text-red-500 text-sm">{errors.judul.message}</p>
              )}
            </div>

            {/* Abstrak */}
            <div className="space-y-2">
              <Label htmlFor="abstrak">Abstrak</Label>
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
                <p className="text-red-500 text-sm">{errors.abstrak.message}</p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-5 text-base font-medium"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Klasifikasikan"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
