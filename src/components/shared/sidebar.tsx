"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, Users, BarChart3, Users2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const userMenu = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Klasifikasi", href: "/klasifikasi", icon: Users },
  { label: "Riwayat", href: "/riwayat", icon: BarChart3 },
];

const adminMenu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "User", href: "/admin/users", icon: Users },
  { label: "Data Dosen", href: "/admin/dosens", icon: Users2 },

  { label: "Riwayat Klasifikasi", href: "/admin/riwayat", icon: BarChart3 },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // ============================
  //   LOADING STATE WITH SKELETON
  // ============================
  if (status === "loading") {
    return (
      <Sidebar
        variant="inset"
        className="border-r w-64 hidden md:flex min-h-screen"
      >
        <SidebarHeader className="px-4 py-4">
          <Skeleton className="h-5 w-32" />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4">
              <Skeleton className="h-4 w-20" />
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Skeleton className="h-4 w-4 rounded-md" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  // ============================
  //       ROLE MENU HANDLING
  // ============================
  const role = session?.user?.role;
  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <Sidebar variant="inset" className="border-r w-64 hidden md:flex">
      <SidebarHeader className="px-4 py-4">
        <h1 className="font-semibold text-secondary text-lg">
          Siklas <span className="text-gray-200">FILKOM</span>
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-slate-300 text-sm font-semibold">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                        pathname === item.href
                          ? "bg-slate-300 text-white"
                          : "text-slate-300 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
