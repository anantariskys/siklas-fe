import AppShell from "@/components/shared/app-shelll";
import React from "react";

export const metadata = {
  title: "Siklas Dashboard",
  description: "Dashboard layout with navigation and sidebar",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
