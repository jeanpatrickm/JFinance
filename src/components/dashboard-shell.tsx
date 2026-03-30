"use client";

import { DashboardPeriodProvider } from "@/contexts/dashboard-period-context";
import { StatsCards } from "@/components/stats-cards";
import { MonthlyChart } from "@/components/monthly-chart";
import { CategoryChart } from "@/components/category-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import { AccountsOverview } from "@/components/accounts-overview";
import { AppShell } from "@/components/app-shell";
import { DashboardPeriodSelector } from "@/components/dashboard-period-selector";

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex min-h-16 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Bem-vindo de volta! Aqui está o resumo das suas finanças.
          </p>
        </div>
        <DashboardPeriodSelector />
      </div>
    </header>
  );
}

export function DashboardShell() {
  return (
    <AppShell>
      <DashboardPeriodProvider>
        <main className="min-h-screen">
          <DashboardHeader />

          <div className="p-4 sm:p-6">
            <StatsCards />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <MonthlyChart />
              <CategoryChart />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <RecentTransactions />
              <AccountsOverview />
            </div>
          </div>
        </main>
      </DashboardPeriodProvider>
    </AppShell>
  );
}
