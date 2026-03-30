"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";
import { Wallet } from "lucide-react";

export function AccountsOverview() {
  const { accounts, accountsReady } = useAccounts();

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Minhas Contas</CardTitle>
        <CardDescription className="text-muted-foreground">
          Visão geral das suas contas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!accountsReady ? (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </>
          ) : accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma conta cadastrada. Adicione uma em Contas.
            </p>
          ) : (
            accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {account.name}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-semibold ${account.balance < 0 ? "text-destructive" : "text-foreground"}`}
                >
                  {formatCurrency(account.balance)}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
