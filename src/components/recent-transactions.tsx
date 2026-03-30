"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, isTransactionInMonth } from "@/lib/finance-data";
import { useTransactions } from "@/contexts/transactions-context";
import { useDashboardPeriod } from "@/contexts/dashboard-period-context";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function RecentTransactions() {
  const { transactions, transactionsReady } = useTransactions();
  const { period } = useDashboardPeriod();

  const filtered =
    period.mode === "month"
      ? transactions.filter((t) =>
          isTransactionInMonth(t, period.year, period.month),
        )
      : transactions;

  const recentTransactions = [...filtered]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const description =
    period.mode === "month"
      ? "Movimentações do mês selecionado"
      : "Últimas movimentações em qualquer mês";

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Transações Recentes</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!transactionsReady
            ? Array.from({ length: 5 }, (_, i) => (
                <div
                  key={`sk-${i}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
              ))
            : recentTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma transação neste período.
                </p>
              )
            : (
                recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          transaction.type === "income"
                            ? "bg-success/20"
                            : "bg-destructive/20"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="h-4 w-4 text-success" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          transaction.type === "income"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                ))
              )}
        </div>
      </CardContent>
    </Card>
  );
}
