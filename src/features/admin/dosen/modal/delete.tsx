import { useDataTableModal } from "@/components/shared/data-table/data-table-context";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { deleteDosen } from "@/services/admin/dosen/delete-dosen";
import { DosenItem } from "@/services/admin/dosen/dosen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, AlertTriangle } from "lucide-react";
import { DialogHeader } from "@/components/ui/dialog";

export default function DeleteDosenModal({ data }: { data: DosenItem }) {
  const { closeModal } = useDataTableModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteDosen(data.id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["dosens"], exact: false });
      toast.success("Dosen berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menghapus dosen");
    },
  });

  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <div className="flex flex-col items-center justify-center pb-2 pt-4">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-rose-100 bg-rose-50">
            <Trash2 className="h-7 w-7 text-rose-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Hapus Data Dosen
          </DialogTitle>
          <p className="mt-2 px-6 text-center text-sm text-slate-500">
            Apakah Anda yakin ingin menghapus data dosen ini secara permanen
            dari basis data?
          </p>
        </div>
      </DialogHeader>

      <div className="my-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Informasi Dosen
            </span>
          </div>
          <div className="pl-4">
            <span className="mt-0.5 block text-sm font-black text-slate-700">
              {[data.gelar_awal, data.nama, data.gelar_akhir]
                .filter(Boolean)
                .join(" ")}
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-tight text-slate-400">
              Bidang Fokus:
            </span>
            <span className="block truncate text-xs font-semibold text-slate-500">
              {data.major?.nama || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Button
          variant="destructive"
          className="h-11 w-full font-bold transition-all active:scale-95"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader size="sm" /> : "Ya, Hapus Sekarang"}
        </Button>
        <Button
          variant="ghost"
          className="h-11 w-full font-semibold text-slate-500 hover:bg-slate-100"
          onClick={() => closeModal()}
          disabled={mutation.isPending}
        >
          Batalkan
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-rose-200 bg-rose-50/50 px-6 py-2">
        <AlertTriangle className="h-3 w-3 shrink-0 text-rose-600" />
        <span className="text-[10px] font-bold leading-tight text-rose-700">
          Tindakan ini tidak dapat dibatalkan setelah dikonfirmasi.
        </span>
      </div>
    </DialogContent>
  );
}
