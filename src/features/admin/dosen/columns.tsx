"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { DosenItem } from "@/services/admin/dosen/dosen";
import { useDataTableModal } from "@/components/shared/data-table/data-table-context";
import { Button } from "@/components/ui/button";

const ActionCell = ({ user }: { user: DosenItem }) => {
  const { openModal } = useDataTableModal<DosenItem>();

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => openModal("edit", user)}>
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => openModal("delete", user)}
      >
        Hapus
      </Button>
    </div>
  );
};
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
    header: "Bidang Penelitian",
    cell: ({ row }) => (
      <div className="flex justify-start">
        <Badge className="border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-none hover:bg-primary/10">
          {row.original.major?.nama || "-"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "minors",
    header: "Minat Penelitian",
    cell: ({ row }) => (
      <div className="flex justify-start">
        {row.original.minors?.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-1">
            {row.original.minors.map((m) => (
              <Badge
                key={m.id}
                className="border-secondary/20 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary shadow-none hover:bg-secondary/10"
              >
                {m.nama}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="px-2 text-xs font-medium text-muted-foreground">
            -
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Dibuat Pada",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = isNaN(date.getTime())
        ? "-"
        : date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

      return (
        <div className="text-sm font-medium text-slate-500">
          {formattedDate}
        </div>
      );
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => <ActionCell user={row.original} />,
  },
];
