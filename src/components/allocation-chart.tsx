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
import { allocationData, formatCurrency } from "@/lib/finance-data";

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

export function AllocationChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Alocação por Tipo</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribuição dos investimentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                nameKey="type"
              >
                {allocationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-foreground)",
                }}
                formatter={(value, name) => {
                  const n =
                    typeof value === "number"
                      ? value
                      : Number(value) || 0;
                  return [
                    `${formatCurrency(n)} (${allocationData.find((d) => d.type === name)?.percent}%)`,
                    String(name ?? ""),
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
      </CardContent>
    </Card>
  );
}
