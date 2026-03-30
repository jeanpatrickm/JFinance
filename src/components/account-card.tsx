"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Account } from "@/lib/finance-data";
import { formatCurrency } from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";
import { Wallet, Trash2, Pencil } from "lucide-react";

interface AccountCardProps {
  account: Account;
}

function balanceToInputString(n: number): string {
  return String(n);
}

function parseBalanceInput(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (normalized === "" || normalized === "-" || normalized === "-.") {
    return null;
  }
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) ? n : null;
}

export function AccountCard({ account }: AccountCardProps) {
  const { setAccountBalance, removeAccount } = useAccounts();
  const [editingBalance, setEditingBalance] = useState(false);
  const [balanceInput, setBalanceInput] = useState(() =>
    balanceToInputString(account.balance),
  );
  useEffect(() => {
    setBalanceInput(balanceToInputString(account.balance));
  }, [account.id, account.balance]);

  useEffect(() => {
    if (!editingBalance) return;
    const el = document.getElementById(
      `balance-${account.id}`,
    ) as HTMLInputElement | null;
    queueMicrotask(() => {
      el?.focus();
      el?.select();
    });
  }, [editingBalance, account.id]);

  function startEditing() {
    setBalanceInput(balanceToInputString(account.balance));
    setEditingBalance(true);
  }

  function cancelEditing() {
    setBalanceInput(balanceToInputString(account.balance));
    setEditingBalance(false);
  }

  function commitBalance() {
    const parsed = parseBalanceInput(balanceInput);
    if (parsed === null) {
      cancelEditing();
      return;
    }
    if (parsed !== account.balance) {
      setAccountBalance(account.id, parsed);
    }
    setBalanceInput(balanceToInputString(parsed));
    setEditingBalance(false);
  }

  const previewBalance = parseBalanceInput(balanceInput);
  const showNegativeStyle =
    previewBalance !== null ? previewBalance < 0 : account.balance < 0;

  function handleDelete() {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        `Excluir a conta "${account.name}"? Esta ação não pode ser desfeita.`,
      )
    ) {
      return;
    }
    removeAccount(account.id);
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              {account.name}
            </CardTitle>
            {account.institution ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {account.institution}
              </p>
            ) : null}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
          aria-label={`Excluir conta ${account.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-2">
          <Label
            htmlFor={editingBalance ? `balance-${account.id}` : undefined}
            className="text-muted-foreground"
          >
            Saldo atual
          </Label>
          {editingBalance ? (
            <>
              <Input
                id={`balance-${account.id}`}
                type="text"
                inputMode="decimal"
                className={`bg-input border-border text-2xl font-bold tabular-nums ${
                  showNegativeStyle ? "text-destructive" : "text-foreground"
                }`}
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                onBlur={commitBalance}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitBalance();
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    cancelEditing();
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Enter confirma · Esc cancela
              </p>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <p
                className={`text-2xl font-bold tabular-nums ${
                  account.balance < 0 ? "text-destructive" : "text-foreground"
                }`}
              >
                {formatCurrency(account.balance)}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={startEditing}
                aria-label="Editar saldo"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
