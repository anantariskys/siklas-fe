"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Breadcrumb from "./breadcrumb";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    toast.success("Logout berhasil!");
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="z-50 w-full bg-primary text-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex h-full items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 bg-gray-300/50" />
          <Breadcrumb />
        </div>

        {session?.user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400">
                  Welcome, {session.user.name}
                </span>
              </div>
              <ChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute right-0 z-40 mt-3 w-44 rounded-md bg-white py-1 text-gray-800 shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-100"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
