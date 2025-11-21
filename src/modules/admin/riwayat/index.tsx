"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";
import { useTableQuery } from "@/hooks/use-table-query";
import { getRiwayats } from "@/services/admin/riwayat/get-riwayats";

export default function RiwayatsPage() {
  const { data: session } = useSession();

  // Ambil pagination + search hooks
  const { query, onSearch, onPageChange, onLimitChange, search } =
    useTableQuery(10);

  // Query ke BE pakai query: { page, limit, search }
  const { data, isLoading } = useQuery({
    queryKey: ["riwayats", query],
    queryFn: () => getRiwayats(query),
    enabled: !!session?.user?.id,
  });

  return (
    <div className="container py-10">
      <DataTable
        title="Daftar Riwayat"
        subtitle="Daftar riwayat klasifikasi yang terdaftar di aplikasi"
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        /** SEARCH FE KE BE */
        searchKey="judul"
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
