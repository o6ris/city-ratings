"use client";

import { UserProvider } from "@/modules/providers/UserProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
