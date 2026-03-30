import { SidebarNav } from "@/components/sidebar-nav";
import { StatsCards } from "@/components/stats-cards";
import { MonthlyChart } from "@/components/monthly-chart";
import { CategoryChart } from "@/components/category-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import { AccountsOverview } from "@/components/accounts-overview";
import { InvestmentSummary } from "@/components/investment-summary";

export default function DashboardPage() {
  const currentDate = new Date();
  const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(currentDate);

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo de volta! Aqui está o resumo das suas finanças.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground capitalize">
                {monthName} {currentDate.getFullYear()}
              </span>
            </div>
          </div>
        </header>

        <div className="p-6">
          <StatsCards />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <MonthlyChart />
            <CategoryChart />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <RecentTransactions />
            <AccountsOverview />
            <InvestmentSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
