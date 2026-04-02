"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UserItem } from "@/services/admin/user/get-users";
import { Button } from "@/components/ui/button";
import { useDataTableModal } from "@/components/shared/data-table/data-table-context";

// Komponen terpisah untuk cell "Aksi"
const ActionCell = ({ user }: { user: UserItem }) => {
  const { openModal } = useDataTableModal<UserItem>();

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

export const columns: ColumnDef<UserItem>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate font-medium">
        {row.original.name || "-"}
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate font-medium">
        {row.original.username || "-"}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate font-medium">
        {row.original.email || "-"}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role?.toLowerCase();
      if (role === "admin")
        return (
          <Badge className="border-slate-200 bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-none hover:bg-slate-100">
            Admin
          </Badge>
        );
      if (role === "kaprodi")
        return (
          <Badge className="border-violet-100 bg-violet-50 text-[10px] font-bold uppercase tracking-wider text-violet-700 shadow-none hover:bg-violet-50">
            Kaprodi
          </Badge>
        );
      if (role === "dosen")
        return (
          <Badge className="border-emerald-100 bg-emerald-50 text-[10px] font-bold uppercase tracking-wider text-emerald-700 shadow-none hover:bg-emerald-50">
            Dosen
          </Badge>
        );
      if (role === "mahasiswa")
        return (
          <Badge className="border-orange-100 bg-orange-50 text-[10px] font-bold uppercase tracking-wider text-orange-700 shadow-none hover:bg-orange-50">
            Mahasiswa
          </Badge>
        );
      return (
        <Badge
          variant="secondary"
          className="text-[10px] font-bold uppercase tracking-wider"
        >
          {row.original.role}
        </Badge>
      );
    },
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

      return <span>{formattedDate}</span>;
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => <ActionCell user={row.original} />,
  },
];
