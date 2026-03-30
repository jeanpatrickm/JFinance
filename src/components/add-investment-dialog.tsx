"use client";

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

interface AddInvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInvestmentDialog({
  open,
  onOpenChange,
}: AddInvestmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Novo Investimento
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Adicione um novo investimento à sua carteira.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-foreground">
              Nome do Ativo
            </Label>
            <Input
              id="name"
              placeholder="Ex: Tesouro Selic 2029"
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-foreground">
              Tipo
            </Label>
            <Select>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="renda-fixa">Renda Fixa</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
                <SelectItem value="fii">FII</SelectItem>
                <SelectItem value="acoes">Ações</SelectItem>
                <SelectItem value="cripto">Criptomoedas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value" className="text-foreground">
              Valor Investido
            </Label>
            <Input
              id="value"
              type="number"
              placeholder="0,00"
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-foreground">
              Data da Compra
            </Label>
            <Input id="date" type="date" className="bg-input border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-foreground">
              Quantidade (opcional)
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Ex: 100 cotas"
              className="bg-input border-border"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
