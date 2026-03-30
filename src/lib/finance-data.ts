export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  account: string
  /** Quando presente, o saldo da conta é ajustado ao criar/remover a transação. */
  accountId?: string
}

export interface Account {
  id: string
  name: string
  balance: number
  color: string
  institution?: string
}

export const ACCOUNT_COLOR_CYCLE = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
] as const

/** Bancos disponíveis ao cadastrar uma conta (nome exibido e armazenado em `Account.name`). */
export const BANK_OPTIONS = ["Itaú", "Nubank"] as const

export type BankOption = (typeof BANK_OPTIONS)[number]

export interface Investment {
  id: string
  name: string
  type: string
  value: number
  gain: number
  gainPercent: number
}

/** Dados iniciais quando não há nada salvo no navegador */
export const seedTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salário",
    amount: 8500,
    type: "income",
    category: "Salário",
    date: "2026-01-10",
    account: "Conta Corrente",
  },
  {
    id: "2",
    description: "Aluguel",
    amount: 1800,
    type: "expense",
    category: "Moradia",
    date: "2026-01-05",
    account: "Conta Corrente",
  },
  {
    id: "3",
    description: "Supermercado Extra",
    amount: 450.5,
    type: "expense",
    category: "Alimentação",
    date: "2026-01-08",
    account: "Cartão Nubank",
  },
  {
    id: "4",
    description: "Netflix",
    amount: 55.9,
    type: "expense",
    category: "Entretenimento",
    date: "2026-01-07",
    account: "Cartão Nubank",
  },
  {
    id: "5",
    description: "Freelance",
    amount: 2000,
    type: "income",
    category: "Renda Extra",
    date: "2026-01-09",
    account: "Conta Corrente",
  },
  {
    id: "6",
    description: "Academia",
    amount: 129.9,
    type: "expense",
    category: "Saúde",
    date: "2026-01-03",
    account: "Conta Corrente",
  },
  {
    id: "7",
    description: "Uber",
    amount: 45.0,
    type: "expense",
    category: "Transporte",
    date: "2026-01-09",
    account: "Cartão Nubank",
  },
  {
    id: "8",
    description: "Restaurante",
    amount: 120.0,
    type: "expense",
    category: "Alimentação",
    date: "2026-01-08",
    account: "Cartão Nubank",
  },
  {
    id: "9",
    description: "Energia",
    amount: 180.0,
    type: "expense",
    category: "Moradia",
    date: "2026-01-06",
    account: "Conta Corrente",
  },
  {
    id: "10",
    description: "Internet",
    amount: 99.9,
    type: "expense",
    category: "Moradia",
    date: "2026-01-04",
    account: "Conta Corrente",
  },
]

export const investments: Investment[] = [
  { id: "1", name: "Tesouro Selic 2029", type: "Renda Fixa", value: 15000, gain: 1250, gainPercent: 9.1 },
  { id: "2", name: "CDB Banco XP", type: "Renda Fixa", value: 10000, gain: 820, gainPercent: 8.9 },
  { id: "3", name: "IVVB11", type: "ETF", value: 8500, gain: 1400, gainPercent: 19.7 },
  { id: "4", name: "PETR4", type: "Ações", value: 5200, gain: -320, gainPercent: -5.8 },
  { id: "5", name: "MXRF11", type: "FII", value: 6980, gain: 580, gainPercent: 9.1 },
]

export const investmentHistory = [
  { month: "Ago", value: 38000 },
  { month: "Set", value: 39500 },
  { month: "Out", value: 41200 },
  { month: "Nov", value: 42800 },
  { month: "Dez", value: 44100 },
  { month: "Jan", value: 45680 },
]

export const allocationData = [
  { type: "Renda Fixa", value: 25000, percent: 54.7, fill: "var(--color-chart-1)" },
  { type: "ETF", value: 8500, percent: 18.6, fill: "var(--color-chart-2)" },
  { type: "FII", value: 6980, percent: 15.3, fill: "var(--color-chart-3)" },
  { type: "Ações", value: 5200, percent: 11.4, fill: "var(--color-chart-4)" },
]

