"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { demoProperties } from "@/lib/demoData";

function buildHref(pathname: string, searchParams: URLSearchParams) {
  const qs = searchParams.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = sp.get("p") ?? demoProperties[0]?.id ?? "casa";
  const searchParams = new URLSearchParams(sp.toString());
  if (!searchParams.get("p")) searchParams.set("p", current);

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-zinc-950">
              Finanzas Propiedades
            </span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
              demo
            </span>
          </div>

          <label className="mt-2 flex items-center gap-2">
            <span className="sr-only">Propiedad</span>
            <select
              value={current}
              onChange={(e) => {
                const next = e.target.value;
                const nextParams = new URLSearchParams(sp.toString());
                nextParams.set("p", next);
                router.replace(buildHref(pathname, nextParams));
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm outline-none ring-zinc-950/10 focus:ring-4"
            >
              {demoProperties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Link
          href={`/expenses/new?${searchParams.toString()}`}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white shadow-sm ring-zinc-950/20 transition active:translate-y-px active:shadow-none"
        >
          + Gasto
        </Link>
      </div>
    </header>
  );
}

