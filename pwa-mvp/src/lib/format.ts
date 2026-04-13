export function formatUyu(amount: number) {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatYmdToShortEs(ymd: string) {
  const [y, m, d] = ymd.split("-").map((x) => Number(x));
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("es-UY", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
}

export function daysUntil(ymd: string, today = new Date()) {
  const [y, m, d] = ymd.split("-").map((x) => Number(x));
  const due = new Date(y, m - 1, d);
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const diffMs = startOfDue.getTime() - startOfToday.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

