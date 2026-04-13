"use client";

import { useMemo, useState } from "react";

import { demoCategories, type ExpenseCategory, toYmd, addDays } from "@/lib/demoData";
import { formatUyu } from "@/lib/format";

export function ExpenseQuickForm({
  propertyName,
}: {
  propertyName: string;
}) {
  const [category, setCategory] = useState<ExpenseCategory>("UTE");
  const [amount, setAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(() =>
    toYmd(addDays(new Date(), 3)),
  );
  const [detail, setDetail] = useState<string>("");
  const [saved, setSaved] = useState(false);

  const amountNumber = useMemo(() => {
    const n = Number(amount.replace(/[^\d]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [amount]);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
      }}
    >
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-medium text-zinc-600">Propiedad</div>
        <div className="mt-1 text-sm font-semibold text-zinc-950">
          {propertyName}
        </div>
      </div>

      <label className="block">
        <div className="mb-2 text-sm font-semibold text-zinc-950">Categoría</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm outline-none ring-zinc-950/10 focus:ring-4"
        >
          {demoCategories.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.items.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label className="block">
        <div className="mb-2 flex items-baseline justify-between">
          <div className="text-sm font-semibold text-zinc-950">Monto</div>
          <div className="text-xs font-medium text-zinc-600">
            {amountNumber > 0 ? formatUyu(amountNumber) : "UYU"}
          </div>
        </div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
          placeholder="Ej: 12500"
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-lg font-semibold text-zinc-950 shadow-sm outline-none ring-zinc-950/10 focus:ring-4"
        />
      </label>

      <label className="block">
        <div className="mb-2 text-sm font-semibold text-zinc-950">
          Fecha de vencimiento
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm outline-none ring-zinc-950/10 focus:ring-4"
        />
      </label>

      <label className="block">
        <div className="mb-2 text-sm font-semibold text-zinc-950">
          Detalle (opcional)
        </div>
        <input
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Ej: Administración edificio, N° de factura…"
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm outline-none ring-zinc-950/10 focus:ring-4"
        />
      </label>

      <button
        type="submit"
        className="h-12 w-full rounded-2xl bg-zinc-950 text-base font-semibold text-white shadow-sm ring-zinc-950/20 transition active:translate-y-px active:shadow-none"
      >
        Guardar (demo)
      </button>

      <div
        className={[
          "rounded-2xl border px-4 py-3 text-sm font-medium transition",
          saved
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-transparent bg-transparent text-transparent",
        ].join(" ")}
        aria-live="polite"
      >
        Guardado (demo). Próximo paso: conectarlo a la base de datos.
      </div>
    </form>
  );
}

