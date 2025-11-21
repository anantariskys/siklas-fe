"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { DosenItem } from "@/services/admin/dosen/dosen";

export const columns: ColumnDef<DosenItem>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => {
      const { nama, gelar_awal, gelar_akhir } = row.original;
      const displayName = [
        gelar_awal ? `${gelar_awal} ` : "",
        nama,
        gelar_akhir ? ` ${gelar_akhir}` : "",
      ].join("");
      return (
        <div className="max-w-[300px] truncate font-medium">
          {displayName || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "major",
    header: () => <div className="text-center">Bidang Penelitian</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge className="font-semibold text-xs text-center px-3 py-1">
          {row.original.major.nama || "-"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "minors",
    header: () => <div className="text-center">Minat Penelitian</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.minors.length > 0 ? (
          <div className="flex flex-wrap gap-1 justify-center">
            {row.original.minors.map((m) => (
              <Badge
                key={m.id}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {m.nama}
              </Badge>
            ))}
          </div>
        ) : (
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            -
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-center">Dibuat Pada</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = isNaN(date.getTime())
        ? "-"
        : date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

      return <div className="text-center">{formattedDate}</div>;
    },
  },
];
