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
    accessorKey: "abstrak",
    header: "Abstrak",
    cell: ({ row }) => (
      <div className="line-clamp-3 max-w-[400px] text-sm text-gray-700">
        {row.original.abstrak || "-"}
      </div>
    ),
  },
  {
    accessorKey: "prediksi_topik",
    header: "Topik",
    cell: ({ row }) => (
      <div className="flex justify-start">
        <Badge className="border-secondary/20 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary shadow-none hover:bg-secondary/10">
          {row.original.prediksi_topik || "-"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "Pengguna",
    cell: ({ row }) => (
      <div className="flex flex-col">
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
    header: "Confidence",
    cell: ({ row }) => (
      <div className="font-medium text-slate-700">
        {row.original.confidence_score !== null &&
        row.original.confidence_score !== undefined
          ? `${Number(row.original.confidence_score).toFixed(2)}%`
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "diklasifikasi_pada",
    header: "Diklasifikasi Pada",
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

      return (
        <div className="text-sm font-medium text-slate-500">
          {formattedDate}
        </div>
      );
    },
  },
];
