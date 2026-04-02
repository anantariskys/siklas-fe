import { useDataTableModal } from "@/components/shared/data-table/data-table-context";
import { UserItem } from "@/services/admin/user/get-users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  UserCog,
  Mail,
  User as UserIcon,
  Lock,
  Shield,
  GraduationCap,
} from "lucide-react";
import { DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Loader } from "@/components/shared/loader";
import { UpdateUserPayload, updateUserSchema } from "@/schemas/user";
import { updateUser } from "@/services/admin/user/update-user";
import { toast } from "sonner";
import {
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditUserModal({ data }: { data: UserItem }) {
  const { closeModal } = useDataTableModal();
  const queryClient = useQueryClient();

  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      username: data.username,
      role: data.role,
      program_studi: data.program_studi || "NULL",
    },
  });

  const role = form.watch("role");

  const mutation = useMutation({
    mutationFn: (values: UpdateUserPayload) => updateUser(values, data.id),
    onSuccess: () => {
      toast.success("User berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal memperbarui user");
    },
  });

  const onSubmit = (values: UpdateUserPayload) => {
    mutation.mutate(values);
  };

  return (
    <DialogContent className="overflow-hidden border-none p-0 shadow-2xl sm:max-w-[600px]">
      <div className="border-b border-primary/10 bg-primary/5 px-6 pb-6 pt-8">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 rotate-3 transform items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform duration-300 hover:rotate-0">
            <UserCog className="h-7 w-7 text-white" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">
            Perbarui Pengguna
          </DialogTitle>
          <DialogDescription className="mt-1 max-w-[320px] font-medium text-slate-500">
            Modifikasi informasi akun pengguna ini. Kosongkan password jika
            tidak ingin mengubahnya.
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
                        placeholder="Nama lengkap"
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
                        placeholder="Username"
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
                        placeholder="user@example.com"
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
                      <Lock className="h-3 w-3 text-primary" /> Password Baru
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="•••••••• (Opsional)"
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
                        <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-semibold italic text-primary transition-all focus:bg-white">
                          <SelectValue placeholder="Pilih role" />
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
                    <FormItem className="col-span-2 sm:col-span-1">
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
                disabled={mutation.isPending}
              >
                Batalkan
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-11 px-8 font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {mutation.isPending ? <Loader size="sm" /> : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
