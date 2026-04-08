"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getDashboardStats } from "@/services/user/dashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, CalendarDays, ListChecks, TrendingUp } from "lucide-react";

const PRIMARY = "#262e43";
const SECONDARY = "#fb9233";
const COLORS = [
  "#262e43", // Navy
  "#fb9233", // Orange
  "#10b981", // Emerald
  "#6366f1", // Indigo
  "#f43f5e", // Rose
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#14b8a6", // Teal
];

interface PersebaranBidang {
  prediksi_topik: string;
  total: number | string;
}

interface RiwayatItem {
  judul: string;
  prediksi_topik: string;
  confidence_score: number | string;
  diklasifikasi_pada: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", session?.user?.id],
    queryFn: () => getDashboardStats({ userId: session?.user?.id || "" }),
    enabled: !!session?.user?.id,
  });

  const dashboard = data?.data;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner & Accuracy Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Welcome Banner Card */}
        <Card className="relative overflow-hidden border-0 bg-primary text-white shadow-md lg:col-span-3">
          <div className="pointer-events-none absolute right-0 top-0 p-4 text-white opacity-10">
            <BarChart3 className="-mr-12 -mt-12 h-56 w-56" />
          </div>
          <CardContent className="relative z-10 flex h-full flex-col items-start gap-6 p-6 md:flex-row md:items-center md:p-8">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || ""}
                width={80}
                height={80}
                className="rounded-full border-4 border-white/20 object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/5 bg-white/10 shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">
                Selamat Datang di SIKLAS, {session?.user?.name}!
              </h2>
              <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
                <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 font-medium">
                  @{session?.user?.username}
                </span>
                <span>•</span>
                <span>{session?.user?.email}</span>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                Sistem Klasifikasi Skripsi berbasis SVM untuk membantu efisiensi
                penentuan topik penelitian. Gunakan browser terkini seperti
                Google Chrome atau Mozilla Firefox untuk pengalaman terbaik
                Anda.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Global Accuracy Card */}
        <Card className="flex flex-col justify-center border-l-4 border-l-secondary shadow-sm lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-secondary" /> Akurasi Program
              Studi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-black text-primary">
                  {dashboard?.rata_akurasi?.toFixed(2) ?? 0}%
                </p>
                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 text-[10px] font-bold tracking-tight text-muted-foreground">
                  DARI {dashboard?.total_klasifikasi ?? 0} KLASIFIKASI
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Total Klasifikasi",
            value: dashboard?.total_klasifikasi ?? 0,
            desc: "Total dari mahasiswa",
            icon: <ListChecks className="h-5 w-5 text-primary" />,
            borderColor: "border-primary/20",
          },

          {
            title: "Bidang Terbanyak",
            value: dashboard?.bidang_terbanyak || "-",
            desc: "Paling sering muncul",
            icon: <BarChart3 className="h-5 w-5 text-secondary" />,
            borderColor: "border-secondary/20",
          },
          {
            title: "Bulan Ini",
            value: dashboard?.klasifikasi_bulan_ini ?? 0,
            desc: "30 hari terakhir",
            icon: <CalendarDays className="h-5 w-5 text-secondary" />,
            borderColor: "border-secondary/20",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`rounded-lg border-2 p-3 ${item.borderColor} shrink-0 bg-slate-50`}
              >
                {item.icon}
              </div>
              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.title}
                </p>
                {isLoading ? (
                  <Skeleton className="mt-1 h-6 w-16" />
                ) : (
                  <p className="truncate text-xl font-black text-primary">
                    {item.value}
                  </p>
                )}
                <p className="mt-0.5 truncate text-[10px] font-medium text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Charts - Top Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Research Field Pie Chart */}
        <Card className="border border-slate-100 shadow-sm">
          <CardHeader className="mb-4 border-b bg-slate-50/50 pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
              Persebaran Bidang
            </CardTitle>
            <CardDescription className="text-[10px] font-medium">
              Distribusi jumlah klasifikasi berdasarkan topik/bidang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-52 w-full" />
              </div>
            ) : dashboard?.persebaran_bidang?.length ? (
              <div className="h-[450px] w-full lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboard.persebaran_bidang.map(
                        (item: PersebaranBidang) => ({
                          ...item,
                          total: Number(item.total),
                        })
                      )}
                      dataKey="total"
                      nameKey="prediksi_topik"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={50}
                      labelLine={false}
                    >
                      {dashboard.persebaran_bidang.map(
                        (_: PersebaranBidang, idx: number) => (
                          <Cell
                            key={idx}
                            fill={COLORS[idx % COLORS.length]}
                            className="transition-opacity hover:opacity-80"
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `${value}`,
                        "Jumlah Klasifikasi",
                      ]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={120}
                      iconType="circle"
                      formatter={(value: string) =>
                        value.length > 25
                          ? `${value.substring(0, 25)}...`
                          : value
                      }
                      wrapperStyle={{
                        fontSize: "9px",
                        fontWeight: "bold",
                        paddingTop: "10px",
                        overflowY: "auto",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  TIDAK ADA DATA
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly Classification Trend */}
        <Card className="border border-slate-100 shadow-sm">
          <CardHeader className="mb-4 border-b bg-slate-50/50 pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
              Tren Bulanan
            </CardTitle>
            <CardDescription className="text-[10px] font-medium">
              Jumlah klasifikasi yang dilakukan setiap bulan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : dashboard?.tren_klasifikasi?.length ? (
              <div className="h-[450px] w-full lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dashboard.tren_klasifikasi}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      strokeOpacity={0.1}
                    />
                    <XAxis
                      dataKey="bulan"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "#64748b",
                        fontWeight: "bold",
                      }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "#64748b",
                        fontWeight: "bold",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={PRIMARY}
                      strokeWidth={4}
                      dot={{
                        r: 5,
                        fill: SECONDARY,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{ r: 7, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  TIDAK ADA DATA
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Accuracy & Confidence Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Average Accuracy per Field */}
        <Card className="border border-slate-100 shadow-sm">
          <CardHeader className="mb-4 border-b bg-slate-50/50 pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
              Akurasi per Bidang
            </CardTitle>
            <CardDescription className="text-[10px] font-medium">
              Nilai rata-rata confidence model per bidang penelitian.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : dashboard?.akurasi_per_bidang?.length ? (
              <div className="h-[450px] w-full lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboard.akurasi_per_bidang}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                      strokeOpacity={0.1}
                    />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="prediksi_topik"
                      type="category"
                      width={150}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "#475569",
                        fontWeight: "bold",
                      }}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      formatter={(val: number) => [
                        `${Number(val).toFixed(1)}%`,
                        "Akurasi",
                      ]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="rata_akurasi"
                      fill={PRIMARY}
                      radius={[0, 4, 4, 0]}
                      barSize={18}
                    >
                      {dashboard.akurasi_per_bidang.map(
                        (
                          _: { prediksi_topik: string; rata_akurasi: number },
                          idx: number
                        ) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        )
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  TIDAK ADA DATA
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confidence Score Distribution */}
        <Card className="border border-slate-100 shadow-sm">
          <CardHeader className="mb-4 border-b bg-slate-50/50 pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
              Distribusi Confidence
            </CardTitle>
            <CardDescription className="text-[10px] font-medium">
              Sebaran tingkat keyakinan model: Tinggi ({">"}80%), Sedang
              (60-80%), dan Rendah ({"<"}60%).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Skeleton className="h-52 w-52 rounded-full" />
              </div>
            ) : dashboard?.distribusi_confidence ? (
              <div className="h-[450px] w-full lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "High (>80%)",
                          value: dashboard.distribusi_confidence.tinggi,
                        },
                        {
                          name: "Medium (60-80%)",
                          value: dashboard.distribusi_confidence.sedang,
                        },
                        {
                          name: "Low (<60%)",
                          value: dashboard.distribusi_confidence.rendah,
                        },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={55}
                      paddingAngle={4}
                      labelLine={false}
                    >
                      <Cell fill={PRIMARY} />
                      <Cell fill={SECONDARY} />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: "11px", fontWeight: "bold" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  TIDAK ADA DATA
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Classification History */}
      <Card className="mt-6 overflow-hidden border border-slate-100 shadow-sm">
        <CardHeader className="border-b bg-slate-50/50 pb-4">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
            Riwayat Klasifikasi Terakhir
          </CardTitle>
          <CardDescription className="text-[10px] font-medium">
            5 hasil klasifikasi terbaru mahasiswa di prodi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {dashboard?.riwayat_terakhir?.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-[11px] font-bold">
                <thead className="border-b bg-slate-100/80 text-left uppercase tracking-tighter text-primary">
                  <tr>
                    <th className="px-6 py-3 font-black">JUDUL SKRIPSI</th>
                    <th className="px-6 py-3 font-black">TOPIK PREDIKSI</th>
                    <th className="px-6 py-3 font-black">AKURASI</th>
                    <th className="px-6 py-3 font-black">TANGGAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboard.riwayat_terakhir.map(
                    (item: RiwayatItem, i: number) => (
                      <tr
                        key={i}
                        className="group transition-colors hover:bg-slate-50/50"
                      >
                        <td
                          className="max-w-[320px] truncate px-6 py-4 font-bold text-slate-700 transition-colors group-hover:text-primary"
                          title={item.judul}
                        >
                          {item.judul}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="rounded-sm border-secondary/20 bg-secondary/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-secondary shadow-none hover:bg-secondary/10">
                            {item.prediksi_topik}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex min-w-[100px] flex-col gap-1.5">
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-tighter">
                              <span
                                className={
                                  Number(item.confidence_score) > 80
                                    ? "text-primary"
                                    : Number(item.confidence_score) > 60
                                      ? "text-secondary"
                                      : "text-rose-500"
                                }
                              >
                                {Number(item.confidence_score) > 80
                                  ? "High"
                                  : Number(item.confidence_score) > 60
                                    ? "Medium"
                                    : "Low"}
                              </span>
                              <span className="text-slate-400">
                                {Number(item.confidence_score).toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full border border-slate-200/50 bg-slate-100 p-0.5">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${Number(item.confidence_score) > 80 ? "bg-primary" : Number(item.confidence_score) > 60 ? "bg-secondary" : "bg-rose-500"}`}
                                style={{
                                  width: `${Number(item.confidence_score)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold tabular-nums text-slate-500">
                          {new Date(item.diklasifikasi_pada).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-slate-50/30 p-10 text-center">
              <div className="mb-3 rounded-full border-2 border-slate-100 p-3">
                <ListChecks className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                BELUM ADA RIWAYAT
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
