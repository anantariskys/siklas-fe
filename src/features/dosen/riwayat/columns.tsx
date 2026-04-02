"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { useDataTableModal } from "@/components/shared/data-table/data-table-context";
import { Button } from "@/components/ui/button";
import { RiwayatItem } from "@/services/user/riwayat/get-riwayat-by-user";

const ActionCell = ({ riwayat }: { riwayat: RiwayatItem }) => {
  const { openModal } = useDataTableModal<RiwayatItem>();

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => openModal("previewDosen", riwayat)}>
        Lihat dosen
      </Button>
    </div>
  );
};
export const getColumns = (
  isKaprodi: boolean = false,
  showAction: boolean = true
): ColumnDef<RiwayatItem>[] => {
  const columns: ColumnDef<RiwayatItem>[] = [
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
        <div className="line-clamp-6 max-w-[300px] font-medium">
          {row.original.abstrak || "-"}
        </div>
      ),
    },
    {
      accessorKey: "prediksi_topik",
      header: "Topik",
      cell: ({ row }) => (
        <Badge className="border-secondary/20 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary shadow-none hover:bg-secondary/10">
          {row.original.prediksi_topik}
        </Badge>
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

  if (showAction) {
    columns.push({
      header: "Aksi",
      cell: ({ row }) => <ActionCell riwayat={row.original} />,
    });
  }

  if (isKaprodi) {
    const mahasiswaColumn: ColumnDef<RiwayatItem> = {
      accessorKey: "user.name",
      header: "Mahasiswa",
      cell: ({ row }) => (
        <div className="font-semibold">{row.original.user?.name || "-"}</div>
      ),
    };
    // Insert after abstrak or at the beginning
    columns.splice(1, 0, mahasiswaColumn);
  }

  return columns;
};
