"use client";

import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export function DataTablePagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: DataTablePaginationProps) {
  const lastPage = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
      <div className="text-sm text-gray-600">
        Halaman {page} dari {lastPage} • Total {total} data
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Sebelumnya
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= lastPage}
        >
          Selanjutnya
        </Button>

        <select
          className="border rounded-md px-2 py-1 text-sm"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[5, 10, 25, 50, 100].map((v) => (
            <option key={v} value={v}>
              {v} / halaman
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
