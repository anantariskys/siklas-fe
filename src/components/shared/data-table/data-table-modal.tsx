import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDataTableModal } from "./data-table-context";

export default function DataTableModals<TData>({
  addModal,
  editModal,
  deleteModal,
}: {
  addModal: React.ReactNode;
  editModal?: (data: TData) => React.ReactNode;
  deleteModal?: (data: TData) => React.ReactNode;
}) {
  const { open, type, data, closeModal } = useDataTableModal<TData>();

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        {type === "add" && addModal}
        {type === "edit" && data && editModal?.(data)}
        {type === "delete" && data && deleteModal?.(data)}
      </DialogContent>
    </Dialog>
  );
}
