import type { ReactNode } from "react";
import { Suspense } from "react";

import { AppHeader } from "@/components/AppHeader";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <Suspense
        fallback={
          <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
              <div className="h-4 w-40 rounded bg-zinc-200" />
              <div className="ml-auto h-11 w-20 rounded-xl bg-zinc-200" />
            </div>
          </div>
        }
      >
        <AppHeader />
      </Suspense>
      <main className="mx-auto w-full max-w-md px-4 py-5">{children}</main>
    </div>
  );
}

