"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";
import { getUsers } from "@/services/admin/user/get-users";
import { useTableQuery } from "@/hooks/use-table-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import CreateUserModal from "./modal/create";
import DeleteUserModal from "./modal/delete";
import EditUserModal from "./modal/edit";

// type khusus agar muncul autocomplete
export type RoleFilter = "KAPRODI" | "DOSEN" | "MAHASISWA" | "all" | undefined;

export default function UsersPage() {
  const { data: session } = useSession();

  const { query, onSearch, onPageChange, onLimitChange, search } =
    useTableQuery(10);

  const [filterRole, setFilterRole] = useState<RoleFilter>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["users", { ...query, role: filterRole }],
    queryFn: () => getUsers({ ...query, role: filterRole }),
    enabled: !!session?.user?.id,
  });

  return (
    <div className="container py-10">
      <DataTable
        title="Daftar User"
        subtitle="Daftar user yang terdaftar di aplikasi"
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        searchKey="name"
        onSearchInput={onSearch}
        page={query.page}
        limit={query.limit}
        total={data?.pagination?.total ?? 0}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        searchValue={search}
        addModal={<CreateUserModal />}
        deleteModal={(user) => <DeleteUserModal data={user} />}
        editModal={(user) => <EditUserModal data={user} />}
        toolbarExtra={
          <div className="flex items-center gap-3">
            <Select
              value={filterRole ?? "all"}
              onValueChange={(value) => {
                setFilterRole((prev) => {
                  // klik ulang role sama = hapus filter
                  if (prev === value) return undefined;

                  // pilih all = reset
                  if (value === "all") return undefined;

                  return value as RoleFilter;
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Semua Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="KAPRODI">Kaprodi</SelectItem>
                <SelectItem value="DOSEN">Dosen</SelectItem>
                <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}
