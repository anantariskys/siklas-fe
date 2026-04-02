"use client";

import MahasiswaDashboard from "@/features/mahasiswa/dashboard";
import DosenDashboard from "@/features/dosen/dashboard";
import KaprodiDashboard from "@/features/kaprodi/dashboard";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/shared/loader";

export default function UserDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  const role = session?.user?.role?.toLowerCase();

  switch (role) {
    case "kaprodi":
      return <KaprodiDashboard />;
    case "dosen":
      return <DosenDashboard />;
    case "mahasiswa":
    default:
      return <MahasiswaDashboard />;
  }
}
