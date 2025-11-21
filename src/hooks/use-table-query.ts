import { DatatableQuery } from "@/types/data-table";
import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "./use-debounce";

export function useTableQuery(defaultLimit = 10) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const onPageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const onLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const onSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return {
    page,
    limit,
    search,
    onPageChange,
    onLimitChange,
    onSearch,

    query: {
      page,
      limit,
      search: debouncedSearch,
    } as DatatableQuery,
  };
}
