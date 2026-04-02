import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  UserCog,
  User as UserIcon,
  GraduationCap,
  Microscope,
  PlusCircle,
} from "lucide-react";
import { DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Loader } from "@/components/shared/loader";
import {
  BidangPenelitianOption,
  getBidangPenelitianOptions,
} from "@/services/options/get-bidang-penelitian-options";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { DosenItem } from "@/services/admin/dosen/dosen";
import { updateDosen } from "@/services/admin/dosen/update-dosen";
import { toast } from "sonner";

const updateDosenSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi").max(255),
  gelar_awal: z.string().max(100).optional(),
  gelar_akhir: z.string().max(100).optional(),
  bidang_penelitian_major_id: z
    .string()
    .min(1, "Bidang penelitian utama wajib dipilih"),
  minors_id: z.array(z.string()).optional(),
});

export type UpdateDosenPayload = z.infer<typeof updateDosenSchema>;

interface EditDosenModalProps {
  data: DosenItem;
}

export default function EditDosenModal({ data }: EditDosenModalProps) {
  const { closeModal } = useDataTableModal();
  const form = useForm<UpdateDosenPayload>({
    resolver: zodResolver(updateDosenSchema),
    defaultValues: {
      nama: data.nama,
      gelar_awal: data.gelar_awal ?? "",
      gelar_akhir: data.gelar_akhir ?? "",
      bidang_penelitian_major_id: data.major?.id || "",
      minors_id: data.minors?.map((m) => m.id) || [],
    },
  });

  const queryClient = useQueryClient();

  const {
    data: bidangPenelitianOptions,
    isLoading: isLoadingBidangPenelitian,
  } = useQuery({
    queryKey: ["bidang-penelitian", "options"],
    queryFn: () => getBidangPenelitianOptions(),
  });

  const mutation = useMutation({
    mutationFn: (values: UpdateDosenPayload) => updateDosen(data.id, values),
    onSuccess: () => {
      toast.success("Data dosen berhasil diupdate");
      queryClient.invalidateQueries({ queryKey: ["dosens"], exact: false });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: UpdateDosenPayload) => {
    mutation.mutate(values);
  };

  const minorIds = form.watch("minors_id") || [];

  const addMinor = (id: string) => {
    if (!minorIds.includes(id)) {
      form.setValue("minors_id", [...minorIds, id]);
    }
  };

  const removeMinor = (id: string) => {
    form.setValue(
      "minors_id",
      minorIds.filter((mId) => mId !== id)
    );
  };

  const availableMinors =
    bidangPenelitianOptions?.data.filter(
      (opt) =>
        opt.id !== form.watch("bidang_penelitian_major_id") &&
        !minorIds.includes(opt.id)
    ) || [];

  return (
    <DialogContent className="overflow-hidden border-none p-0 shadow-2xl sm:max-w-[650px]">
      <div className="border-b border-primary/10 bg-primary/5 px-6 pb-6 pt-8">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 rotate-3 transform items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform duration-300 hover:rotate-0">
            <UserCog className="h-7 w-7 text-white" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">
            Perbarui Data Dosen
          </DialogTitle>
          <DialogDescription className="mt-1 max-w-[320px] font-medium text-slate-500">
            Silakan perbarui informasi profil dan kualifikasi akademik dosen di
            bawah ini.
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="custom-scrollbar max-h-[70vh] overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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
                name="gelar_awal"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <GraduationCap className="h-3 w-3 text-primary" /> Gelar
                      Awal
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Dr., Prof., dll"
                        className="h-11 border-slate-200 bg-slate-50/50 font-medium transition-all focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gelar_akhir"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <GraduationCap className="h-3 w-3 text-primary" /> Gelar
                      Akhir
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="S.T., M.T., dll"
                        className="h-11 border-slate-200 bg-slate-50/50 font-medium transition-all focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <div className="col-span-2 my-2 h-px bg-slate-100" />

              <FormField
                control={form.control}
                name="bidang_penelitian_major_id"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <Microscope className="h-3 w-3 text-primary" /> Bidang
                      Penelitian Utama
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          form.setValue("minors_id", []);
                        }}
                        defaultValue={field.value}
                        disabled={isLoadingBidangPenelitian}
                      >
                        <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-semibold italic text-primary transition-all focus:bg-white">
                          <SelectValue placeholder="Pilih bidang penelitian utama" />
                        </SelectTrigger>
                        <SelectContent>
                          {bidangPenelitianOptions?.data.map(
                            (opt: BidangPenelitianOption) => (
                              <SelectItem key={opt.id} value={opt.id}>
                                {opt.nama}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minors_id"
                render={() => (
                  <FormItem className="col-span-2">
                    <FormLabel className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <PlusCircle className="h-3 w-3 text-primary" /> Bidang
                      Penelitian Minor
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={addMinor}
                        value=""
                        disabled={
                          isLoadingBidangPenelitian ||
                          availableMinors.length === 0
                        }
                      >
                        <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-medium italic text-slate-500 transition-all focus:bg-white">
                          <SelectValue placeholder="Update bidang minor (opsional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMinors.map(
                            (opt: BidangPenelitianOption) => (
                              <SelectItem key={opt.id} value={opt.id}>
                                {opt.nama}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                    {minorIds.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
                        {minorIds.map((id) => {
                          const opt = bidangPenelitianOptions?.data.find(
                            (o) => o.id === id
                          );
                          return opt ? (
                            <Badge
                              key={id}
                              className="flex items-center gap-2 border-primary/10 bg-white px-3 py-1 text-primary shadow-sm transition-colors hover:bg-slate-50"
                            >
                              <span className="text-[10px] font-bold">
                                {opt.nama}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeMinor(id)}
                                className="text-rose-500 transition-colors hover:text-rose-700"
                              >
                                <X className="h-3 w-3 stroke-[3]" />
                              </button>
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-3 border-t bg-white pt-6 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                className="h-11 font-bold text-slate-500 hover:text-slate-700"
                onClick={() => {
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
                {mutation.isPending ? <Loader size="sm" /> : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
