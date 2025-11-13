"use client";
import { useQuery } from "@tanstack/react-query";
import { getRiwayatByUser } from "@/services/riwayat/get-riwayat-by-user";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";

export default function RiwayatPage() {
  const { data: session } = useSession();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["riwayat", session?.user?.id],
    queryFn: () => getRiwayatByUser({ userId: session?.user?.id || "" }),
    enabled: !!session?.user?.id,
  });

  console.log(session);

  return (
    <div className="container py-10">
      <DataTable
        title="Riwayat Klasifikasi"
        subtitle="Daftar hasil klasifikasi yang pernah Anda lakukan"
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        searchKey="judul"
      />
    </div>
  );
}
