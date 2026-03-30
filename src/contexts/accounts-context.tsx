"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import type { Account } from "@/lib/finance-data";
import { ACCOUNT_COLOR_CYCLE } from "@/lib/finance-data";

const STORAGE_KEY = "jfinance-accounts";

function normalizeAccount(raw: unknown): Account | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (
    typeof o.id !== "string" ||
    typeof o.name !== "string" ||
    typeof o.balance !== "number"
  ) {
    return null;
  }
  return {
    id: o.id,
    name: o.name,
    balance: o.balance,
    color:
      typeof o.color === "string" ? o.color : ACCOUNT_COLOR_CYCLE[0],
    institution:
      typeof o.institution === "string" && o.institution.trim()
        ? o.institution.trim()
        : undefined,
  };
}

function loadAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeAccount)
      .filter((a): a is Account => a !== null);
  } catch {
    return [];
  }
}

function persist(next: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export type NewAccountInput = {
  name: string;
  balance: number;
};

type AccountsContextValue = {
  accounts: Account[];
  /** false até o primeiro useLayoutEffect ler o localStorage (evita mensagem de “vazio” no SSR / 1º paint). */
  accountsReady: boolean;
  addAccount: (input: NewAccountInput) => void;
  setAccountBalance: (id: string, balance: number) => void;
  /** Soma delta ao saldo da conta (ex.: impacto de receitas/despesas). */
  incrementAccountBalance: (id: string, delta: number) => void;
  removeAccount: (id: string) => void;
};

const AccountsContext = createContext<AccountsContextValue | null>(null);

export function AccountsProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsReady, setAccountsReady] = useState(false);

  useLayoutEffect(() => {
    setAccounts(loadAccounts());
    setAccountsReady(true);
  }, []);

  const addAccount = useCallback((input: NewAccountInput) => {
    const name = input.name.trim();
    if (!name) return;
    setAccounts((prev) => {
      const id = crypto.randomUUID();
      const color =
        ACCOUNT_COLOR_CYCLE[prev.length % ACCOUNT_COLOR_CYCLE.length];
      const next: Account[] = [
        ...prev,
        {
          id,
          name,
          balance: input.balance,
          color,
        },
      ];
      persist(next);
      return next;
    });
  }, []);

  const setAccountBalance = useCallback((id: string, balance: number) => {
    if (!Number.isFinite(balance)) return;
    setAccounts((prev) => {
      const next = prev.map((a) =>
        a.id === id ? { ...a, balance } : a,
      );
      persist(next);
      return next;
    });
  }, []);

  const incrementAccountBalance = useCallback((id: string, delta: number) => {
    if (!Number.isFinite(delta) || delta === 0) return;
    setAccounts((prev) => {
      const idx = prev.findIndex((a) => a.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const a = next[idx];
      next[idx] = { ...a, balance: a.balance + delta };
      persist(next);
      return next;
    });
  }, []);

  const removeAccount = useCallback((id: string) => {
    setAccounts((prev) => {
      const next = prev.filter((a) => a.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        accountsReady,
        addAccount,
        setAccountBalance,
        incrementAccountBalance,
        removeAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const ctx = useContext(AccountsContext);
  if (!ctx) {
    throw new Error("useAccounts must be used within AccountsProvider");
  }
  return ctx;
}