/** Variação no saldo causada pela transação (receita +, despesa -). */
export function transactionBalanceDelta(
  t: Pick<Transaction, "type" | "amount">,
): number {
  return t.type === "income" ? t.amount : -t.amount
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function getTotalBalance(list: Account[]): number {
  return list.reduce((acc, account) => acc + account.balance, 0)
}

const MONTH_LABELS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
]

function transactionDay(t: Transaction): Date {
  return new Date(`${t.date}T12:00:00`)
}

export function isTransactionInMonth(
  t: Transaction,
  year: number,
  month: number,
): boolean {
  const d = transactionDay(t)
  return d.getFullYear() === year && d.getMonth() === month
}

export function sumMonthlyIncome(
  list: Transaction[],
  year: number,
  month: number,
): number {
  return list
    .filter(
      (t) => t.type === "income" && isTransactionInMonth(t, year, month),
    )
    .reduce((acc, t) => acc + t.amount, 0)
}

export function sumMonthlyExpenses(
  list: Transaction[],
  year: number,
  month: number,
): number {
  return list
    .filter(
      (t) => t.type === "expense" && isTransactionInMonth(t, year, month),
    )
    .reduce((acc, t) => acc + t.amount, 0)
}

/** Soma todas as receitas registradas (todos os meses). */
export function sumTotalIncome(list: Transaction[]): number {
  return list
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0)
}

/** Soma todas as despesas registradas (todos os meses). */
export function sumTotalExpenses(list: Transaction[]): number {
  return list
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)
}

/** Variação percentual vs valor anterior (ex.: mês anterior). */
export function formatPercentVsPrevious(
  current: number,
  previous: number,
): string {
  if (previous === 0 && current === 0) return "Sem alteração vs período anterior"
  if (previous === 0) return "Sem base no período anterior para comparar"
  const p = ((current - previous) / previous) * 100
  const sign = p > 0 ? "+" : ""
  return `${sign}${p.toFixed(1)}% vs período anterior`
}

/** Janeiro a dezembro do ano (padrão: ano atual). Rótulos curtos PT-BR. */
export function buildMonthlyChartSeries(
  list: Transaction[],
  year = new Date().getFullYear(),
): { month: string; income: number; expenses: number }[] {
  const result: { month: string; income: number; expenses: number }[] = []
  for (let m = 0; m < 12; m++) {
    const month = MONTH_LABELS[m]
    let income = 0
    let expenses = 0
    for (const t of list) {
      if (!isTransactionInMonth(t, year, m)) continue
      if (t.type === "income") income += t.amount
      else expenses += t.amount
    }
    result.push({ month, income, expenses })
  }
  return result
}

const CATEGORY_CHART_FILLS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function buildExpenseCategoryData(
  list: Transaction[],
  year: number,
  month: number,
): { category: string; value: number; fill: string }[] {
  const map = new Map<string, number>()
  for (const t of list) {
    if (t.type !== "expense") continue
    if (!isTransactionInMonth(t, year, month)) continue
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
  }
  return Array.from(map.entries())
    .map(([category, value], i) => ({
      category,
      value,
      fill: CATEGORY_CHART_FILLS[i % CATEGORY_CHART_FILLS.length],
    }))
    .sort((a, b) => b.value - a.value)
}

/** Despesas por categoria em todos os meses. */
export function buildExpenseCategoryDataAllTime(
  list: Transaction[],
): { category: string; value: number; fill: string }[] {
  const map = new Map<string, number>()
  for (const t of list) {
    if (t.type !== "expense") continue
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
  }
  return Array.from(map.entries())
    .map(([category, value], i) => ({
      category,
      value,
      fill: CATEGORY_CHART_FILLS[i % CATEGORY_CHART_FILLS.length],
    }))
    .sort((a, b) => b.value - a.value)
}

export function getTotalInvestments(): number {
  return investments.reduce((acc, inv) => acc + inv.value, 0)
}

export function getTotalGain(): number {
  return investments.reduce((acc, inv) => acc + inv.gain, 0)
}
