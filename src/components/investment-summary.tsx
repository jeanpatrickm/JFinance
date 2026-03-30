"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  investments,
  formatCurrency,
  getTotalInvestments,
  getTotalGain,
} from "@/lib/finance-data";
import { TrendingUp, TrendingDown } from "lucide-react";

export function InvestmentSummary() {
  const totalInvestments = getTotalInvestments();
  const totalGain = getTotalGain();
  const totalGainPercent = (
    (totalGain / (totalInvestments - totalGain)) *
    100
  ).toFixed(1);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Investimentos</CardTitle>
            <CardDescription className="text-muted-foreground">
              Resumo da carteira
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(totalInvestments)}
            </p>
            <p
              className={`text-sm ${totalGain >= 0 ? "text-success" : "text-destructive"}`}
            >
              {totalGain >= 0 ? "+" : ""}
              {formatCurrency(totalGain)} ({totalGainPercent}%)
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {investments.slice(0, 4).map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {investment.name}
                </p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {investment.type}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {formatCurrency(investment.value)}
                </p>
                <div
                  className={`flex items-center justify-end gap-1 text-xs ${
                    investment.gain >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {investment.gain >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {investment.gainPercent >= 0 ? "+" : ""}
                  {investment.gainPercent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
