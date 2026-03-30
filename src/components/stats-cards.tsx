"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import {
  formatCurrency,
  formatPercentVsPrevious,
  getTotalBalance,
  getTotalInvestments,
  sumMonthlyExpenses,
  sumMonthlyIncome,
  sumTotalExpenses,
  sumTotalIncome,
} from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";
import { useTransactions } from "@/contexts/transactions-context";
import { useDashboardPeriod } from "@/contexts/dashboard-period-context";

function prevCalendarMonth(year: number, month: number) {
  if (month === 0) return { year: year - 1, month: 11 };
  return { year, month: month - 1 };
}

export function StatsCards() {
  const { transactions, transactionsReady } = useTransactions();
  const { accounts, accountsReady } = useAccounts();
  const { period } = useDashboardPeriod();

  const totalBalance = getTotalBalance(accounts);
  const totalInvestments = getTotalInvestments();

  const isAll = period.mode === "all";
  const y = period.mode === "month" ? period.year : new Date().getFullYear();
  const m = period.mode === "month" ? period.month : new Date().getMonth();

  const monthlyIncome = sumMonthlyIncome(transactions, y, m);
  const monthlyExpenses = sumMonthlyExpenses(transactions, y, m);
  const totalIncomeAll = sumTotalIncome(transactions);
  const totalExpensesAll = sumTotalExpenses(transactions);

  const displayIncome = isAll ? totalIncomeAll : monthlyIncome;
  const displayExpenses = isAll ? totalExpensesAll : monthlyExpenses;

  const prev = period.mode === "month" ? prevCalendarMonth(y, m) : null;
  const prevIncome =
    prev !== null ? sumMonthlyIncome(transactions, prev.year, prev.month) : 0;
  const prevExpenses =
    prev !== null ? sumMonthlyExpenses(transactions, prev.year, prev.month) : 0;

  const incomeSubtitle =
    period.mode === "month"
      ? formatPercentVsPrevious(monthlyIncome, prevIncome)
      : "Soma de todas as receitas registradas.";

  const expenseSubtitle =
    period.mode === "month"
      ? formatPercentVsPrevious(monthlyExpenses, prevExpenses)
      : "Soma de todas as despesas registradas.";

  const incomeTrendPositive =
    period.mode === "month" ? monthlyIncome >= prevIncome : false;
  const expenseTrendPositive =
    period.mode === "month" ? monthlyExpenses <= prevExpenses : false;

  const incomeSubtitleClass =
    period.mode === "month"
      ? incomeTrendPositive
        ? "text-success"
        : "text-destructive"
      : "text-muted-foreground";
  const expenseSubtitleClass =
    period.mode === "month"
      ? expenseTrendPositive
        ? "text-success"
        : "text-destructive"
      : "text-muted-foreground";

  const stats = [
    {
      title: "Saldo Total",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      subtitle: "Saldo atual das contas (não filtra por período).",
      subtitleClass: "text-muted-foreground",
      waitAccounts: true,
    },
    {
      title: isAll ? "Receitas (geral)" : "Receitas do período",
      value: formatCurrency(displayIncome),
      icon: TrendingUp,
      subtitle: incomeSubtitle,
      subtitleClass: incomeSubtitleClass,
      waitTransactions: true,
    },
    {
      title: isAll ? "Despesas (geral)" : "Despesas do período",
      value: formatCurrency(displayExpenses),
      icon: TrendingDown,
      subtitle: expenseSubtitle,
      subtitleClass: expenseSubtitleClass,
      waitTransactions: true,
    },
    //{
    /* title: "Investimentos",
      value: formatCurrency(totalInvestments),
      icon: PiggyBank,
      subtitle: "Posição atual dos investimentos de exemplo.",
      subtitleClass: "text-muted-foreground",
    },*/
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
              <p className={`text-xs ${stat.subtitleClass}`}>{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
