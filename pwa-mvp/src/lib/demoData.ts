export type Property = {
  id: string;
  name: string;
};

export type ExpenseCategory =
  | "Alquiler"
  | "Gastos Comunes"
  | "Cuota Banco"
  | "UTE"
  | "OSE"
  | "Antel"
  | "Gas"
  | "Suscripciones"
  | "Colegio"
  | "Mutualista"
  | "Seguros"
  | "Contribución Inmobiliaria"
  | "Impuesto de Primaria"
  | "Tributos Domiciliarios"
  | "Sanitaria"
  | "Eléctrica"
  | "Pintura"
  | "Materiales"
  | "BPS / Leyes Sociales"
  | "Honorarios";

export type Expense = {
  id: string;
  propertyId: string;
  category: ExpenseCategory;
  amountUyu: number;
  dueDate: string; // YYYY-MM-DD
  detail?: string;
  paid: boolean;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toYmd(date: Date) {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
}

export function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export const demoProperties: Property[] = [
  { id: "casa", name: "Casa Principal" },
  { id: "apto", name: "Apartamento Centro" },
  { id: "obra", name: "Obra Terreno" },
];

export const demoCategories: { group: string; items: ExpenseCategory[] }[] = [
  {
    group: "Fijos mensuales",
    items: [
      "Alquiler",
      "Gastos Comunes",
      "Cuota Banco",
      "UTE",
      "OSE",
      "Antel",
      "Gas",
      "Suscripciones",
      "Colegio",
      "Mutualista",
      "Seguros",
    ],
  },
  {
    group: "Impuestos (Uruguay)",
    items: [
      "Contribución Inmobiliaria",
      "Impuesto de Primaria",
      "Tributos Domiciliarios",
    ],
  },
  {
    group: "Mantenimiento y obra",
    items: [
      "Sanitaria",
      "Eléctrica",
      "Pintura",
      "Materiales",
      "BPS / Leyes Sociales",
      "Honorarios",
    ],
  },
];

export function getDemoExpenses(today = new Date()): Expense[] {
  const soon = (days: number) => toYmd(addDays(today, days));

  return [
    {
      id: "e1",
      propertyId: "casa",
      category: "UTE",
      amountUyu: 4320,
      dueDate: soon(2),
      paid: false,
      detail: "Factura de luz",
    },
    {
      id: "e2",
      propertyId: "casa",
      category: "OSE",
      amountUyu: 980,
      dueDate: soon(6),
      paid: false,
      detail: "Agua potable",
    },
    {
      id: "e3",
      propertyId: "apto",
      category: "Gastos Comunes",
      amountUyu: 12500,
      dueDate: soon(1),
      paid: false,
      detail: "Administración edificio",
    },
    {
      id: "e4",
      propertyId: "apto",
      category: "Antel",
      amountUyu: 1890,
      dueDate: soon(10),
      paid: true,
      detail: "Internet / móvil",
    },
    {
      id: "e5",
      propertyId: "casa",
      category: "Contribución Inmobiliaria",
      amountUyu: 15400,
      dueDate: soon(14),
      paid: false,
      detail: "Cuota (demo)",
    },
    {
      id: "e6",
      propertyId: "obra",
      category: "Materiales",
      amountUyu: 22350,
      dueDate: soon(0),
      paid: false,
      detail: "Compra ferretería",
    },
  ];
}

