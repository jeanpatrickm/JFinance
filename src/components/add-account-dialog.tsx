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
import { BANK_OPTIONS } from "@/lib/finance-data";
import { useAccounts } from "@/contexts/accounts-context";

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function parseBalance(raw: string): number {
  const normalized = raw.trim().replace(",", ".");
  if (normalized === "" || normalized === "-") return 0;
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) ? n : NaN;
}

export function AddAccountDialog({
  open,
  onOpenChange,
}: AddAccountDialogProps) {
  const { addAccount } = useAccounts();
  const [bank, setBank] = useState<string>(BANK_OPTIONS[0]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (!open) return;
    setBank(BANK_OPTIONS[0]);
    setBalance("");
  }, [open]);

  function handleSave() {
    if (!bank) return;
    const value = parseBalance(balance);
    if (Number.isNaN(value)) return;

    addAccount({
      name: bank,
      balance: value,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Nova Conta</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Selecione o banco e informe o saldo atual da conta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="bank" className="text-foreground">
              Banco
            </Label>
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger id="bank" className="bg-input border-border">
                <SelectValue placeholder="Selecione o banco" />
              </SelectTrigger>
              <SelectContent>
                {BANK_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="balance" className="text-foreground">
              Saldo
            </Label>
            <Input
              id="balance"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              className="bg-input border-border"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
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
            disabled={!bank || Number.isNaN(parseBalance(balance))}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
