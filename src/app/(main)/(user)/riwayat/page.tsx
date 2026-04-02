"use client";

import MahasiswaRiwayat from "@/features/mahasiswa/riwayat";
import DosenRiwayat from "@/features/dosen/riwayat";
import KaprodiRiwayat from "@/features/kaprodi/riwayat";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/shared/loader";

export default function Riwayat() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  const role = session?.user?.role?.toLowerCase();

  switch (role) {
    case "kaprodi":
      return <KaprodiRiwayat />;
    case "dosen":
      return <DosenRiwayat />;
    case "mahasiswa":
    default:
      return <MahasiswaRiwayat />;
  }
}
