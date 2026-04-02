import { useQuery } from "@tanstack/react-query";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
    <DialogContent className="max-h-[80vh] w-full max-w-6xl overflow-y-auto p-6">
      <DialogTitle className="text-xl font-semibold text-gray-900">
        Dosen Relevan dengan Bidang:
        <span className="ml-2 text-indigo-600">{data.prediksi_topik}</span>
      </DialogTitle>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      )}

      {/* Data State */}
      {!isLoading && dosenData?.data.dosen?.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {dosenData.data.dosen.map((dosen) => (
            <Card
              key={dosen.nama}
              className="border border-gray-200 transition-all hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">
                  {dosen.gelar}
                  {dosen.nama}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                {dosen.major && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-700">Mayor:</span>
                    <Badge>{dosen.major}</Badge>
                  </div>
                )}

                {Array.isArray(dosen.minor) && dosen.minor.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Minor:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {dosen.minor.map((m: string) => (
                        <Badge key={m} variant="outline">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="py-10 text-center italic text-gray-500">
            Tidak ditemukan dosen yang relevan dengan bidang ini.
          </div>
        )
      )}
    </DialogContent>
  );
}
