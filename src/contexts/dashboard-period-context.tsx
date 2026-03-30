"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DashboardPeriod =
  | { mode: "all" }
  | { mode: "month"; year: number; month: number };

type DashboardPeriodContextValue = {
  period: DashboardPeriod;
  setModeAll: () => void;
  setMonth: (year: number, month: number) => void;
};

const DashboardPeriodContext =
  createContext<DashboardPeriodContextValue | null>(null);

function defaultMonthPeriod(): DashboardPeriod {
  const n = new Date();
  return { mode: "month", year: n.getFullYear(), month: n.getMonth() };
}

function clampToCurrentYearMonth(
  year: number,
  month: number,
): { year: number; month: number } {
  const n = new Date();
  const cy = n.getFullYear();
  const cm = n.getMonth();
  if (year !== cy) {
    return { year: cy, month: cm };
  }
  return { year: cy, month: Math.max(0, Math.min(month, cm)) };
}

export function DashboardPeriodProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<DashboardPeriod>(defaultMonthPeriod);

  useEffect(() => {
    setPeriod((p) => {
      if (p.mode !== "month") return p;
      const { year, month } = clampToCurrentYearMonth(p.year, p.month);
      if (p.year === year && p.month === month) return p;
      return { mode: "month", year, month };
    });
  }, []);

  const setModeAll = useCallback(() => {
    setPeriod({ mode: "all" });
  }, []);

  const setMonth = useCallback((year: number, month: number) => {
    const next = clampToCurrentYearMonth(year, month);
    setPeriod({ mode: "month", ...next });
  }, []);

  const value = useMemo(
    () => ({
      period,
      setModeAll,
      setMonth,
    }),
    [period, setModeAll, setMonth],
  );

  return (
    <DashboardPeriodContext.Provider value={value}>
      {children}
    </DashboardPeriodContext.Provider>
  );
}

export function useDashboardPeriod() {
  const ctx = useContext(DashboardPeriodContext);
  if (!ctx) {
    throw new Error(
      "useDashboardPeriod must be used within DashboardPeriodProvider",
    );
  }
  return ctx;
}
