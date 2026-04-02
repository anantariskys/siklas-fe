import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDataTableModal } from "@/components/shared/data-table/data-table-context";
import {
  UserPlus,
  Mail,
  User as UserIcon,
  Lock,
  Shield,
  GraduationCap,
} from "lucide-react";
import { DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Loader } from "@/components/shared/loader";
import { CreateUserPayload, createUserSchema } from "@/schemas/user";
import { createUser } from "@/services/admin/user/create-user";
import { toast } from "sonner";

export default function CreateUserModal() {
  const { closeModal } = useDataTableModal();
  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "",
      program_studi: "NULL",
    },
  });

  const role = form.watch("role");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      form.reset();
      toast.success("User berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: CreateUserPayload) => {
    mutation.mutate(values);
  };

  return (
    <DialogContent className="overflow-hidden border-none p-0 shadow-2xl sm:max-w-[600px]">
      <div className="border-b border-primary/10 bg-primary/5 px-6 pb-6 pt-8">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 -rotate-3 transform items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform duration-300 hover:rotate-0">
            <UserPlus className="h-7 w-7 text-white" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">
            Tambah Pengguna Baru
          </DialogTitle>
          <DialogDescription className="mt-1 max-w-[320px] font-medium text-slate-500">
            Silakan lengkapi formulir di bawah ini untuk menambahkan akun baru
            ke dalam sistem.
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <UserIcon className="h-3 w-3 text-primary" /> Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contoh: Ahmad FauZi"
                        className="h-11 border-slate-200 bg-slate-50/50 font-medium transition-all focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <UserIcon className="h-3 w-3 text-primary" /> Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ahmadfauzi123"
                        className="h-11 border-slate-200 bg-slate-50/50 font-medium transition-all focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <Mail className="h-3 w-3 text-primary" /> Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="ahmad@email.com"
                        className="h-11 border-slate-200 bg-slate-50/50 font-medium transition-all focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <Lock className="h-3 w-3 text-primary" /> Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="h-11 border-slate-200 bg-slate-50/50 font-medium transition-all focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem
                    className={
                      role === "mahasiswa"
                        ? "col-span-2 sm:col-span-1"
                        : "col-span-2"
                    }
                  >
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <Shield className="h-3 w-3 text-primary" /> Role Akses
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value !== "mahasiswa") {
                            form.setValue("program_studi", "NULL");
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-semibold transition-all focus:bg-white">
                          <SelectValue placeholder="Pilih role akses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                          <SelectItem value="kaprodi">Kaprodi</SelectItem>
                          <SelectItem value="dosen">Dosen</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              {role === "mahasiswa" && (
                <FormField
                  control={form.control}
                  name="program_studi"
                  render={({ field }) => (
                    <FormItem className="col-span-2 duration-300 animate-in fade-in slide-in-from-top-2 sm:col-span-1">
                      <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        <GraduationCap className="h-3 w-3 text-primary" />{" "}
                        Program Studi
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-semibold italic text-primary transition-all focus:bg-white">
                            <SelectValue placeholder="Pilih prodi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PTI">PTI</SelectItem>
                            <SelectItem value="SI">SI</SelectItem>
                            <SelectItem value="TI">TI</SelectItem>
                            <SelectItem value="TIF">TIF</SelectItem>
                            <SelectItem value="TEKKOM">TEKKOM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <DialogFooter className="gap-3 border-t pt-4 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                className="h-11 font-bold text-slate-500 hover:text-slate-700"
                onClick={() => {
                  form.reset();
                  closeModal();
                }}
              >
                Batalkan
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-11 px-8 font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {mutation.isPending ? <Loader size="sm" /> : "Simpan Akun"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
