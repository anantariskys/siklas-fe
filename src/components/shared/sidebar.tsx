"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Klasifikasi", href: "/klasifikasi", icon: Users },
  { label: "Riwayat", href: "/riwayat", icon: BarChart3 },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" className="border-r w-64 hidden md:flex">
      <SidebarHeader className="">
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
