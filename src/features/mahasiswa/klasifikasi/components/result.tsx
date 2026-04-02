"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ClassifyResponse } from "@/services/classify";
import { GetDosenByBidangPenelitianResponse } from "@/services/user/dosen/get-dosen-by-bidang-penelitian";
import {
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  User,
  GraduationCap,
  ArrowRight,
  Star,
} from "lucide-react";

interface ResultProps {
  result: ClassifyResponse;
  dosenList: GetDosenByBidangPenelitianResponse["data"]["dosen"] | null;
  loadingDosen: boolean;
  userRole?: string;
  onReset?: () => void;
}

const PRIMARY = "#262e43";
const SECONDARY = "#fb9233";

export default function Result({
  dosenList,
  loadingDosen,
  result,
  userRole,
  onReset,
}: ResultProps) {
  const confidenceValue = Number(result?.confidence ?? 0);
  const confidencePercent = confidenceValue.toFixed(2);

  const pieData = [
    { name: "Confidence", value: confidenceValue },
    { name: "Remaining", value: 100 - confidenceValue },
  ];

  // Determine color based on confidence level
  const statusColor =
    confidenceValue > 80
      ? "#10b981"
      : confidenceValue > 60
        ? SECONDARY
        : "#ef4444";
  const COLORS = [statusColor, "#f1f5f9"];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
      <div className="space-y-8">
        {/* Header Action */}
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Status Analisis
              </p>
              <h3 className="text-sm font-bold uppercase text-slate-800">
                Selesai Diklasifikasikan
              </h3>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset || (() => window.location.reload())}
            className="h-10 gap-2 border-slate-200 px-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-50"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Mulai Ulang</span>
          </Button>
        </div>

        {/* ===================== */}
        {/*   CARD HASIL KLASIFIKASI */}
        {/* ===================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="overflow-hidden border-0 bg-white shadow-lg ring-1 ring-black/5 lg:col-span-2">
            <CardHeader className="border-b bg-slate-50/50 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-1 text-xl font-black uppercase tracking-tight text-primary">
                    Detail Hasil Analisis
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-500">
                    Berdasarkan judul dan abstrak yang Anda masukkan, berikut
                    adalah prediksi kategori penelitian.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-10 md:flex-row">
                {/* Visual Confidence */}
                <div className="relative h-56 w-56 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-800">
                      {confidencePercent}%
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Confidence
                    </span>
                  </div>
                </div>

                {/* Information Details */}
                <div className="w-full flex-1 space-y-6">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                    <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Kategori Terdeteksi
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                        <Star className="h-6 w-6 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-primary">
                        {result.kategori}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-100 bg-white p-4 italic shadow-sm">
                      <p className="mb-1 text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                        Tingkat Keyakinan
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {confidenceValue > 85
                          ? "Sangat Tinggi"
                          : confidenceValue > 70
                            ? "Tinggi"
                            : "Cukup"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Notice Card */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="relative overflow-hidden border-0 bg-[#262e43] text-white shadow-lg">
              <div className="absolute bottom-0 right-0 p-2 opacity-10">
                <AlertCircle className="h-32 w-32 translate-x-1/2 translate-y-1/2 transform" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                  <AlertCircle className="h-4 w-4 text-secondary" /> Catatan
                  Penting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs leading-relaxed text-slate-300">
                  Hasil klasifikasi ini bersifat prediktif berdasarkan data
                  latih yang ada dalam sistem SIKLAS.
                </p>
                {/* <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                   <p className="text-[10px] italic text-slate-200">
                     "Disarankan untuk tetap berkonsultasi dengan Dosen Pembimbing untuk mematangkan topik Anda."
                   </p>
                </div> */}
              </CardContent>
            </Card>

            {/* Action Card */}
            <div className="group relative flex h-[180px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border-2 border-emerald-400 bg-emerald-500 p-6 text-white shadow-lg">
              <div className="absolute right-0 top-0 transform p-4 opacity-20 transition-transform group-hover:scale-110">
                <GraduationCap className="h-16 w-16" />
              </div>
              <h4 className="relative z-10 text-lg font-black uppercase leading-tight antialiased">
                Cek Riwayat
                <br />
                Klasifikasi
              </h4>
              <div className="relative z-10 flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <span className="text-xs font-bold uppercase tracking-tighter antialiased">
                  Lihat Arsip Anda
                </span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ===================== */}
        {/*       LIST DOSEN     */}
        {/* ===================== */}
        {userRole === "mahasiswa" && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h2 className="px-4 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                Rekomendasi Dosen
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {loadingDosen ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                ))}
              </div>
            ) : dosenList && dosenList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dosenList.map((dosen) => (
                  <Card
                    key={dosen.nama + dosen.major}
                    className="group overflow-hidden border-0 bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="h-2 bg-primary transition-colors group-hover:bg-secondary"></div>
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-400 transition-colors group-hover:text-primary">
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

                    <CardContent className="space-y-5">
                      {/* Mayor */}
                      <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3">
                        <div className="mb-1.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>{" "}
                          Bidang Utama (Mayor)
                        </div>
                        <Badge
                          variant="secondary"
                          className="rounded border-0 bg-primary/10 font-sans text-[10px] font-black uppercase text-primary"
                        >
                          {dosen.major}
                        </Badge>
                      </div>

                      {/* Minor */}
                      <div>
                        <div className="mb-2 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>{" "}
                          Bidang Pendukung (Minor)
                        </div>
                        {dosen.minor.length > 0 ? (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
