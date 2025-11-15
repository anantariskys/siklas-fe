"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getDashboardStats } from "@/services/dashboard";
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
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ListChecks,
} from "lucide-react";

const COLORS = ["#3b82f6", "#facc15", "#10b981"];

export default function DashboardPage() {
  const session = useSession();

  console.log(session);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", session?.data?.user?.id],
    queryFn: () =>
      getDashboardStats({
        userId: session?.data?.user?.id || "",
      }),
    enabled: !!session?.data?.user?.id,
  });

  const dashboard = data?.data;

  return (
    <div className="space-y-6">
      {/* === Bagian Atas === */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {/* Intro */}
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

        {/* Rata-rata Akurasi */}
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

        {/* Profil Pengguna */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil Pengguna</CardTitle>
            <CardDescription>Informasi akun Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex lg:flex-row flex-col items-center space-x-4">
              {session?.data?.user?.image ? (
                <Image
                  src={session.data.user.image}
                  alt={session.data.user.name || ""}
                  width={64}
                  height={64}
                  className="rounded-full border border-border"
                />
              ) : (
                <Skeleton className="h-16 w-16 rounded-full" />
              )}
              <div>
                {session?.data?.user?.name ? (
                  <p className="font-semibold text-center lg:text-left text-foreground text-base leading-tight">
                    {session.data.user.name}
                  </p>
                ) : (
                  <Skeleton className="h-4 w-24" />
                )}
                {session?.data?.user?.email ? (
                  <p className="text-sm text-muted-foreground leading-tight">
                    {session.data.user.email}
                  </p>
                ) : (
                  <Skeleton className="h-3 w-32 mt-1" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* === Statistik Singkat === */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Klasifikasi",
            value: dashboard?.total_klasifikasi ?? 0,
            desc: "Jumlah klasifikasi yang dilakukan",
            icon: <ListChecks className="h-5 w-5 text-primary" />,
          },
          {
            title: "Bidang Terbanyak",
            value: dashboard?.bidang_terbanyak || "-",
            desc: "Bidang penelitian paling sering",
            icon: <BarChart3 className="h-5 w-5 text-primary" />,
          },
          {
            title: "Klasifikasi Bulan Ini",
            value: dashboard?.klasifikasi_bulan_ini ?? 0,
            desc: "Dalam 30 hari terakhir",
            icon: <CalendarDays className="h-5 w-5 text-primary" />,
          },
          {
            title: "Akurasi Rata-rata",
            value: `${dashboard?.rata_akurasi?.toFixed(2) ?? 0}%`,
            desc: "Confidence score model",
            icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="transition-all hover:shadow-md duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                {item.icon}
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mb-2" />
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  {item.value}
                </p>
              )}
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* === Persebaran Bidang === */}
      <Card className="mt-6">
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
                <BarChart data={dashboard.persebaran_bidang}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="prediksi_topik" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="total"
                    name="Jumlah Klasifikasi"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              Tidak ada data persebaran bidang penelitian.
            </p>
          )}
        </CardContent>
      </Card>

      {/* === Tren Klasifikasi Bulanan === */}
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

      {/* === Akurasi per Bidang & Distribusi Confidence === */}
      <div className="grid lg:grid-cols-2 gap-4">
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

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Confidence Score</CardTitle>
            <CardDescription>
              Sebaran tingkat keyakinan model pada hasil klasifikasi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex justify-center items-center">
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

      {/* === Riwayat Klasifikasi Terakhir === */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Klasifikasi Terakhir</CardTitle>
          <CardDescription>5 hasil klasifikasi terbaru Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          {dashboard?.riwayat_terakhir?.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-muted-foreground border-b">
                  <tr>
                    <th className="py-2">Judul Skripsi</th>
                    <th className="py-2">Topik</th>
                    <th className="py-2">Akurasi</th>
                    <th className="py-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.riwayat_terakhir.map((item, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2">{item.judul}</td>
                      <td className="py-2">{item.abstrak}</td>
                      <td className="py-2">{item.prediksi_topik}</td>
                      <td className="py-2">
                        {Number(item.confidence_score).toFixed(2)}%
                      </td>
                      <td className="py-2">
                        {new Date(item.diklasifikasi_pada).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              Belum ada riwayat klasifikasi.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
