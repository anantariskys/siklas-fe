"use client";

import KlasifikasiPage from "@/features/mahasiswa/klasifikasi";
import { ClassifyProvider } from "@/features/mahasiswa/klasifikasi/context/classify-context";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/shared/loader";

export default function Klasifikasi() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  const role = session?.user?.role?.toLowerCase();

  const allowedRoles = ["mahasiswa", "dosen"];

  if (!allowedRoles.includes(role || "")) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
        <p className="text-muted-foreground">
          Anda tidak memiliki izin untuk melakukan klasifikasi judul skripsi.
        </p>
      </div>
    );
  }

  return (
    <ClassifyProvider>
      <KlasifikasiPage />
    </ClassifyProvider>
  );
}
