"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { investments, formatCurrency } from "@/lib/finance-data";
import { TrendingUp, TrendingDown, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const typeColors: Record<string, string> = {
  "Renda Fixa": "bg-chart-1/20 text-chart-1 border-chart-1/30",
  ETF: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  FII: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  Ações: "bg-chart-4/20 text-chart-4 border-chart-4/30",
};

interface InvestmentListProps {
  onAddClick: () => void;
}

export function InvestmentList({ onAddClick }: InvestmentListProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">
              Meus Investimentos
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Lista completa de ativos
            </CardDescription>
          </div>
          <Button
            onClick={onAddClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Investimento
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Ativo</TableHead>
              <TableHead className="text-muted-foreground">Tipo</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Valor Atual
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Rentabilidade
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => (
              <TableRow key={investment.id} className="border-border">
                <TableCell>
                  <div className="font-medium text-foreground">
                    {investment.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={typeColors[investment.type] || "border-border"}
                  >
                    {investment.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-medium text-foreground">
                    {formatCurrency(investment.value)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      investment.gain >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {investment.gain >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {formatCurrency(Math.abs(investment.gain))} (
                      {investment.gainPercent >= 0 ? "+" : ""}
                      {investment.gainPercent}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Adicionar aporte</DropdownMenuItem>
                      <DropdownMenuItem>Registrar venda</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
