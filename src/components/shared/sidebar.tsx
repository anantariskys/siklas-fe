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
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Users2,
  FileSearch,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface MenuItem {
  label: string;
  href: string;
  icon: any;
}

const adminMenu: MenuItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "User", href: "/admin/users", icon: Users },
  { label: "Data Dosen", href: "/admin/dosens", icon: Users2 },
  { label: "Riwayat Klasifikasi", href: "/admin/riwayat", icon: BarChart3 },
];

const kaprodiMenu: MenuItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Riwayat", href: "/riwayat", icon: BarChart3 },
];

const dosenMenu: MenuItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Klasifikasi", href: "/klasifikasi", icon: FileSearch },
  { label: "Riwayat", href: "/riwayat", icon: BarChart3 },
];

const mahasiswaMenu: MenuItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Klasifikasi", href: "/klasifikasi", icon: FileSearch },
  { label: "Riwayat", href: "/riwayat", icon: BarChart3 },
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
        className="hidden min-h-screen w-64 border-r md:flex"
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
  const role = session?.user?.role?.toLowerCase();

  let menuItems: MenuItem[] = [];

  switch (role) {
    case "admin":
      menuItems = adminMenu;
      break;
    case "kaprodi":
      menuItems = kaprodiMenu;
      break;
    case "dosen":
      menuItems = dosenMenu;
      break;
    case "mahasiswa":
    default:
      menuItems = mahasiswaMenu;
      break;
  }

  return (
    <Sidebar variant="inset" className="hidden w-64 border-r md:flex">
      <SidebarHeader className="px-4 py-4">
        <h1 className="text-lg font-semibold text-secondary">
          Siklas <span className="text-gray-200">FILKOM</span>
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-sm font-semibold text-slate-300">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-md px-4 py-2 transition-colors ${
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
