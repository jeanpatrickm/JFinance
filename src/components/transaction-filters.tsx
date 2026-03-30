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
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar transações..."
            className="border-border bg-card pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full border-border bg-card sm:w-[140px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="income">Receitas</SelectItem>
            <SelectItem value="expense">Despesas</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full border-border bg-card sm:w-[160px]">
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
          className="shrink-0 border-border bg-transparent sm:mt-0"
          aria-label="Mais filtros"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={onAddClick}
        className="w-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 lg:w-auto"
      >
        <Plus className="mr-2 h-4 w-4" />
        Nova Transação
      </Button>
    </div>
  );
}
