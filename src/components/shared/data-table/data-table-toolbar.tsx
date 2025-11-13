"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchKey?: string | number | symbol | undefined;
  onRefresh?: () => void;
}

export function DataTableToolbar({
  search,
  onSearchChange,
  searchKey,
  onRefresh,
}: ToolbarProps) {
  if (!searchKey) return null;

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Cari data..."
        value={search || ""}
        onChange={(e) => onSearchChange?.(e.target.value)}
        className="w-[300px]"
      />
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" /> Segarkan
        </Button>
      )}
    </div>
  );
}
