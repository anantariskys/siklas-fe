"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      toast.error(error?.message || "Terjadi kesalahan saat memuat data");
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: `
                !rounded-xl !shadow-xl !border
                !backdrop-blur-md
                !bg-secondary/90 !text-foreground
                !transition-all !duration-300
                hover:!bg-secondary/100
              `,
              description: "!text-muted-foreground/90",
              actionButton: `
                !bg-primary !text-primary-foreground 
                !rounded-lg hover:!brightness-110 transition
              `,
              closeButton: `
                !text-foreground hover:!text-primary transition
              `,
            },
          }}
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}
