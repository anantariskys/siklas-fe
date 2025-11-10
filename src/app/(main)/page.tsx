"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const session = useSession();

  return (
    <>
      <div className=" grid grid-cols-8 gap-4 relative">
        <div className="bg-gray-50 col-span-3 p-6  text-sm">
          <h3 className="font-semibold text-base">Selamat Datang di SIKLAS</h3>
          <p className="text-gray-600 ">
            SIKLAS (Sistem Klasifikasi Skripsi) membantu Anda menentukan topik
            skripsi berdasarkan judul dan abstrak secara otomatis menggunakan
            algoritma Support Vector Machine (SVM). Gunakan browser terkini
            seperti Google Chrome atau Mozilla Firefox untuk pengalaman terbaik.
          </p>
        </div>
          <div className="col-span-3  bg-gray-50  p-6">
          <h4 className="font-semibold text-base">Rata-rata Hasil Klasifikasimu</h4>
          <p className="text-gray-600">Ringkasan akurasi klasifikasi skripsi Anda:</p>
          <div className="mt-4">
            <p className="text-2xl font-bold text-blue-600">92.3%</p>
            <p className="text-sm text-gray-600">Akurasi rata-rata dari 47 klasifikasi</p>
          </div>
        </div>
        <div className="col-span-2  bg-gray-50  p-6">
          <h4 className="font-semibold text-base">Profil Pengguna</h4>
          <p className="text-gray-600">Berikut adalah profil pengguna:</p>
          <div className="flex items-center mt-2">
            {session?.data?.user?.image && (
              <Image
                src={session.data.user.image}
                alt={session.data.user.name || ""}
                width={100}
                height={100}
              />
            )}
            <div className="ml-4">
              <p className="font-semibold text-base">
                {session?.data?.user?.name || ""}
              </p>
              <p className="text-gray-600">
                {session?.data?.user?.email || ""}
              </p>
            </div>
          </div>
        </div>
      
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {/* Total Klasifikasi */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Klasifikasi</h3>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
                <path d="m9 18-1.5-1.5"></path>
                <circle cx="5" cy="14" r="3"></circle>
              </svg>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">Jumlah klasifikasi yang dilakukan</p>
          </div>
        </div>

        {/* Bidang Terbanyak */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Bidang Terbanyak</h3>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-foreground">-</div>
            <p className="text-xs text-muted-foreground mt-1">Bidang penelitian paling sering</p>
          </div>
        </div>

        {/* Klasifikasi Bulan Ini */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Klasifikasi Bulan Ini</h3>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">Dalam 30 hari terakhir</p>
          </div>
        </div>

        {/* Akurasi Rata-rata */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Akurasi Rata-rata</h3>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-foreground">0%</div>
            <p className="text-xs text-muted-foreground mt-1">Confidence score model</p>
          </div>
        </div>
      </div>
    </>
  );
}
