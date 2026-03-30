"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Transaction } from "@/lib/finance-data";
import { formatCurrency, transactionBalanceDelta } from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";
import { useTransactions } from "@/contexts/transactions-context";
import {
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

const categoryColors: Record<string, string> = {
  Salário: "bg-success/20 text-success border-success/30",
  "Renda Extra": "bg-success/20 text-success border-success/30",
  Moradia: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  Alimentação: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  Transporte: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  Entretenimento: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  Saúde: "bg-chart-5/20 text-chart-5 border-chart-5/30",
};

function resolveAccountId(
  t: Transaction,
  accounts: { id: string; name: string }[],
): string | undefined {
  if (t.accountId) return t.accountId;
  return accounts.find((a) => a.name === t.account)?.id;
}

export function TransactionTable() {
  const { transactions, transactionsReady, removeTransaction } =
    useTransactions();
  const { accounts, incrementAccountBalance } = useAccounts();

  function handleRemove(transaction: Transaction) {
    const id = resolveAccountId(transaction, accounts);
    if (id) {
      incrementAccountBalance(id, -transactionBalanceDelta(transaction));
    }
    removeTransaction(transaction.id);
  }
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Descrição</TableHead>
            <TableHead className="text-muted-foreground">Categoria</TableHead>
            <TableHead className="text-muted-foreground">Data</TableHead>
            <TableHead className="text-muted-foreground">Conta</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Valor
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!transactionsReady
            ? Array.from({ length: 8 }, (_, i) => (
                <TableRow key={`sk-${i}`} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-muted" />
                      <div className="h-4 w-40 max-w-[60vw] animate-pulse rounded bg-muted" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            : sorted.map((transaction) => (
            <TableRow key={transaction.id} className="border-border">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
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
                  <span className="font-medium text-foreground">
                    {transaction.description}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    categoryColors[transaction.category] || "border-border"
                  }
                >
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {transaction.account}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`font-medium ${transaction.type === "income" ? "text-success" : "text-destructive"}`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleRemove(transaction)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
