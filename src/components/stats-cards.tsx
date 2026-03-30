"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import {
  formatCurrency,
  getTotalBalance,
  sumMonthlyIncome,
  sumMonthlyExpenses,
  getTotalInvestments,
} from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";
import { useTransactions } from "@/contexts/transactions-context";

export function StatsCards() {
  const { transactions, transactionsReady } = useTransactions();
  const { accounts, accountsReady } = useAccounts();
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const totalBalance = getTotalBalance(accounts);
  const monthlyIncome = sumMonthlyIncome(transactions, y, m);
  const monthlyExpenses = sumMonthlyExpenses(transactions, y, m);
  const totalInvestments = getTotalInvestments();

  const stats = [
    {
      title: "Saldo Total",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      trend: "+12.5%",
      trendUp: true,
      waitAccounts: true,
    },
    {
      title: "Receitas do Mês",
      value: formatCurrency(monthlyIncome),
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      waitTransactions: true,
    },
    {
      title: "Despesas do Mês",
      value: formatCurrency(monthlyExpenses),
      icon: TrendingDown,
      trend: "-5.1%",
      trendUp: false,
      waitTransactions: true,
    },
    {
      title: "Investimentos",
      value: formatCurrency(totalInvestments),
      icon: PiggyBank,
      trend: "+15.3%",
      trendUp: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const valuePending =
          (Boolean(stat.waitTransactions) && !transactionsReady) ||
          (Boolean(stat.waitAccounts) && !accountsReady);
        return (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {valuePending ? (
                <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
              ) : (
                stat.value
              )}
            </div>
            <p
              className={`text-xs ${
                stat.trendUp ? "text-success" : "text-destructive"
              }`}
            >
              {stat.trend} em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        );
      })}
    </div>
  );
}
