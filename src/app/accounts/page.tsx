"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { AccountCard } from "@/components/account-card";
import { AddAccountDialog } from "@/components/add-account-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, getTotalBalance } from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";
import { Plus, Wallet, TrendingUp, CreditCard } from "lucide-react";

export default function AccountsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { accounts, accountsReady } = useAccounts();

  const totalBalance = getTotalBalance(accounts);
  const totalPositive = accounts
    .filter((a) => a.balance > 0)
    .reduce((acc, a) => acc + a.balance, 0);
  const totalNegative = accounts
    .filter((a) => a.balance < 0)
    .reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Minhas Contas
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie suas contas bancárias e cartões
              </p>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {!accountsReady ? (
              <>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-48 animate-pulse rounded-xl border border-border bg-card"
                  />
                ))}
              </>
            ) : accounts.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">
                Nenhuma conta cadastrada. Use &quot;Nova Conta&quot; para
                adicionar.
              </p>
            ) : (
              accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))
            )}
          </div>
        </div>
      </main>

      <AddAccountDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
