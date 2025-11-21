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
import { toast } from "sonner";
import { UpdateUserPayload, updateUserSchema } from "@/schemas/user";
import { Loader2 } from "lucide-react";
import { updateUser } from "@/services/admin/user/update-user";
import { DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
    },
  });

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
    <>
      <DialogTitle>Edit User</DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nama lengkap" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Username" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="user@example.com"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Kosongkan jika tidak ingin mengubah"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                      <SelectItem value="kaprodi">Kaprodi</SelectItem>
                      <SelectItem value="dosen">Dosen</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                closeModal();
              }}
              disabled={mutation.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
