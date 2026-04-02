import { useQuery } from "@tanstack/react-query";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, GraduationCap } from "lucide-react";

import { getDosenByBidangPenelitian } from "@/services/user/dosen/get-dosen-by-bidang-penelitian";
import slugify from "slugify";
import { RiwayatItem } from "@/services/user/riwayat/get-riwayat-by-user";

export default function PreviewDosenModal({ data }: { data: RiwayatItem }) {
  const { data: dosenData, isLoading } = useQuery({
    queryKey: ["dosen", data.prediksi_topik],
    queryFn: () =>
      getDosenByBidangPenelitian({
        bidangPenelitianSlug: slugify(
          (data?.prediksi_topik || "").replace(/&/g, ""),
          {
            lower: true,
            strict: true,
            remove: /&/g,
          }
        ),
      }),
    enabled: !!data.prediksi_topik,
  });

  return (
    <DialogContent className="max-h-[85vh] w-[95vw] max-w-4xl overflow-y-auto border-none bg-slate-50 p-0 md:w-full">
      <div className="sticky top-0 z-20 bg-[#262e43] p-6 text-white shadow-md">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-lg bg-[#fb9233] p-2">
            <GraduationCap className="h-5 w-5 text-[#262e43]" />
          </div>
          <Badge
            variant="outline"
            className="border-white/20 text-[10px] font-black uppercase tracking-widest text-white"
          >
            Rekomendasi Pembimbing
          </Badge>
        </div>
        <DialogTitle className="text-xl font-black uppercase tracking-tight md:text-2xl">
          Dosen Bidang {data.prediksi_topik}
        </DialogTitle>
        <DialogDescription className="mt-1 text-xs font-medium text-slate-300">
          Berikut adalah daftar dosen yang memiliki kepakaran sesuai dengan
          hasil klasifikasi skripsi Anda.
        </DialogDescription>
      </div>

      <div className="p-6">
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Data State */}
        {!isLoading && dosenData?.data.dosen?.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {dosenData.data.dosen.map((dosen) => (
              <Card
                key={dosen.nama}
                className="group overflow-hidden border-0 bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-1.5 bg-[#262e43] transition-colors group-hover:bg-[#fb9233]"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-400 transition-colors group-hover:text-[#262e43]">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="overflow-hidden">
                      <CardTitle
                        className="truncate text-base font-black uppercase leading-snug tracking-tighter text-slate-800"
                        title={dosen.nama}
                      >
                        {dosen.nama}
                      </CardTitle>
                      <p className="mt-1 text-[10px] font-bold uppercase italic tracking-widest text-slate-500">
                        {dosen.gelar}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Mayor */}
                  <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3">
                    <div className="mb-1.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#262e43]"></div>{" "}
                      Bidang Utama (Mayor)
                    </div>
                    <Badge
                      variant="secondary"
                      className="rounded border-0 bg-[#262e43]/10 font-sans text-[10px] font-black uppercase text-[#262e43]"
                    >
                      {dosen.major}
                    </Badge>
                  </div>

                  {/* Minor */}
                  <div>
                    <div className="mb-2 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#fb9233]"></div>{" "}
                      Bidang Pendukung (Minor)
                    </div>
                    {Array.isArray(dosen.minor) && dosen.minor.length > 0 ? (
                      <div className="mt-1 flex flex-wrap gap-1.5 font-sans">
                        {dosen.minor.map((m) => (
                          <Badge
                            key={m}
                            variant="outline"
                            className="rounded border-slate-200 text-[10px] font-bold lowercase text-slate-600"
                          >
                            {m}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] font-medium italic text-slate-400">
                        - Tidak ada bidang minor tercatat -
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                <User className="h-8 w-8 text-slate-300" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-800">
                Tidak ada dosen ditemukan
              </h4>
              <p className="mx-auto mt-1 max-w-xs text-xs text-slate-500">
                Kami tidak menemukan dosen dengan kepakaran yang sesuai dengan
                kategori ini saat ini.
              </p>
            </div>
          )
        )}
      </div>
    </DialogContent>
  );
}
