"use client";
import { useQuery } from "@tanstack/react-query";
import { getRiwayatByUser } from "@/services/user/riwayat/get-riwayat-by-user";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/shared/data-table";
import { getColumns } from "./columns";
import { useTableQuery } from "@/hooks/use-table-query";
import PreviewDosenModal from "./modal/preview-dosen";
import { useMemo } from "react";

export default function RiwayatPage() {
  const { data: session } = useSession();
  const { query, onSearch, onPageChange, onLimitChange, search } =
    useTableQuery(10);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["riwayat", session?.user?.id, query],
    queryFn: () => getRiwayatByUser({ userId: session?.user?.id || "" }, query),
    enabled: !!session?.user?.id,
  });

  const columns = useMemo(() => getColumns(false, false), []);

  console.log(session);

  return (
    <div className="container py-10">
      <DataTable
        title="Riwayat Klasifikasi"
        subtitle="Daftar hasil klasifikasi yang telah Anda lakukan"
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        showAddButton={false}
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
        modals={{
          previewDosen: (riwayat) =>
            riwayat ? <PreviewDosenModal data={riwayat} /> : null,
        }}
      />
    </div>
  );
}
