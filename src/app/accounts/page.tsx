"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AccountCard } from "@/components/account-card";
import { AddAccountDialog } from "@/components/add-account-dialog";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/contexts/accounts-context";
import { Plus } from "lucide-react";

export default function AccountsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { accounts, accountsReady } = useAccounts();

  return (
    <AppShell>
      <main className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground sm:text-xl">
                Minhas Contas
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie suas contas bancárias e cartões
              </p>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              className="w-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-6">
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
    </AppShell>
  );
}
