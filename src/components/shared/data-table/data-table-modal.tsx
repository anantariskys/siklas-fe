import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDataTableModal } from "./data-table-context";

type ModalMap<TData> = {
  [key: string]: (data?: TData) => React.ReactNode;
};

export default function DataTableModals<TData>({
  modals,
}: {
  modals: ModalMap<TData>;
}) {
  const { open, type, data, closeModal } = useDataTableModal<TData>();

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      {type && modals[type]?.(data || undefined)}
    </Dialog>
  );
}
