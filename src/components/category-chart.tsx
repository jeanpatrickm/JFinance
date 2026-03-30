"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { buildExpenseCategoryData, formatCurrency } from "@/lib/finance-data";
import { useTransactions } from "@/contexts/transactions-context";

export function CategoryChart() {
  const { transactions, transactionsReady } = useTransactions();
  const now = new Date();
  const categoryData = buildExpenseCategoryData(
    transactions,
    now.getFullYear(),
    now.getMonth(),
  );

  const totalMonthExpenses = categoryData.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Gastos por Categoria</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribuição de despesas do mês
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!transactionsReady ? (
          <div className="h-[300px] animate-pulse rounded-lg bg-muted/40" />
        ) : categoryData.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Nenhuma despesa neste mês.
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="category"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.category}-${index}`}
                      fill={entry.fill}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  labelFormatter={(label) => `Categoria: ${label}`}
                  formatter={(value) => {
                    const numericValue =
                      typeof value === "number" ? value : Number(value) || 0;
                    const pct =
                      totalMonthExpenses > 0
                        ? (numericValue / totalMonthExpenses) * 100
                        : 0;

                    return [
                      `${formatCurrency(numericValue)} (${pct.toFixed(1)}%)`,
                      "Valor",
                    ];
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "var(--color-foreground)" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
