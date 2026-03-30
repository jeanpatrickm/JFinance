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
import {
  buildExpenseCategoryData,
  buildExpenseCategoryDataAllTime,
  formatCurrency,
} from "@/lib/finance-data";
import { useTransactions } from "@/contexts/transactions-context";
import { useDashboardPeriod } from "@/contexts/dashboard-period-context";

export function CategoryChart() {
  const { transactions, transactionsReady } = useTransactions();
  const { period } = useDashboardPeriod();

  const categoryData =
    period.mode === "all"
      ? buildExpenseCategoryDataAllTime(transactions)
      : buildExpenseCategoryData(
          transactions,
          period.year,
          period.month,
        );

  const totalMonthExpenses = categoryData.reduce((acc, d) => acc + d.value, 0);

  const description =
    period.mode === "all"
      ? "Todas as despesas por categoria (todos os meses)"
      : "Distribuição de despesas do mês selecionado";

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Gastos por Categoria</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!transactionsReady ? (
          <div className="h-[300px] w-full min-w-0 animate-pulse rounded-lg bg-muted/40" />
        ) : categoryData.length === 0 ? (
          <div className="flex h-[300px] w-full min-w-0 items-center justify-center text-sm text-muted-foreground">
            Nenhuma despesa neste período.
          </div>
        ) : (
          <div className="h-[300px] w-full min-w-0">
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
