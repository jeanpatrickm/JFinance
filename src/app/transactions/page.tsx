"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionTable } from "@/components/transaction-table";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCurrency,
  sumMonthlyIncome,
  sumMonthlyExpenses,
} from "@/lib/finance-data";
import { useTransactions } from "@/contexts/transactions-context";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function TransactionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { transactions, transactionsReady } = useTransactions();
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const income = sumMonthlyIncome(transactions, y, m);
  const expenses = sumMonthlyExpenses(transactions, y, m);
  const balance = income - expenses;

  return (
    <AppShell>
      <main className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex min-h-16 flex-col justify-center gap-1 px-4 py-3 sm:px-6">
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">
              Transações
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas receitas e despesas
            </p>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Receitas do Mês
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                {transactionsReady ? (
                  <div className="text-2xl font-bold text-success">
                    {formatCurrency(income)}
                  </div>
                ) : (
                  <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
                )}
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Despesas do Mês
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                {transactionsReady ? (
                  <div className="text-2xl font-bold text-destructive">
                    {formatCurrency(expenses)}
                  </div>
                ) : (
                  <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
                )}
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saldo do Mês
                </CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                {transactionsReady ? (
                  <div
                    className={`text-2xl font-bold ${balance >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {formatCurrency(balance)}
                  </div>
                ) : (
                  <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
                )}
              </CardContent>
            </Card>
          </div>

          <TransactionFilters onAddClick={() => setDialogOpen(true)} />

          <div className="mt-6">
            <TransactionTable />
          </div>
        </div>
      </main>

      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </AppShell>
  );
}
