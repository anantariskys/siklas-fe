"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiwayatItem } from "@/services/user/riwayat/get-riwayat-by-user";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<RiwayatItem>[] = [
  {
    accessorKey: "judul",
    header: "Judul",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate font-medium">
        {row.original.judul || "-"}
      </div>
    ),
  },
  {
    accessorKey: "prediksi_topik",
    header: "Topik",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.prediksi_topik}</Badge>
    ),
  },
  {
    accessorKey: "confidence_score",
    header: "Akurasi (%)",
    cell: ({ row }) => (
      <span>{Number(row.original.confidence_score).toFixed(2)} %</span>
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
          });

      return <span>{formattedDate}</span>;
    },
  },
];
