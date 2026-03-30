"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import type { Transaction } from "@/lib/finance-data";
import { seedTransactions } from "@/lib/finance-data";

const STORAGE_KEY = "jfinance-transactions";

/** Alinha dias do seed ao mês atual na primeira visita (sem dados salvos). */
function shiftSeedToCurrentMonth(list: Transaction[]): Transaction[] {
  const y = new Date().getFullYear();
  const m = new Date().getMonth();
  return list.map((t) => {
    const parsed = new Date(`${t.date}T12:00:00`);
    const day = parsed.getDate();
    const lastDay = new Date(y, m + 1, 0).getDate();
    const safeDay = Math.min(day, lastDay);
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(safeDay).padStart(2, "0");
    return { ...t, date: `${y}-${mm}-${dd}` };
  });
}

function loadTransactions(): Transaction[] {
  if (typeof window === "undefined") return [...seedTransactions];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return shiftSeedToCurrentMonth([...seedTransactions]);
    const parsed = JSON.parse(raw) as Transaction[];
    if (!Array.isArray(parsed)) return [...seedTransactions];
    return parsed;
  } catch {
    return [...seedTransactions];
  }
}

function persist(next: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

type TransactionsContextValue = {
  transactions: Transaction[];
  /** false até o primeiro useLayoutEffect ler o localStorage (evita flash do seed no SSR / 1º paint). */
  transactionsReady: boolean;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(
  null,
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsReady, setTransactionsReady] = useState(false);

  useLayoutEffect(() => {
    setTransactions(loadTransactions());
    setTransactionsReady(true);
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => {
      const next = [{ ...t, id: crypto.randomUUID() }, ...prev];
      persist(next);
      return next;
    });
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => {
      const next = prev.filter((x) => x.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsReady,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return ctx;
}
