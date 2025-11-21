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

export default function LoginPage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
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
      toast.error("Login gagal");
      setLoading(false);
    } else {
      router.push("/"); // manual redirect
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32415a] to-primary px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* KIRI */}
        <div className="md:w-1/2 bg-secondary text-white flex flex-col items-center justify-center p-10">
          <p className="font-bold text-4xl tracking-wider">SIKLAS</p>
          <p className="mt-3 text-sm opacity-90 text-center leading-relaxed max-w-[240px]">
            Sistem Informasi Klasifikasi Bidang Penelitian Skripsi
          </p>
        </div>

        {/* KANAN */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Sign In to Your Account
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div>
                  <Label>Username</Label>
                  <Input
                    placeholder="Enter your username"
                    {...control.register("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...control.register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-white"
                  disabled={loading}
                >
                  {loading ? <Loader size="sm" /> : "Login"}
                </Button>
              </form>
            </CardContent>

            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
