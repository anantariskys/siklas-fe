"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";
import { useTableQuery } from "@/hooks/use-table-query";
import { getDosens } from "@/services/admin/dosen/dosen";

export default function DosensPage() {
  const { data: session } = useSession();

  // Ambil pagination + search hooks
  const { query, onSearch, onPageChange, onLimitChange, search } =
    useTableQuery(10);

  // Query ke BE pakai query: { page, limit, search }
  const { data, isLoading } = useQuery({
    queryKey: ["dosens", query],
    queryFn: () => getDosens(query),
    enabled: !!session?.user?.id,
  });

  return (
    <div className="container py-10">
      <DataTable
        title="Daftar Dosen"
        subtitle="Daftar dosen yang terdaftar di aplikasi"
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        /** SEARCH FE KE BE */
        searchKey="nama"
        onSearchInput={onSearch}
        /** PAGINATION FE → BE */
        page={query.page}
        limit={query.limit}
        total={data?.pagination?.total ?? 0}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        searchValue={search}
      />
    </div>
  );
}
