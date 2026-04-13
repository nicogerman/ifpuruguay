import Link from "next/link";

import { ExpenseQuickForm } from "@/components/ExpenseQuickForm";
import { demoProperties } from "@/lib/demoData";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getFirst(sp: Record<string, string | string[] | undefined>, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

export default async function NewExpensePage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const propertyId = getFirst(sp, "p") ?? demoProperties[0]?.id ?? "casa";
  const propertyName =
    demoProperties.find((p) => p.id === propertyId)?.name ?? "Propiedad";

  const backHref = `/?p=${encodeURIComponent(propertyId)}`;

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
            Agregar gasto
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            4 campos, carga rápida (mobile-first)
          </p>
        </div>
        <Link
          href={backHref}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-950 shadow-sm ring-zinc-950/10 transition active:translate-y-px active:shadow-none"
        >
          Volver
        </Link>
      </div>

      <ExpenseQuickForm propertyName={propertyName} />
    </section>
  );
}

