"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
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
    <div className="min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Investimentos
              </h1>
              <p className="text-sm text-muted-foreground">
                Acompanhe sua carteira de investimentos
              </p>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 grid gap-4 md:grid-cols-4">
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
    </div>
  );
}
