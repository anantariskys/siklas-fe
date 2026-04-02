"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/shared/loader";
import { LoginPayload, loginSchema } from "@/schemas/auth/login-schema";
import { env } from "process";

import {
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Database,
  GraduationCap,
} from "lucide-react";

export default function LoginPage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleAdminLogin = handleSubmit(async (data) => {
    setLoading(true);
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Username atau password salah");
      setLoading(false);
    } else {
      toast.success("Selamat datang kembali!");
      router.push("/");
      setLoading(false);
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#32415a] to-primary px-4">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl md:flex-row">
        {/* LEFT SIDE: Branding */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-secondary p-8 text-center md:w-[38%]">
          {/* Subtle Decorative Elements */}
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
              <Database className="h-7 w-7 text-white" />
            </div>
            <h1 className="mb-1.5Caps text-3xl font-extrabold leading-none tracking-widest text-white">
              SIKLAS
            </h1>
            <div className="mx-auto mb-6 h-1 w-8 rounded-full bg-white/30" />

            <p className="mx-auto max-w-[180px] text-[13px] font-medium leading-relaxed text-white/80">
              Sistem Informasi Klasifikasi Bidang Penelitian Skripsi
            </p>
          </div>

          <div className="relative z-10 mt-12 opacity-70">
            <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-white" />
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white">
              Encrypted Access
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="flex flex-col justify-center bg-white p-8 md:w-[62%] md:p-12">
          <div className="mb-8">
            <h2 className="mb-1 text-2xl font-bold text-slate-900">
              Selamat Datang
            </h2>
            <p className="text-[13px] font-medium text-slate-500">
              Silakan masuk ke akun Anda.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="pl-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Username
              </label>
              <div className="group relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-primary">
                  <User size={16} />
                </div>
                <input
                  {...register("username")}
                  placeholder="Username"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/5"
                />
              </div>
              {errors.username && (
                <p className="mt-1 pl-1 text-[9px] font-bold text-rose-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="pl-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <div className="group relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-primary">
                  <Lock size={16} />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 text-sm font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/5"
                />
              </div>
              {errors.password && (
                <p className="mt-1 pl-1 text-[9px] font-bold text-rose-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0"
                disabled={loading}
              >
                {loading ? (
                  <Loader size="sm" />
                ) : (
                  <>
                    <span>MASUK SEKARANG</span>
                    <ArrowRight className="h-4 w-4 opacity-70" />
                  </>
                )}
              </button>
            </div>
          </form>

          <footer className="mt-10 border-t border-slate-50 pt-6 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
              &copy; {new Date().getFullYear()} SIKLAS Team
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
