"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, BookOpen, PenTool } from "lucide-react";

import { ClassifyPayload, classifySchema } from "@/schemas/classifty";
import { ClassifyResponse, classifySkripsi } from "@/services/classify";
import { createRiwayat } from "@/services/user/riwayat/post-riwayat";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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
      toast.success("Skripsi berhasil diklasifikasikan!");

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
        // toast.error("Gagal menyimpan riwayat klasifikasi.");
      }
    },

    onError: (err) => {
      console.error("Gagal mengklasifikasikan skripsi:", err);
      toast.error("Gagal mengklasifikasikan skripsi. Silakan coba lagi.");
    },
  });

  const onSubmit = (data: ClassifyPayload) => {
    setResult(null);
    mutate(data);
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-6 sm:px-6">
      <Card className="w-full max-w-xl overflow-hidden border-t-4 border-t-[#fb9233] bg-white shadow-xl">
        <div className="relative overflow-hidden bg-[#262e43] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform opacity-10">
            <Sparkles className="h-48 w-48 sm:h-64 sm:w-64" />
          </div>
          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-lg bg-[#fb9233] p-1.5">
                <Sparkles className="h-4 w-4 text-[#262e43]" />
              </div>
              <Badge
                variant="outline"
                className="border-white/20 text-[9px] font-black uppercase tracking-widest text-white sm:text-[10px]"
              >
                AI Powered Analysis
              </Badge>
            </div>
            <CardTitle className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Klasifikasi Bidang Penelitian
            </CardTitle>
            <CardDescription className="mt-2 max-w-xl text-xs font-medium leading-relaxed text-slate-300 sm:text-sm">
              Masukkan judul dan abstrak penelitian Anda. Sistem cerdas kami
              akan menganalisis teks menggunakan algoritma SVM untuk menentukan
              kategori bidang penelitian.
            </CardDescription>
          </div>
        </div>

        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Judul */}
            <div className="space-y-2">
              <div className="mb-1 flex items-center gap-2">
                <PenTool className="h-3.5 w-3.5 text-[#fb9233]" />
                <Label
                  htmlFor="judul"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 sm:text-xs"
                >
                  Judul Skripsi
                </Label>
              </div>
              <Controller
                name="judul"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="judul"
                    placeholder="Contoh: Implementasi Algoritma SVM untuk Klasifikasi Berita..."
                    disabled={isPending}
                    className="h-10 border-slate-200 text-sm font-medium focus-visible:ring-[#262e43] sm:h-12"
                  />
                )}
              />
              {errors.judul && (
                <p className="text-[10px] font-bold uppercase tracking-tighter text-red-500">
                  {errors.judul.message}
                </p>
              )}
            </div>

            {/* Abstrak */}
            <div className="space-y-2">
              <div className="mb-1 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-[#fb9233]" />
                <Label
                  htmlFor="abstrak"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 sm:text-xs"
                >
                  Abstrak Penelitian
                </Label>
              </div>
              <Controller
                name="abstrak"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="abstrak"
                    rows={6}
                    placeholder="Tempelkan abstrak lengkap Anda di sini..."
                    disabled={isPending}
                    className="resize-none border-slate-200 p-3 text-sm font-medium leading-relaxed focus-visible:ring-[#262e43] sm:p-4"
                  />
                )}
              />
              {errors.abstrak && (
                <p className="text-[10px] font-bold uppercase tracking-tighter text-red-500">
                  {errors.abstrak.message}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 w-full bg-[#262e43] text-xs font-black uppercase tracking-widest shadow-lg transition-all hover:bg-[#1a1f2e] active:scale-[0.98] sm:h-14 sm:text-sm"
              >
                {isPending ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Menganalisis Teks...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Mulai Klasifikasi Sekarang</span>
                    <Sparkles className="ml-1 h-4 w-4" />
                  </div>
                )}
              </Button>
              <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Analisis biasanya memakan waktu kurang dari 5 detik
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
