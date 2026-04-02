/* eslint-disable */
"use client";

import React, { createContext, useContext, useState } from "react";

export type ModalType = string; // bebas, tidak dikunci lagi

export interface DataTableModalContextType<TData> {
  open: boolean;
  type: ModalType | null;
  data: TData | null;
  openModal: (type: ModalType, data?: TData) => void;
  closeModal: () => void;
}

const DataTableModalContext = createContext<
  DataTableModalContextType<any> | undefined
>(undefined);

export function DataTableModalProvider<TData>({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ModalType | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const openModal = (modalType: ModalType, payload?: TData) => {
    setType(modalType);
    setData(payload || null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setType(null);
    setData(null);
  };

  return (
    <DataTableModalContext.Provider
      value={{ open, type, data, openModal, closeModal }}
    >
      {children}
    </DataTableModalContext.Provider>
  );
}

export function useDataTableModal<TData>() {
  const context = useContext(DataTableModalContext);
  if (!context) {
    throw new Error(
      "useDataTableModal must be used within DataTableModalProvider"
    );
  }
  return context as DataTableModalContextType<TData>;
}
