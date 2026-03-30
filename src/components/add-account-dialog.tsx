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
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    if (!open) return;
    setName("");
    setBalance("");
    setInstitution("");
  }, [open]);

  function handleSave() {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const value = parseBalance(balance);
    if (Number.isNaN(value)) return;

    addAccount({
      name: trimmedName,
      balance: value,
      institution: institution.trim() || undefined,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Nova Conta</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Adicione uma nova conta para gerenciar suas finanças.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-foreground">
              Nome da Conta
            </Label>
            <Input
              id="name"
              placeholder="Ex: Nubank"
              className="bg-input border-border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="balance" className="text-foreground">
              Saldo Inicial
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
          <div className="grid gap-2">
            <Label htmlFor="institution" className="text-foreground">
              Instituição (opcional)
            </Label>
            <Input
              id="institution"
              placeholder="Ex: Banco do Brasil"
              className="bg-input border-border"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
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
            disabled={!name.trim() || Number.isNaN(parseBalance(balance))}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
