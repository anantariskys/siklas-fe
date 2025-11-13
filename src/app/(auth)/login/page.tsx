"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Langsung ke dashboard aja
    }
  }, [status, router]);

  const handleLogin = () => {
    signIn("google");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#32415a] to-primary">
      <div className="w-full max-w-3xl bg-white shadow-md text-center flex flex-col md:flex-row overflow-hidden rounded-md">
        {/* Kiri */}
        <div className="md:w-1/2 bg-secondary flex flex-col items-center justify-center p-10 text-white">
          <p className="font-semibold text-4xl tracking-wide">SIKLAS</p>
          <p className="mt-3 text-sm text-gray-200 max-w-[220px] leading-relaxed">
            Sistem Informasi Klasifikasi Bidang Penelitian Skripsi
          </p>
        </div>

        {/* Kanan */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center bg-white">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Selamat Datang 👋
          </h1>
          <p className="text-gray-500 mb-8 text-sm text-center max-w-sm">
            Silakan login menggunakan akun Google UB Anda
          </p>

          <button
            onClick={handleLogin}
            className="flex items-center justify-center w-full max-w-sm gap-3 py-2 bg-primary text-white font-medium rounded-sm shadow-sm hover:bg-primary/90 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="22"
              height="22"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.2 0 5.4 1.4 6.6 2.6l4.8-4.8C32.6 4.8 28.7 3 24 3 14.8 3 7.2 8.9 4.3 17.1l5.6 4.3C11.6 14 17.3 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.8c-.6 3.4-2.7 6.3-5.7 8.3l5.4 4.2c3.1-2.9 4.9-7.2 4.9-12.2z"
              />
              <path
                fill="#4A90E2"
                d="M9.9 28.7c-.7-2-1.1-4.2-1.1-6.7s.4-4.7 1.1-6.7l-5.6-4.3C2.6 14.6 1.5 19.1 1.5 24s1.1 9.4 2.8 13l5.6-4.3z"
              />
              <path
                fill="#FBBC05"
                d="M24 46c6.5 0 12-2.1 16-5.8l-5.4-4.2c-2.2 1.5-5 2.5-8.5 2.5-6.7 0-12.4-4.5-14.5-10.6l-5.6 4.3C7.2 39.1 14.8 46 24 46z"
              />
            </svg>
            <span>Login dengan Google</span>
          </button>

          <p className="text-xs text-gray-400 mt-6">
            Hanya akun <strong>@student.ub.ac.id</strong> yang dapat login
          </p>
        </div>
      </div>
    </div>
  );
}
