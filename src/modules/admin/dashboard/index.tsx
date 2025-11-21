"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getAdminDashboardStats } from "@/services/admin/dashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BarChart3, CalendarDays, ListChecks, Users } from "lucide-react";

const COLORS = ["#3b82f6", "#facc15", "#10b981"];

export default function AdminDashboardPage() {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => getAdminDashboardStats(),
    enabled: !!session?.user?.id,
  });

  const dashboard = data?.data;

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {/* Welcome Card */}
        <Card className="col-span-1 md:col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Selamat Datang di SIKLAS</CardTitle>
            <CardDescription>
              Sistem Klasifikasi Skripsi berbasis SVM untuk membantu Anda
              menentukan topik skripsi secara otomatis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Gunakan browser terkini seperti <strong>Google Chrome</strong> atau{" "}
            <strong>Mozilla Firefox</strong> untuk pengalaman terbaik. SIKLAS
            membantu mempercepat proses identifikasi topik penelitian Anda.
          </CardContent>
        </Card>

        {/* Average Accuracy */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Rata-rata Hasil Klasifikasimu</CardTitle>
            <CardDescription>
              Ringkasan akurasi klasifikasi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            ) : (
              <>
                <p className="text-3xl font-bold text-blue-600">
                  {dashboard?.rata_akurasi?.toFixed(2) ?? 0}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Akurasi dari {dashboard?.total_klasifikasi ?? 0} klasifikasi
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil Pengguna</CardTitle>
            <CardDescription>Informasi akun Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex lg:flex-row flex-col items-center gap-4">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || ""}
                  width={64}
                  height={64}
                  className="rounded-full border border-border"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border border-border">
                  <span className="text-muted-foreground text-xs font-medium">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <p className="font-semibold text-center lg:text-left text-foreground text-lg leading-tight">
                  {session?.user?.name}
                </p>
                <p className="font-medium text-center lg:text-left text-muted-foreground text-sm leading-tight">
                  @{session?.user?.username}
                </p>
                <p className="text-xs text-muted-foreground/80 leading-tight">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Klasifikasi",
            value: dashboard?.total_klasifikasi ?? 0,
            desc: "Total semua klasifikasi oleh user",
            icon: <ListChecks className="h-5 w-5 text-primary" />,
          },
          {
            title: "Total User",
            value: dashboard?.total_user ?? 0,
            desc: "Jumlah pengguna terdaftar",
            icon: <Users className="h-5 w-5 text-primary" />,
          },
          {
            title: "Bidang Terbanyak",
            value: dashboard?.bidang_terbanyak || "-",
            desc: "Bidang paling sering muncul",
            icon: <BarChart3 className="h-5 w-5 text-primary" />,
          },
          {
            title: "Klasifikasi Bulan Ini",
            value: dashboard?.klasifikasi_bulan_ini ?? 0,
            desc: "Dalam 30 hari terakhir",
            icon: <CalendarDays className="h-5 w-5 text-primary" />,
          },
        ].map((item, idx) => (
          <Card key={idx} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                {item.icon}
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mb-2" />
              ) : (
                <p className="text-2xl font-bold">{item.value}</p>
              )}
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {/* Research Field Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Persebaran Bidang Penelitian</CardTitle>
            <CardDescription>
              Distribusi jumlah klasifikasi berdasarkan bidang/topik penelitian.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : dashboard?.persebaran_bidang?.length ? (
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboard.persebaran_bidang}
                      dataKey="total"
                      nameKey="prediksi_topik"
                      outerRadius={100}
                      label
                    >
                      {dashboard.persebaran_bidang.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}`, "Jumlah Klasifikasi"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Tidak ada data persebaran bidang penelitian.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Monthly Classification Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Klasifikasi Bulanan</CardTitle>
            <CardDescription>
              Jumlah klasifikasi yang dilakukan setiap bulan.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            {dashboard?.tren_klasifikasi?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboard.tren_klasifikasi}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Tidak ada data tren klasifikasi.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Accuracy & Confidence Section */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Average Accuracy per Field */}
        <Card>
          <CardHeader>
            <CardTitle>Akurasi Rata-rata per Bidang</CardTitle>
            <CardDescription>
              Nilai rata-rata confidence model pada setiap bidang penelitian.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            {dashboard?.akurasi_per_bidang?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboard.akurasi_per_bidang} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="prediksi_topik" type="category" width={150} />
                  <Tooltip />
                  <Bar
                    dataKey="rata_akurasi"
                    fill="#10b981"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Tidak ada data akurasi per bidang.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Confidence Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Confidence Score</CardTitle>
            <CardDescription>
              Sebaran tingkat keyakinan model pada hasil klasifikasi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            {dashboard?.distribusi_confidence ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Rendah (<60%)",
                        value: dashboard.distribusi_confidence.rendah,
                      },
                      {
                        name: "Sedang (60–80%)",
                        value: dashboard.distribusi_confidence.sedang,
                      },
                      {
                        name: "Tinggi (>80%)",
                        value: dashboard.distribusi_confidence.tinggi,
                      },
                    ]}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {COLORS.map((color, i) => (
                      <Cell key={i} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Tidak ada data distribusi confidence.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
