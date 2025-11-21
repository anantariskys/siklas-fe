import { useDataTableModal } from "@/components/shared/data-table/data-table-context";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { deleteUser } from "@/services/admin/user/delete-user";
import { UserItem } from "@/services/admin/user/get-users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DeleteUserModal({ data }: { data: UserItem }) {
  const { closeModal } = useDataTableModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteUser(data.id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      toast.success("User berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menghapus user");
    },
  });

  return (
    <>
      <DialogTitle>Hapus User</DialogTitle>

      <div>
        <p>Apakah Anda yakin ingin menghapus pengguna ini?</p>
        <p className="text-red-500">
          Perhatian: Ini akan menghapus semua data pengguna dan tidak dapat
          dibatalkan.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => closeModal()}>
            Batal
          </Button>
          <Button
            type="submit"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Hapus
          </Button>
        </div>
      </div>
    </>
  );
}
