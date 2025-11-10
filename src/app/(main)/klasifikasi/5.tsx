"use client";

import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassifyPayload, classifySchema } from "@/schemas/classifty";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClassifyResponse, classifySkripsi } from "@/services/classify";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { getDosenByBidangPenelitian, GetDosenByBidangPenelitianResponse } from "@/services/dosen/get-dosen-by-bidang-penelitian";

export default function Klasifikasi() {
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [dosenList, setDosenList] = useState<GetDosenByBidangPenelitianResponse["data"]['dosen'] | null>(null);


  const { data: dosenData, isLoading: loadingDosen, isError,isSuccess } = useQuery({
    queryKey: ["dosen", result?.kategori],
    queryFn: () => getDosenByBidangPenelitian({ bidangPenelitianSlug: slugify(result?.kategori || "",{lower:true}) }),
    enabled: !!result?.kategori
  });
  useEffect(() => {
    if (isSuccess && dosenData) {
      setDosenList(dosenData.data.dosen);

    }
  }, [isSuccess, dosenData]);



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


    },

    onError: (err) => {
      console.error("Gagal mengklasifikasikan skripsi:", err);
    },
  });

  const onSubmit = (data: ClassifyPayload) => {
    setResult(null);
    setDosenList(null);
    mutate(data);
  };

  

  return (
    <div className="flex gap-8">
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

          {/* Hasil */}
          <div className="mt-6">
            {isPending ? (
              <p className="text-gray-700">Sedang mengklasifikasi...</p>
            ) : result ? (
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-gray-800">Kategori: {result.kategori}</p>
                <p className="text-gray-800">
                  Confidence: {result.confidence.toFixed(2)} %
                </p>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-gray-700">
                  Hasil klasifikasi akan muncul di sini...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 h-[88.5vh] overflow-y-auto p-4 bg-gray-50">
        {/* Daftar Dosen */}
        {result && (
          <div className="mt-6 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Dosen dengan bidang penelitian serupa
            </h2>
            {loadingDosen ? (
              <p className="text-gray-600">Memuat daftar dosen...</p>
            ) : dosenList ? (
              <div className="grid-cols-2 gap-4 grid w-full">
                {dosenList.length > 0 &&
                  dosenList.map((dosen) => (
                    <div
                      key={dosen.nama+dosen.bidang_penelitian_major+dosen.bidang_penelitian_minor}
                      className="bg-white p-4 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-gray-900">{dosen.nama}</p>
                      <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Mayor:</span>{" "}
                      {dosen.bidang_penelitian_major || "-"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Minor:</span>{" "}
                      {dosen?.bidang_penelitian_minor || "-"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada dosen yang cocok.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
