"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
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
    <div className="min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Transações
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie suas receitas e despesas
              </p>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
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
    </div>
  );
}
