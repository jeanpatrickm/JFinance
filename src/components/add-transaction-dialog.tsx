"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccounts } from "@/contexts/accounts-context";
import { useTransactions } from "@/contexts/transactions-context";

const INCOME_CATEGORIES = ["Salário", "Renda Extra", "Investimentos"] as const;
const EXPENSE_CATEGORIES = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Entretenimento",
] as const;

function getCategoryOptions(type: "income" | "expense"): readonly string[] {
  return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

function todayISODate(): string {
  const n = new Date();
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTransactionDialog({
  open,
  onOpenChange,
}: AddTransactionDialogProps) {
  const { addTransaction } = useTransactions();
  const { accounts } = useAccounts();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [accountId, setAccountId] = useState("");
  const [date, setDate] = useState(todayISODate);
  const categoryOptions = getCategoryOptions(type);

  useEffect(() => {
    if (!open) return;
    setType("expense");
    setDescription("");
    setAmount("");
    setCategory(EXPENSE_CATEGORIES[0]);
    setDate(todayISODate());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (accounts.length === 0) {
      setAccountId("");
      return;
    }
    setAccountId((prev) =>
      accounts.some((a) => a.id === prev) ? prev : accounts[0].id,
    );
  }, [open, accounts]);

  useEffect(() => {
    const currentOptions = getCategoryOptions(type);
    if (!currentOptions.some((option) => option === category)) {
      setCategory(currentOptions[0]);
    }
  }, [type, category]);

  function handleSave() {
    const trimmed = description.trim();
    if (!trimmed) return;
    const value = Number.parseFloat(amount.replace(",", "."));
    if (!Number.isFinite(value) || value <= 0) return;
    const account = accounts.find((a) => a.id === accountId);
    if (!account) return;

    addTransaction({
      description: trimmed,
      amount: value,
      type,
      category,
      date,
      account: account.name,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Nova Transação</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Adicione uma nova transação ao seu histórico financeiro.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-foreground">
              Tipo
            </Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === "income" ? "default" : "outline"}
                className={
                  type === "income"
                    ? "flex-1 bg-success hover:bg-success/90"
                    : "flex-1"
                }
                onClick={() => setType("income")}
              >
                Receita
              </Button>
              <Button
                type="button"
                variant={type === "expense" ? "default" : "outline"}
                className={
                  type === "expense"
                    ? "flex-1 bg-destructive hover:bg-destructive/90"
                    : "flex-1"
                }
                onClick={() => setType("expense")}
              >
                Despesa
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-foreground">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado"
              className="bg-input border-border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-foreground">
              Valor
            </Label>
            <Input
              id="amount"
              type="number"
              min={0}
              step="0.01"
              placeholder="0,00"
              className="bg-input border-border"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-foreground">
              Categoria
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="account" className="text-foreground">
              Conta
            </Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Selecione uma conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-foreground">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              className="bg-input border-border"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSave}
            disabled={accounts.length === 0}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
