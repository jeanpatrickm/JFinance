"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { buildMonthlyChartSeries } from "@/lib/finance-data";
import { useTransactions } from "@/contexts/transactions-context";

export function MonthlyChart() {
  const { transactions, transactionsReady } = useTransactions();
  const monthlyData = buildMonthlyChartSeries(transactions);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Receitas vs Despesas</CardTitle>
        <CardDescription className="text-muted-foreground">
          Comparativo dos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!transactionsReady ? (
          <div className="h-[300px] animate-pulse rounded-lg bg-muted/40" />
        ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-chart-2)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chart-2)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-chart-4)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chart-4)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `R$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-foreground)",
                }}
                formatter={(value) => {
                  const n =
                    typeof value === "number"
                      ? value
                      : Number(value) || 0;
                  return [`R$ ${n.toLocaleString("pt-BR")}`, ""];
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                name="Receitas"
                stroke="var(--color-chart-2)"
                fill="url(#incomeGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Despesas"
                stroke="var(--color-chart-4)"
                fill="url(#expenseGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
