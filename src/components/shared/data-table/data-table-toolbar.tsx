"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useDataTableModal } from "./data-table-context";
interface ToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchKey?: string | number | symbol | undefined;
  onRefresh?: () => void;
  children?: React.ReactNode;
  showAddButton?: boolean; // cuma flag, bukan ReactNode
}

export function DataTableToolbar<TData>({
  search,
  onSearchChange,
  searchKey,
  onRefresh,
  children,
  showAddButton = true,
}: ToolbarProps) {
  const { openModal } = useDataTableModal<TData>();
  if (!searchKey && !children && !showAddButton && !onRefresh) return null;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {searchKey && (
          <Input
            placeholder="Cari data..."
            value={search || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-[300px]"
          />
        )}

        {/* SLOT FILTER TAMBAHAN */}
        {children}
      </div>

      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Segarkan
        </Button>
      )}
      {/* SLOT MODAL TAMBAHAN */}
      {showAddButton && (
        <Button
          className="bg-primary"
          size="sm"
          onClick={() => openModal("add")}
        >
          Tambah
        </Button>
      )}
    </div>
  );
}
