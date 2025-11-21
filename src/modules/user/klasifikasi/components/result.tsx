"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ClassifyResponse } from "@/services/classify";
import { GetDosenByBidangPenelitianResponse } from "@/services/user/dosen/get-dosen-by-bidang-penelitian";

interface ResultProps {
  result: ClassifyResponse;
  dosenList: GetDosenByBidangPenelitianResponse["data"]["dosen"] | null;
  loadingDosen: boolean;
}

export default function Result({
  dosenList,
  loadingDosen,
  result,
}: ResultProps) {
  const confidenceValue = Number(result?.confidence ?? 0);
  const confidencePercent = confidenceValue.toFixed(2);

  const pieData = [
    { name: "Confidence", value: confidenceValue },
    { name: "Remaining", value: 100 - confidenceValue },
  ];

  const COLORS = ["#4F46E5", "#E5E7EB"]; // ungu + abu cubic

  return (
    <div className="flex flex-1 bg-gray-50">
      <div className="w-full space-y-8">
        {/* ===================== */}
        {/*   CARD HASIL KLASIFIKASI */}
        {/* ===================== */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Hasil Klasifikasi
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* Pie Chart */}
            <div className="w-full h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <p className="text-center -mt-20 text-lg font-semibold text-gray-800">
                {confidencePercent}%
              </p>
              <p className="text-center text-sm text-gray-500">Confidence</p>
            </div>

            {/* Text Info */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Kategori:
                </p>
                <Badge className="text-sm px-3 py-1">{result.kategori}</Badge>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Confidence:
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {confidencePercent}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===================== */}
        {/*       LIST DOSEN     */}
        {/* ===================== */}
        <h2 className="text-xl font-semibold text-gray-900">
          Dosen dengan bidang penelitian serupa
        </h2>

        {loadingDosen ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-32 rounded-lg" />
            ))}
          </div>
        ) : dosenList && dosenList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dosenList.map((dosen) => (
              <Card
                key={dosen.nama + dosen.major}
                className="hover:shadow-md hover:bg-gray-50 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-gray-800">
                    {dosen.nama}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{dosen.gelar}</p>
                </CardHeader>

                <CardContent className="space-y-2">
                  {/* Mayor */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      Mayor:
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {dosen.major}
                    </Badge>
                  </div>

                  {/* Minor */}
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Minor:
                    </span>
                    {dosen.minor.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {dosen.minor.map((m) => (
                          <Badge key={m} variant="outline" className="text-xs">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">-</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada dosen yang cocok.</p>
        )}
      </div>
    </div>
  );
}
