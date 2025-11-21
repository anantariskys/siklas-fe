"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { RiwayatItem } from "@/services/admin/riwayat/get-riwayats";

export const columns: ColumnDef<RiwayatItem>[] = [
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => (
      <div className="max-w-[300px] font-medium">
        {row.original.judul || "-"}
      </div>
    ),
  },
  {
    accessorKey: "prediksi_topik",
    header: () => <div className="text-center">Prediksi Topik</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge className="font-semibold text-xs text-center px-3 py-1">
          {row.original.prediksi_topik || "-"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: () => <div className="text-center">Pengguna</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-semibold text-gray-900">
          {row.original.user?.name || "-"}
        </div>
        {/* <div className="text-sm text-gray-600">
          @{row.original.user?.username || "-"}
        </div>
        <div className="text-xs text-gray-500">
          {row.original.user?.email || "-"}
        </div> */}
      </div>
    ),
  },
  {
    accessorKey: "confidence_score",
    header: () => <div className="text-center">Confidence Score</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.confidence_score !== null &&
        row.original.confidence_score !== undefined
          ? `${Number(row.original.confidence_score).toFixed(2)}%`
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "diklasifikasi_pada",
    header: () => <div className="text-center">Diklasifikasi Pada</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.diklasifikasi_pada);
      const formattedDate = isNaN(date.getTime())
        ? "-"
        : date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

      return <div className="text-center">{formattedDate}</div>;
    },
  },
];
