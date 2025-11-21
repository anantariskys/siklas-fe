/* eslint-disable */
"use client";
import React, { createContext, useContext, useState } from "react";

type ModalType = "add" | "edit" | "delete" | null;

interface DataTableModalContextType<T = any> {
  open: boolean;
  type: ModalType;
  data: T | null;
  openModal: (type: ModalType, data?: T) => void;
  closeModal: () => void;
}

const DataTableModalContext = createContext<DataTableModalContextType | null>(
  null
);

export function DataTableModalProvider<T>({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ModalType>(null);
  const [data, setData] = useState<T | null>(null);

  const openModal = (modalType: ModalType, payload?: T) => {
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

export function useDataTableModal<T>() {
  const ctx = useContext(DataTableModalContext);
  if (!ctx) throw new Error("Must be used inside DataTableModalProvider");
  return ctx as DataTableModalContextType<T>;
}
