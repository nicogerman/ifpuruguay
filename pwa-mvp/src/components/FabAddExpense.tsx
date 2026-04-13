"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function FabAddExpense() {
  const sp = useSearchParams();
  const p = sp.get("p");
  const href = p ? `/expenses/new?p=${encodeURIComponent(p)}` : "/expenses/new";

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <Link
        href={href}
        aria-label="Agregar gasto"
        className="grid size-16 place-items-center rounded-full bg-zinc-950 text-white shadow-lg shadow-zinc-950/20 ring-1 ring-zinc-950/10 transition active:translate-y-px active:shadow-none"
      >
        <span className="text-3xl leading-none">+</span>
      </Link>
    </div>
  );
}

