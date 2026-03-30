"use client";

import { useMemo, useState } from "react";
import { useDashboardPeriod } from "@/contexts/dashboard-period-context";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatMonthYearPt(year: number, month: number): string {
  const raw = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/** Meses de janeiro até o mês atual, somente no ano corrente (mais recente primeiro). */
function useMonthOptions() {
  return useMemo(() => {
    const out: { year: number; month: number; label: string; key: string }[] =
      [];
    const now = new Date();
    const year = now.getFullYear();
    const endM = now.getMonth();
    for (let m = endM; m >= 0; m--) {
      out.push({
        year,
        month: m,
        label: formatMonthYearPt(year, m),
        key: `${year}-${m}`,
      });
    }
    return out;
  }, []);
}

export function DashboardPeriodSelector() {
  const { period, setModeAll, setMonth } = useDashboardPeriod();
  const monthOptions = useMonthOptions();
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

  const isMonth = period.mode === "month";

  /** Garante modo "mês" e abre a lista (o rótulo "Mês e ano" sozinho não abria nada antes). */
  function openMonthPicker() {
    if (period.mode === "all") {
      const n = new Date();
      setMonth(n.getFullYear(), n.getMonth());
    }
    setMonthPickerOpen(true);
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:gap-x-4">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Período
      </span>
      <div
        className="inline-flex items-center rounded-lg border border-border bg-muted/40 p-1 shadow-xs"
        role="group"
        aria-label="Tipo de visão do dashboard"
      >
        <button
          type="button"
          onClick={openMonthPicker}
          aria-pressed={isMonth}
          className={cn(
            "min-h-8 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isMonth
              ? "bg-primary/10 text-primary shadow-sm"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          Mês e ano
        </button>
        <button
          type="button"
          onClick={() => {
            setModeAll();
            setMonthPickerOpen(false);
          }}
          aria-pressed={!isMonth}
          className={cn(
            "min-h-8 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !isMonth
              ? "bg-primary/10 text-primary shadow-sm"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          Geral
        </button>
      </div>

      {isMonth ? (
        <DropdownMenu
          open={monthPickerOpen}
          onOpenChange={setMonthPickerOpen}
          modal={false}
        >
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1 rounded-md px-1.5 py-1 text-sm font-medium capitalize tabular-nums text-foreground underline decoration-muted-foreground/40 decoration-1 underline-offset-[5px] outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Escolher mês e ano"
            >
              {formatMonthYearPt(period.year, period.month)}
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-72 w-[min(100vw-2rem,16rem)] overflow-y-auto">
            {monthOptions.map((opt) => {
              const selected =
                period.year === opt.year && period.month === opt.month;
              return (
                <DropdownMenuItem
                  key={opt.key}
                  onSelect={() => setMonth(opt.year, opt.month)}
                  className="flex cursor-pointer justify-between gap-2 capitalize"
                >
                  <span>{opt.label}</span>
                  {selected ? (
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                  ) : null}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="text-sm text-muted-foreground">
          Todos os meses somados
        </span>
      )}
    </div>
  );
}
