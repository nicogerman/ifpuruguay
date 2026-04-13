import Link from "next/link";
import { Suspense } from "react";

import { FabAddExpense } from "@/components/FabAddExpense";
import { getDemoExpenses, demoProperties } from "@/lib/demoData";
import { daysUntil, formatUyu, formatYmdToShortEs } from "@/lib/format";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getFirst(sp: Record<string, string | string[] | undefined>, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const propertyId = getFirst(sp, "p") ?? demoProperties[0]?.id ?? "casa";
  const propertyName =
    demoProperties.find((p) => p.id === propertyId)?.name ?? "Propiedad";

  const today = new Date();
  const expenses = getDemoExpenses(today).filter((e) => e.propertyId === propertyId);

  const ym = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const isThisMonth = (ymd: string) => ymd.startsWith(ym);

  const totalThisMonth = expenses
    .filter((e) => !e.paid && isThisMonth(e.dueDate))
    .reduce((acc, e) => acc + e.amountUyu, 0);

  const paidThisMonth = expenses
    .filter((e) => e.paid && isThisMonth(e.dueDate))
    .reduce((acc, e) => acc + e.amountUyu, 0);

  const accumulated = expenses.reduce((acc, e) => acc + e.amountUyu, 0);

  const upcoming = expenses
    .filter((e) => !e.paid)
    .slice()
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 8);

  const pQs = `p=${encodeURIComponent(propertyId)}`;

  return (
    <>
      <section className="space-y-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600">{propertyName}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-zinc-600">
              Total a pagar este mes
            </div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              {formatUyu(totalThisMonth)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-zinc-600">Ya pagado</div>
              <div className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
                {formatUyu(paidThisMonth)}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-zinc-600">
                Inversión acumulada
              </div>
              <div className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
                {formatUyu(accumulated)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-zinc-950">
            Próximos vencimientos
          </h2>
          <Link
            href={`/expenses/new?${pQs}`}
            className="text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4"
          >
            Agregar
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center text-sm text-zinc-600">
            No hay vencimientos pendientes (demo).
          </div>
        ) : (
          <ul className="space-y-2 pb-20">
            {upcoming.map((e) => {
              const d = daysUntil(e.dueDate, today);
              const isUrgent = d >= 0 && d <= 3;
              const isOverdue = d < 0;
              const badge =
                d === 0 ? "Hoy" : isOverdue ? "Vencido" : `En ${d} días`;

              return (
                <li
                  key={e.id}
                  className={[
                    "rounded-2xl border bg-white p-4 shadow-sm",
                    isUrgent
                      ? "border-red-200"
                      : isOverdue
                        ? "border-amber-200"
                        : "border-zinc-200",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-zinc-950">
                        {e.category}
                      </div>
                      <div className="mt-1 text-xs text-zinc-600">
                        Vence: {formatYmdToShortEs(e.dueDate)}
                        {e.detail ? ` · ${e.detail}` : ""}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-sm font-semibold text-zinc-950">
                        {formatUyu(e.amountUyu)}
                      </div>
                      <div
                        className={[
                          "mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          isUrgent
                            ? "bg-red-50 text-red-700"
                            : isOverdue
                              ? "bg-amber-50 text-amber-800"
                              : "bg-zinc-100 text-zinc-700",
                        ].join(" ")}
                      >
                        {badge}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Suspense fallback={null}>
        <FabAddExpense />
      </Suspense>
    </>
  );
}

