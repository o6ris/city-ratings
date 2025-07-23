"use client";

import { UserProvider } from "@/modules/providers/UserProvider";
import { ToastProvider } from "@/modules/providers/ToastProvider";
import Toastbar from "@/components/ui/Toastbar/Toastbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <Toastbar />
      <UserProvider>{children}</UserProvider>
    </ToastProvider>
  );
}
