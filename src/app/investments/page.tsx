"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PortfolioChart } from "@/components/portfolio-chart";
import { AllocationChart } from "@/components/allocation-chart";
import { InvestmentList } from "@/components/investment-list";
import { AddInvestmentDialog } from "@/components/add-investment-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCurrency,
  getTotalInvestments,
  getTotalGain,
} from "@/lib/finance-data";
import { TrendingUp, Wallet, PiggyBank, Target } from "lucide-react";

export default function InvestmentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalInvestments = getTotalInvestments();
  const totalGain = getTotalGain();
  const totalGainPercent = (
    (totalGain / (totalInvestments - totalGain)) *
    100
  ).toFixed(1);

  return (
    <AppShell>
      <main className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex min-h-16 flex-col justify-center gap-1 px-4 py-3 sm:px-6">
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">
              Investimentos
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe sua carteira de investimentos
            </p>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Patrimônio Total
                </CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalInvestments)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rentabilidade Total
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${totalGain >= 0 ? "text-success" : "text-destructive"}`}
                >
                  {totalGain >= 0 ? "+" : ""}
                  {formatCurrency(totalGain)}
                </div>
                <p
                  className={`text-xs ${totalGain >= 0 ? "text-success" : "text-destructive"}`}
                >
                  {totalGainPercent}% de retorno
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ativos na Carteira
                </CardTitle>
                <PiggyBank className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">5</div>
                <p className="text-xs text-muted-foreground">
                  ativos diferentes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Meta Anual
                </CardTitle>
                <Target className="h-4 w-4 text-chart-3" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">76%</div>
                <p className="text-xs text-muted-foreground">
                  R$ 45.680 / R$ 60.000
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <PortfolioChart />
            <AllocationChart />
          </div>

          <InvestmentList onAddClick={() => setDialogOpen(true)} />
        </div>
      </main>

      <AddInvestmentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </AppShell>
  );
}
