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
    cell: ({ row }) => <Badge variant="secondary">{row.original.role}</Badge>,
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
