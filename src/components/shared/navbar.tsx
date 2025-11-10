"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Breadcrumb from "./breadcrumb";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className=" z-50 bg-primary w-full text-white shadow-sm">
      <div className="flex justify-between items-center px-6 h-16">
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
              <span>{session.user.email}</span>
              <ChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 shadow-lg rounded-md py-1">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
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
