"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./navbar";
import AppSidebar from "./sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        {/* Navbar */}

        {/* Body area di bawah Navbar */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
            <Navbar />
            <div className="mt-4 p-4">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
