"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

interface TransactionFiltersProps {
  onAddClick: () => void;
}

export function TransactionFilters({ onAddClick }: TransactionFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar transações..."
            className="pl-9 bg-card border-border"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-card border-border">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="income">Receitas</SelectItem>
            <SelectItem value="expense">Despesas</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px] bg-card border-border">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="salary">Salário</SelectItem>
            <SelectItem value="housing">Moradia</SelectItem>
            <SelectItem value="food">Alimentação</SelectItem>
            <SelectItem value="transport">Transporte</SelectItem>
            <SelectItem value="health">Saúde</SelectItem>
            <SelectItem value="entertainment">Entretenimento</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          className="border-border bg-transparent"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={onAddClick}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Plus className="mr-2 h-4 w-4" />
        Nova Transação
      </Button>
    </div>
  );
}
