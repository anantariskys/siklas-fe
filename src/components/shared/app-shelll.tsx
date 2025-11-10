'use client'

import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navbar from './navbar'
import AppSidebar from './sidebar'
import Breadcrumb from './breadcrumb'


export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-col">
        {/* Navbar */}

        {/* Body area di bawah Navbar */}
        <div className="flex flex-1 ">
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
  )
}
